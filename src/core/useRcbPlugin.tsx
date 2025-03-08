import { useEffect } from "react";
import {
	useBotId,
	useFlow,
	RcbChunkStreamMessageEvent,
	RcbPreInjectMessageEvent,
	Plugin,
	RcbStartStreamMessageEvent,
	useMessages,
	useChatHistory,
	useSettings,
} from "react-chatbotify";

import MarkdownLatexWrapper from "../components/MarkdownLatexWrapper";
import { PluginConfig } from "../types/PluginConfig";
import { DefaultPluginConfig } from "../constants/DefaultPluginConfig";
import { shouldRenderMarkdown } from "../utils/renderConditionHelper";

/**
 * Plugin hook that handles all the core logic.
 *
 * @param pluginConfig configurations for the plugin
 */
const useRcbPlugin = (pluginConfig?: PluginConfig) => {
	const { getBotId } = useBotId();
	const { getFlow } = useFlow();
	const { messages, replaceMessages } = useMessages();
	const { settings } = useSettings();
	const { hasChatHistoryLoaded } = useChatHistory();

	const mergedPluginConfig = { ...pluginConfig, ...DefaultPluginConfig };

	// if custom component provided, use it; otherwise defaults to react-markdown
	const component = mergedPluginConfig.markdownLatexComponent ? mergedPluginConfig.markdownLatexComponent : MarkdownLatexWrapper;

	useEffect(() => {
		if (hasChatHistoryLoaded) {
			const messagesCopy = [...messages];
			for (let i = 0; i < messagesCopy.length && i < (settings.chatHistory?.maxEntries ?? 30); i++) {
				const message = messagesCopy[i];
				if (message.tags?.includes("rcb-markdown-renderer-plugin:parsed")) {
				message.contentWrapper = component;
				}
			}
			replaceMessages(messagesCopy);
		}
	}, [hasChatHistoryLoaded]);

	useEffect(() => {
		/**
		 * Handles message events and adds wrapper to render markdown if applicable.
		 * 
		 * @param event message event received
		 */
		const handleMessageEvent = async (
			event: RcbPreInjectMessageEvent | RcbChunkStreamMessageEvent | RcbStartStreamMessageEvent
		) => {
			const sender = event.data.message?.sender.toUpperCase();

			// check if conditions are met for rendering markdown
			if (!shouldRenderMarkdown(event, getBotId(), getFlow(), sender)) {
				return;
			}


			event.data.message.contentWrapper = component;
			if (!event.data.message.tags) {
				event.data.message.tags = [];
			}
			event.data.message.tags.push("rcb-markdown-renderer-plugin:parsed");
		};

		// adds required events
		window.addEventListener("rcb-pre-inject-message", handleMessageEvent);
		window.addEventListener("rcb-chunk-stream-message", handleMessageEvent);
		window.addEventListener("rcb-start-stream-message", handleMessageEvent);

		return () => {
			window.removeEventListener("rcb-pre-inject-message", handleMessageEvent);
			window.removeEventListener("rcb-chunk-stream-message", handleMessageEvent);
			window.removeEventListener("rcb-start-stream-message", handleMessageEvent);
		};
	}, [getBotId, getFlow, shouldRenderMarkdown]);

	// initializes plugin metadata with plugin name
	const pluginMetaData: ReturnType<Plugin> = {
		name: "@rcb-plugins/markdown-renderer",
	};

	// adds required events in settings if auto config is true
	if (mergedPluginConfig?.autoConfig) {
		pluginMetaData.settings = {
			event: {
				rcbPreInjectMessage: true,
				rcbChunkStreamMessage: true,
				rcbStartStreamMessage: true,
			},
		};
	}

	return pluginMetaData;
};

export default useRcbPlugin;
