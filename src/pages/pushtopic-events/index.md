---
title: Real-time LWC UI with PushTopic Events
date: '2020-06-30'
spoiler: Build real-time UI using on-platform Lightning Web Components and PushTopic Events.
---

## Prerequisites

* ⚡️ Make sure you know how to create [Lightning Web Components](https://developer.salesforce.com/docs/component-library/documentation/en/lwc).
* ⚡️ How to use the [SFDX Scratch Org deployment model](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_create.htm).
* ⚡️ How to execute [Anonymous Apex](https://help.salesforce.com/articleView?id=code_dev_console_execute_anonymous.htm&type=5).
* ⚡️ Be knowledgable of the [PushTopic Streaming API Limits](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/limits.htm).

## Introduction

Real-time communication is all the rage these days. Having the most up to date information displayed to a user allows split-second decision making.

Sometimes it's important to be speedy!

![Lucario speed](./speed.gif)

There are various ways to display real-time information in Salesforce, but my favorite is PushTopic events.

## PushTopic Events

PushTopic events are part of the [Salesforce Streaming API](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/intro_stream.htm) and are designed to be used with real-time UI updates. They work by creating a SOQL query that emits an event that matches that SOQL query every time. They are highly flexible with a ton of use cases. Let's create a simple one to show what they're made of.

## Creating a PushTopic Event

PushTopic events are created by inserting a record in the Salesforce system. They are defined by `PushTopic` records and are not stored in metadata. Here is an example of the Apex code used to create a PushTopic event:
```java
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```
Let's walk through what we just did:

1. We created a new empty `PushTopic` record.
```java{1}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

2. We set the name of the `PushTopic` record to `LastChangedAccount`.
```java{2}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

3. We set the SOQL query for the event.
```java{3}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

4. We set the Salesforce API version for our record.
```java{4}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

5. We set which operations we want the event to notify us about. We selected all of them but your use case might only require a subset of the options. Make sure to choose the least amount possible to conserve API limits.
```java{5-8}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

6. We set which fields we want to trigger our event. We chose `Referenced` which includes fields in the `SELECT` and `WHERE` clauses of our SOQL query. You can also choose `All` to select all fields of the record, `Select` for fields in the `SELECT` clause, and `Where` for fields in the `WHERE` clause.
```java{9}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

7. We insert our `PushTopic` record into Salesforce.
```java{10}
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'LastChangedAccount';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 48.0;
pushTopic.NotifyForOperationCreate = true;
pushTopic.NotifyForOperationUpdate = true;
pushTopic.NotifyForOperationUndelete = true;
pushTopic.NotifyForOperationDelete = true;
pushTopic.NotifyForFields = 'Referenced';
insert pushTopic;
```

Now every time we change the `Id` or `Name` of an `Account` record, we should trigger an event!

Let's see how to consume those events in a custom Lightning web component.

## Consuming PushTopic Events in Lightning web components

In order to consume PushTopic Events, we have to import some functions from the `lightning/empApi` module provided by Salesforce. This module allows you to interact with the Salesforce Streaming API.

Here is an example LWC Javascript file to import and handle our PushTopic event:
```javascript
import { LightningElement } from "lwc";
import { subscribe, unsubscribe, onError } from "lightning/empApi";

export default class LastChangedAccount extends LightningElement {
  channelName = "/topic/LastChangedAccount";
  subscription = {};
  accountId;
  accountName;

  connectedCallback() {
    subscribe(this.channelName, -2, (response) => {
      console.log("New message received : ", JSON.stringify(response));
      if (
        response !== null &&
        response.data !== null &&
        response.data.sobject !== null
      ) {
        const sobject = response.data.sobject;
        this.accountId = sobject.Id;
        this.accountName = sobject.Name;
      }
    }).then((response) => {
      this.subscription = response;
    });

    onError((error) => {
      console.log("Received error from server: ", JSON.stringify(error));
    });
  }

  disconnectedCallback() {
    unsubscribe(this.subscription, (response) => {
      console.log("unsubscribe() response: ", JSON.stringify(response));
    });
  }
}
```
Inside of the `connectedCallback` lifecycle hook, we subscribe to our PushTopic event. The `channelName` is `/topic/` and then the name of our PushTopic event, `LastChangedAccount`.

We handle the event's response and update our UI to reflect the change.

What can you see yourself using PushTopic events for?

## Resources

* ⚡️ [GitHub Repository](https://github.com/quinnmcphail/push-topic-events)

## Thanks!

Thank you for reading! I am always looking for feedback and suggestions. Reach out to me on [Twitter](https://twitter.com/quinnmcphail), [Trailblazer Community](https://success.salesforce.com/ProfileView?u=0053000000BniNxAAJ), [LinkedIn](https://www.linkedin.com/in/quinnmcphail/), or find me on [GitHub](https://github.com/quinnmcphail)!