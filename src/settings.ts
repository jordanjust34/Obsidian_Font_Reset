import { App, PluginSettingTab, Setting } from 'obsidian';
import type FontResetPlugin from './main';
import {
	BASE_FONT_SIZE_DEFAULT,
	BASE_FONT_SIZE_MAX,
	BASE_FONT_SIZE_MIN,
} from './font-size';

export interface FontResetSettings {
	/** Font size (px) restored by the reset button. */
	defaultFontSize: number;
	/** Also reset the window zoom level (Ctrl/Cmd + scroll or pinch). */
	resetWindowZoom: boolean;
}

export const DEFAULT_SETTINGS: FontResetSettings = {
	defaultFontSize: BASE_FONT_SIZE_DEFAULT,
	resetWindowZoom: true,
};

export class FontResetSettingTab extends PluginSettingTab {
	plugin: FontResetPlugin;

	constructor(app: App, plugin: FontResetPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Default font size')
			.setDesc('The font size restored when you select the reset button.')
			.addSlider((slider) =>
				slider
					.setLimits(BASE_FONT_SIZE_MIN, BASE_FONT_SIZE_MAX, 1)
					.setValue(this.plugin.settings.defaultFontSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.defaultFontSize = value;
						await this.plugin.saveSettings();
					}),
			)
			.addExtraButton((button) =>
				button
					.setIcon('rotate-ccw')
					.setTooltip('Restore default')
					.onClick(async () => {
						this.plugin.settings.defaultFontSize = DEFAULT_SETTINGS.defaultFontSize;
						await this.plugin.saveSettings();
						this.display();
					}),
			);

		new Setting(containerEl)
			.setName('Also reset window zoom')
			.setDesc(
				'Also reset the window zoom level changed with zoom hotkeys or Ctrl/Cmd + scroll. Desktop only.',
			)
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.resetWindowZoom).onChange(async (value) => {
					this.plugin.settings.resetWindowZoom = value;
					await this.plugin.saveSettings();
				}),
			);
	}
}
