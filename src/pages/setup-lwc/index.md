---
title: Setting Up a Lightning Web Components Project
date: '2019-06-22'
spoiler: Setup a new project using the new open-source Lightning Web Components UI framework.
---

**Note: This blog post will _not_ teach you how to write Lightning web components. Check out the [official dev guide](https://lwc.dev/guide/introduction) to learn how to write Lightning web components.**

When Salesforce announced they were making their new [Lightning Web Components UI framework](https://lwc.dev/) open-source, I was incredibly excited. One of my goals as a Lightning Champion is to give developers outside of the Salesforce ecosystem a taste of what it's like developing on the platform. Lightning Web Components makes that possible by using tools that are already prevelant in the web development community, making non-Salesforce devs feel right at home.

## Prerequisites

There are a few things we need to install before we can start:

* ⚡️ You should have *some* working knowledge of how to use the command line as well as basic commands. If you can change directories, you should be good.

* ⚡️ Install [Node.js](https://nodejs.org/). When you install Node.js, it also installs Node Package Manager (npm). npm is used to download, install, and manage packages used in projects. You can also install [Yarn](https://yarnpkg.com/), another package manager, if you don't like using npm.

* ⚡️ Install a code editor. There are tons out there but I recommend giving [Visual Studio Code](https://code.visualstudio.com/) a try if you haven't found your favorite.

## Creating The Project

Open up your command line and type:

```(zsh)
npx lwc-create-app lwc-todo
```
Lets break down what that command is doing.
* `npx` is a tool used to run packages.
* `lwc-create-app` is a tool written by [René Winkelmeyer](https://twitter.com/muenzpraeger) to help bootstrap a new LWC application.
* `lwc-todo` is the name that you want to give to your project.

After running that command, you will be presented with a bunch of options. Feel free to accept the defaults by hitting enter on each line. You may have to enter a value for certain options depending on your setup.

It should take a couple seconds to fetch and install all of the packages for your application.

If all goes well, you can change into the project directory and run:

```(zsh)
npm run watch
```
This will compile your application and run it on a development server. It will also watch for any changes in your code and automatically refresh your browser.

Navigate to the URL displayed in your command line.

🎉Congrats! You are running a Lightning Web Components application. 🎉

## Development

Components are found in the `src/modules` directory. Feel free to play around with the default components created from `lwc-create-app` to get a feel for how things fit together.

To learn more about how Lightning web components work, check out the [official dev guide](https://lwc.dev/guide/introduction).

## Deployment

Once you're done developing and are ready to deploy your app, make sure you are at the root of your project directory. Run this command to build your project for production:

```(zsh)
npm run build
```

This will create a new directory, `dist`, that you can deploy to whatever hosting service you want. I recommend checking out [Heroku](https://www.heroku.com/) or [Netlify](https://www.netlify.com/). They both offer free tiers and make it super easy to distribute your application.

Now go create something awesome!

## Thanks!

Thank you for reading! I am always looking for feedback and suggestions. Reach out to me on [Twitter](https://twitter.com/quinnmcphail), [Trailblazer Community](https://success.salesforce.com/ProfileView?u=0053000000BniNxAAJ), [LinkedIn](https://www.linkedin.com/in/quinnmcphail/), or find me on [GitHub](https://github.com/quinnmcphail)!