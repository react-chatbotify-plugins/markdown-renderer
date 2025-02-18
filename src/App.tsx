import ChatBot, { Flow, Params } from "react-chatbotify";

import RcbPlugin from "./factory/RcbPluginFactory";
import { MarkdownRendererBlock } from "./types/MarkdownRendererBlock";
import MarkdownWrapper from "./components/MarkdownWrapper";

const App = () => {
	// initialize the plugin
	const plugins = [RcbPlugin({markdownComponent: MarkdownWrapper})];

	// example flow for testing
	const flow: Flow = {
		start: {
			message: "#### Hello! I'm rendering messages in markdown, you can type to me in markdown too!",
			path: "loop",
			renderMarkdown: ["BOT", "USER"],
		} as MarkdownRendererBlock,
		loop : {
			message: async (params: Params) => {
				await params.injectMessage(`Hey, here's a simple code block below:\\\

					\`\`\`const greeting = "hello!";\`\`\`\\\

					Pretty cool isn't it? Try again!`);
			},
			chatDisabled: false,
			path: "loop",
			renderMarkdown: ["BOT", "USER"],
		} as MarkdownRendererBlock,
	}

	return (
		<ChatBot
			id="chatbot-id"
			plugins={plugins}
			flow={flow}
		></ChatBot>
	);
}

export default App;