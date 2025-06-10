import useRcbPlugin from '../core/useRcbPlugin';
import { PluginConfig } from '../types/PluginConfig';

/**
 * Factory that prepares the plugin hook to be consumed by the core library.
 *
 * @param pluginConfig configurations for the plugin
 */
const RcbPluginFactory = (pluginConfig?: PluginConfig) => {
	// any custom logic to be ran before hook initialization can be done here

	// prepares and returns the plugin hook without calling it, because the
	// initialization of the hook should be handled by the core library itself
	const usePreparedRcbPlugin = () => useRcbPlugin(pluginConfig);
	return usePreparedRcbPlugin;
};

export default RcbPluginFactory;
