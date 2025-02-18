import { useEffect } from "react";
import {
	useBotId,
	useFlow,
	RcbChunkStreamMessageEvent,
	RcbPreInjectMessageEvent,
	Plugin,
	RcbStartStreamMessageEvent,
} from "react-chatbotify";

import MarkdownWrapper from "../components/MarkdownWrapper";
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

	const mergedPluginConfig = { ...pluginConfig, ...DefaultPluginConfig };

	// if custom component provided, use it; otherwise defaults to react-markdown
	const component = mergedPluginConfig.markdownComponent ? mergedPluginConfig.markdownComponent : MarkdownWrapper;

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
