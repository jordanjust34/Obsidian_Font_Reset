import { Plugin } from 'obsidian';
import { registerCommands } from './commands';
import {
	DEFAULT_SETTINGS,
	FontResetSettings,
	FontResetSettingTab,
	sanitizeSettings,
} from './settings';
import { addStatusBarButton } from './ui/status-bar-button';

export default class FontResetPlugin extends Plugin {
	settings: FontResetSettings = { ...DEFAULT_SETTINGS };

	async onload() {
		await this.loadSettings();

		addStatusBarButton(this);
		registerCommands(this);
		this.addSettingTab(new FontResetSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = sanitizeSettings(await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
