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

	if (!setBaseFontSize(app, settings.defaultFontSize)) {
		new Notice('Could not reset the font size. See the developer console for details.');
		return;
	}

	const zoomReset = settings.resetWindowZoom ? resetWindowZoom(app) : true;

	new Notice(
		zoomReset
			? `Font size reset to ${settings.defaultFontSize}px`
			: `Font size reset to ${settings.defaultFontSize}px, but the window zoom could not be reset`,
	);
}
