import { Notice } from 'obsidian';
import type FontResetPlugin from './main';
import { isFontSizeSupported, resetWindowZoom, setBaseFontSize } from './font-size';

/** Restores the configured base font size (and optionally the window zoom). */
export function resetZoom(plugin: FontResetPlugin): void {
	const { app, settings } = plugin;

	if (!isFontSizeSupported(app)) {
		new Notice('Font reset is not supported by this version of Obsidian.');
		return;
	}

	setBaseFontSize(app, settings.defaultFontSize);

	if (settings.resetWindowZoom) {
		resetWindowZoom(app);
	}

	new Notice(`Font size reset to ${settings.defaultFontSize}px`);
}
