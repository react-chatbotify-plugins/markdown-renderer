import { useEffect } from 'react';
import {
	useFlow,
	RcbChunkStreamMessageEvent,
	RcbPreInjectMessageEvent,
	Plugin,
	RcbStartStreamMessageEvent,
	useMessages,
	useChatHistory,
	useSettings,
	RcbStartSimulateStreamMessageEvent,
	RcbEvent,
	useOnRcbEvent,
} from 'react-chatbotify';

import MarkdownWrapper from '../components/MarkdownWrapper';
import { PluginConfig } from '../types/PluginConfig';
import { DefaultPluginConfig } from '../constants/DefaultPluginConfig';
import { shouldRenderMarkdown } from '../utils/renderConditionHelper';

/**
 * Plugin hook that handles all the core logic.
 *
 * @param pluginConfig configurations for the plugin
 */
const useRcbPlugin = (pluginConfig?: PluginConfig) => {
	const { getFlow } = useFlow();
	const { messages, replaceMessages } = useMessages();
	const { settings } = useSettings();
	const { hasChatHistoryLoaded } = useChatHistory();

	const mergedPluginConfig = { ...pluginConfig, ...DefaultPluginConfig };

	// if custom component provided, use it; otherwise defaults to react-markdown
	const component = mergedPluginConfig.markdownComponent ? mergedPluginConfig.markdownComponent : MarkdownWrapper;

	useEffect(() => {
		if (hasChatHistoryLoaded) {
			const messagesCopy = [...messages];
			for (let i = 0; i < messagesCopy.length && i < (settings.chatHistory?.maxEntries ?? 30); i++) {
				const message = messagesCopy[i];
				if (message.tags?.includes('rcb-markdown-renderer-plugin:parsed')) {
					message.contentWrapper = component;
				}
			}
			replaceMessages(messagesCopy);
		}
	}, [hasChatHistoryLoaded]);

	/**
	 * Handles message events and adds wrapper to render markdown if applicable.
	 *
	 * @param event message event received
	 */
	const handleMessageEvent = async (
		event:
			| RcbPreInjectMessageEvent
			| RcbChunkStreamMessageEvent
			| RcbStartSimulateStreamMessageEvent
			| RcbStartStreamMessageEvent
	) => {
		const sender = event.data.message?.sender.toUpperCase();

		// check if conditions are met for rendering markdown
		if (!shouldRenderMarkdown(event, getFlow(), sender)) {
			return;
		}

		event.data.message.contentWrapper = component;
		if (!event.data.message.tags) {
			event.data.message.tags = [];
		}
		event.data.message.tags.push('rcb-markdown-renderer-plugin:parsed');
	};

	useOnRcbEvent(RcbEvent.PRE_INJECT_MESSAGE, handleMessageEvent);
	useOnRcbEvent(RcbEvent.CHUNK_STREAM_MESSAGE, handleMessageEvent);
	useOnRcbEvent(RcbEvent.START_STREAM_MESSAGE, handleMessageEvent);
	useOnRcbEvent(RcbEvent.START_SIMULATE_STREAM_MESSAGE, handleMessageEvent);

	// initializes plugin metadata with plugin name
	const pluginMetaData: ReturnType<Plugin> = {
		name: '@rcb-plugins/markdown-renderer',
	};

	// adds required events in settings if auto config is true
	if (mergedPluginConfig?.autoConfig) {
		pluginMetaData.settings = {
			event: {
				rcbPreInjectMessage: true,
				rcbChunkStreamMessage: true,
				rcbStartSimulateStreamMessage: true,
				rcbStartStreamMessage: true,
			},
		};
	}

	return pluginMetaData;
};

export default useRcbPlugin;
