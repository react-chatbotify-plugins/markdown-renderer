import {
	Flow,
	RcbChunkStreamMessageEvent,
	RcbPreInjectMessageEvent,
	RcbStartStreamMessageEvent,
} from 'react-chatbotify';
import { MarkdownRendererBlock } from '../types/MarkdownRendererBlock';

/**
 * Helper function to determine if markdown rendering should occur.
 *
 * @param event specific message send event
 * @param currFlow current flow used by the chatbot
 * @param sender sender of the message
 */
const shouldRenderMarkdown = (
	event: RcbPreInjectMessageEvent | RcbStartStreamMessageEvent | RcbChunkStreamMessageEvent,
	currFlow: Flow,
	sender: string
): boolean => {
	// if message content is not string, nothing to do
	if (typeof event.data.message.content !== 'string') {
		return false;
	}

	// check current block exist
	if (!event.detail.currPath) {
		return false;
	}
	const currBlock = currFlow[event.detail.currPath] as MarkdownRendererBlock;
	if (!currBlock) {
		return false;
	}

	// check if sender is included for rendering markdown
	return currBlock.renderMarkdown?.map((elem) => elem.toUpperCase()).includes(sender) ?? false;
};

export { shouldRenderMarkdown };
