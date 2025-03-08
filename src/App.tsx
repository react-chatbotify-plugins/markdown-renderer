import ChatBot, { Flow, Params } from "react-chatbotify";

import RcbPlugin from "./factory/RcbPluginFactory";
import { MarkdownLatexRendererBlock } from "./types/MarkdownLatexRendererBlock";
import MarkdownLatexWrapper from "./components/MarkdownLatexWrapper";

const mdLatexText = `
### Markdown with LaTeX

Given a **formula** below
$$
s = ut + \\frac{1}{2}at^{2}
$$
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
`

const App = () => {
	// initialize the plugin
	const plugins = [RcbPlugin({markdownLatexComponent: MarkdownLatexWrapper})];

	// example flow for testing
	const flow: Flow = {
		start: {
			message: "#### Hello! I'm rendering messages in markdown with latex, you can type to me in markdown with latex too!",
			path: "loop",
			renderMarkdownLatex: ["BOT", "USER"],
		} as MarkdownLatexRendererBlock,
		loop : {
			message: async (params: Params) => {
				await params.injectMessage(mdLatexText);
			},
			chatDisabled: false,
			path: "loop",
			renderMarkdownLatex: ["BOT", "USER"],
		} as MarkdownLatexRendererBlock,
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