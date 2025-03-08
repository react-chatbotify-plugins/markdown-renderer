<p align="center">
  <img width="200px" src="https://raw.githubusercontent.com/katjes733/markdown-latex-renderer/main/src/assets/logo.png" />
  <h1 align="center">Markdown LaTeX Renderer</h1>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Quickstart](#quickstart)
  - [Features](#features)
  - [API Documentation](#api-documentation)
    - [Plugin Configuration](#plugin-configuration)
    - [Rendering Markdown](#rendering-markdown)
  - [Team](#team)
  - [Contributing](#contributing)

### Introduction

**Markdown Renderer** is a plugin that adds support for rendering markdown in chat bubbles within the [**React ChatBotify Core Library**](https://react-chatbotify.com). By default, the core library does not ship with markdown support. This plugin relies on chatbot events to intercept messages and determine if markdown rendering logic has to be applied. The demo gif above should give you a pretty good idea of what this plugin is capable of doing.

### Quickstart

The plugin is incredibly straightforward to use and is [**available on npm**](https://www.npmjs.com/package/@katjes733/markdown-latex-renderer). Simply follow the steps below:

1. Install the plugin with the following command within your project folder:
   ```bash
   npm install @katjes733/markdown-latex-renderer
   ```

2. Import the plugin:
   ```javascript
   import MarkdownRenderer from "@katjes733/markdown-latex-renderer";
   ```

3. Initialize the plugin within the `plugins` prop of `ChatBot`:
   ```javascript
   import ChatBot from "react-chatbotify";
   import MarkdownLatexRenderer from "@katjes733/markdown-latex-renderer";

   const MyComponent = () => {
     return (
       <ChatBot plugins=[MarkdownLatexRenderer()]/>
     );
   };
   ```

4. Add the `renderMarkdownLatex` attribute to the [**Block**](https://react-chatbotify.com/docs/concepts/conversations#block) that requires markdown rendering:
   ```javascript
   import ChatBot from "react-chatbotify";
   import MarkdownLatexRenderer, { MarkdownLatexRendererBlock } from "@katjes733/markdown-latex-renderer";

   const MyComponent = () => {
     const flow = {
       start: {
         message: "### What is your age?",
         renderMarkdownLatex: ["BOT", "USER"]
       } as MarkdownLatexRendererBlock
     }

     return (
       <ChatBot plugins=[MarkdownLatexRenderer()]/>
     );
   };
   ```

The quickstart above shows how rendering of markdown can be done for both bot and user messages **within the start block**. The documentation website for the React ChatBotify Core Library also contains a [**live markdown renderer example**](https://react-chatbotify.com/docs/examples/markdown_render) that uses the parent (fork) plugin. You may wish to check it out!

### Features

**Markdown LaTeX Renderer** is a lightweight plugin that provides the following features to your chatbot:

* Render markdown with LaTeX in bot chat messages
* Render markdown with LaTeX in user chat messages
* Optionally pass in your own custom markdown component to render markdown your way

### API Documentation

#### Plugin Configuration

The `MarkdownLatexRenderer` plugin accepts a configuration object that allows you to customize its behavior and appearance. An example configuration is passed in below to initialize the plugin:

```javascript
import ChatBot from "react-chatbotify";
import MarkdownLatexRenderer from "@katjes733/markdown-latex-renderer";

const MyComponent = () => {
  const pluginConfig = {
    // defaults to true, auto enable events required for plugin to work
    autoConfig: true,
  }

  return (
    <ChatBot plugins={[MarkdownLatexRenderer(pluginConfig)]}/>
  )
}
```

As you may be able to tell from above, there are 2 configurable sections within the plugin configuration which are `autoConfig` and `markdownComponent`. These are described in the table below:

| Configuration Option         | Type     | Default Value                                                                                                                                                                                                                 | Description                                                                                                               |
|------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `autoConfig`                 | boolean  | `true`                                                                                                                                                                                                                        | Enables automatic configuration of required events for markdown rendering. Recommended to keep as `true`. If set to `false`, you need to configure events manually. |
| `markdownComponent`                 | React.ComponentType<{ children: React.ReactNode }>  | `null`                                                                                                                                                                                                                        | A React component to wrap around the message's content to customize its styling, layout, or behavior. The component will receive the message's content as its children prop, so you can design it to add custom formatting, animations, or other UI enhancements. If not provided, a default wrapper from **react-markdown** will be used. |

#### Rendering Markdown

To render markdown in messages, add the `renderMarkdownLatex` attribute to any Block that requires markdown rendering. The `renderMarkdownLatex` attribute is an array that accepts `"USER"` and/or `"BOT"`. An example can be seen below:

```javascript
import ChatBot from "react-chatbotify";
import MarkdownLatexRenderer from "@katjes733/markdown-latex-renderer";

const MyComponent = () => {
  const flow = {
    start: {
      message: "What is your age?",
      renderMarkdownLatex: ["USER", "BOT"],
    },
    // ... other blocks
  };

  return (
    <ChatBot plugins={[MarkdownLatexRenderer(pluginConfig)]}/>
  )
}
```

As you can see from the example above containing a `start` block, `renderMarkdownLatex` contains both `"USER"` and `"BOT"`, which means it will render markdown messages for both user and bot messages within the `start` block.

### Team

- [katjes733](https://github.com/katjes733)

### Contributing

If you have code to contribute to the project, open a pull request from your fork and describe clearly the changes and what they are intended to do (enhancement, bug fixes etc). 
Alternatively, you may simply raise bugs or suggestions by opening an issue.
