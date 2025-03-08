import { Block } from "react-chatbotify";

/**
 * Extends the Block from React ChatBotify to support markdown latex renderer attributes.
 */
export type MarkdownLatexRendererBlock = Block & {
    renderMarkdownLatex?: Array<"USER" | "BOT">;
};