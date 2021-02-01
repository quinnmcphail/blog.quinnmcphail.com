---
title: Using Salesforce CMS Content In Custom Lightning Web Components
date: '2021-01-31'
spoiler: Start using Salesforce CMS content in your custom Lightning Web Components in Spring 21.
---

## Prerequisites

* ⚡️ Make sure you have [Salesforce CMS content setup](https://help.salesforce.com/articleView?id=sf.community_managed_content_overview.htm&type=5) for the correct channels.
* ⚡️ Make sure you know how to create [Lightning Web Components](https://developer.salesforce.com/docs/component-library/documentation/en/lwc).

## Introduction

Starting in Spring 21, Salesforce will allow you to utilize Salesforce CMS content in custom Lightning Web Components. This is incredibly useful, especially for Experience Cloud. What this feature will allow you to do is let the user select what content they want to embed in a Lightning Web Component, without messing around with any code.

## Experience Builder Property

In the `js-meta.xml` file, setup the componenty property of the `ContentReference` type like so:

```xml
<property type="ContentReference" name="contentId" label="Content ID" filter="cms_image"/>
```

You can also filter based on content type, like `filter="cms_image"` in the snippet above.

Inside of the `.js` file of the component, make sure you are importing the `@api` decorator and have an attribute of the same name as your property. Matching the property from the above snippet, it would look like this:

```js
import { LightningElement, api } from "lwc";

export default class TestComponent extends LightningElement {
  @api contentId;
}
```

## Accessing Salesforce Content

Now that you have the `contentId`, what actually is it referencing? If you try and look at the value, you will notice it isn't actually a Salesforce Id value. It is actually something called a [content key](https://help.salesforce.com/articleView?id=sf.cms_content_key.htm&type=5) and it is used to reference Salesforce CMS content across deployments.

We can use the content key to query for our specific piece of content using the [ConnectAPI](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/connectAPI_overview.htm). Specifically, we can use the `ConnectApi.ManagedContent` class to get what we need. My go-to method is this one as I work a lot in Experience Cloud:

```java
getManagedContentByContentKeys(communityId, contentKeys, pageParam, pageSize, language, managedContentType, showAbsoluteUrl)
```

There are quite a few different paths to go after you get this information. One thing that I am interested in using it for is allowing users to replace images in components in Experience Cloud.

## Thanks!

Thank you for reading! I am always looking for feedback and suggestions. Reach out to me on [Twitter](https://twitter.com/quinnmcphail), [Trailblazer Community](https://success.salesforce.com/ProfileView?u=0053000000BniNxAAJ), [LinkedIn](https://www.linkedin.com/in/quinnmcphail/), or find me on [GitHub](https://github.com/quinnmcphail)!