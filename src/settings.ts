import { App, PluginSettingTab, Setting, SliderComponent } from 'obsidian';
import type FontResetPlugin from './main';
import {
	BASE_FONT_SIZE_DEFAULT,
	BASE_FONT_SIZE_MAX,
	BASE_FONT_SIZE_MIN,
	clampFontSize,
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

/**
 * Merges saved data over the defaults and discards invalid values, since
 * `data.json` can be edited by hand or written by an older version.
 */
export function sanitizeSettings(saved: unknown): FontResetSettings {
	const data = typeof saved === 'object' && saved !== null ? (saved as Record<string, unknown>) : {};

	return {
		defaultFontSize:
			typeof data.defaultFontSize === 'number'
				? clampFontSize(data.defaultFontSize)
				: DEFAULT_SETTINGS.defaultFontSize,
		resetWindowZoom:
			typeof data.resetWindowZoom === 'boolean'
				? data.resetWindowZoom
				: DEFAULT_SETTINGS.resetWindowZoom,
	};
}

export class FontResetSettingTab extends PluginSettingTab {
	plugin: FontResetPlugin;

	constructor(app: App, plugin: FontResetPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		let slider: SliderComponent | undefined;

		new Setting(containerEl)
			.setName('Default font size')
			.setDesc('The font size restored when you select the reset button.')
			.addSlider((component) => {
				slider = component;
				component
					.setLimits(BASE_FONT_SIZE_MIN, BASE_FONT_SIZE_MAX, 1)
					.setValue(this.plugin.settings.defaultFontSize)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.defaultFontSize = value;
						await this.plugin.saveSettings();
					});
			})
			.addExtraButton((button) =>
				button
					.setIcon('rotate-ccw')
					.setTooltip('Restore default')
					.onClick(async () => {
						this.plugin.settings.defaultFontSize = DEFAULT_SETTINGS.defaultFontSize;
						slider?.setValue(DEFAULT_SETTINGS.defaultFontSize);
						await this.plugin.saveSettings();
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
