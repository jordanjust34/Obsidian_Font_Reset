import { Plugin } from 'obsidian';
import { registerCommands } from './commands';
import { DEFAULT_SETTINGS, FontResetSettings, FontResetSettingTab } from './settings';
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
		const saved = (await this.loadData()) as Partial<FontResetSettings> | null;
		this.settings = { ...DEFAULT_SETTINGS, ...saved };
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
