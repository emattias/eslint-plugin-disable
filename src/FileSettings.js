const constants = require('./constants');

function toPluginsArray(value) {
  const plugins = Array.isArray(value) ? value.slice() : [value];

  // Remove self from plugin list
  const index = plugins.indexOf(constants.PLUGIN_NAME_SHORT);
  if (index > -1) {
    plugins.splice(index, 1);
  }

  return plugins;
}

function FileSettings(eslintFileConfig) {
  const fileConfig = eslintFileConfig || {};
  const fileConfigSettings = fileConfig.settings || {};
  const pluginSettings = fileConfigSettings[constants.PLUGIN_NAME] || {};

  // Plugins, set in "plugins" option of ESLint config
  this.registeredPlugins = toPluginsArray(fileConfig.plugins || []);

  // Plugins that are going to be disabled.
  // By default if no user settings are specified, all registered plugins
  // will be disabled.
  this.settingsPlugins = toPluginsArray(pluginSettings.plugins || []);

  // Affects only plugins from settings. Reverses regular behavior to instead
  // disable all registered plugins except the ones specified.
  this.disableAllExcept = pluginSettings.disableAllExcept || false;

  // Pass-thru external processor id if any
  // Follow processor naming convention ("pluginName/processorName")
  this.externalProcessor = pluginSettings.externalProcessor || null;
}

module.exports = FileSettings;
