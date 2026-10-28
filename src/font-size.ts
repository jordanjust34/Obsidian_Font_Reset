import type { App } from 'obsidian';

/** Obsidian's built-in base font size and the range its UI allows. */
export const BASE_FONT_SIZE_DEFAULT = 16;
export const BASE_FONT_SIZE_MIN = 10;
export const BASE_FONT_SIZE_MAX = 30;

/** Built-in command that resets the window zoom (desktop only). */
const RESET_WINDOW_ZOOM_COMMAND = 'window:reset-zoom';

/**
 * Obsidian does not expose font-size controls in its public typings, but the
 * font-size hotkeys and Ctrl/Cmd + scroll all go through these methods.
 */
interface AppWithFontSize extends App {
	getBaseFontSize?: () => number;
	setBaseFontSize?: (size: number) => void;
	commands?: {
		executeCommandById?: (id: string) => boolean;
	};
}

export function isFontSizeSupported(app: App): boolean {
	return typeof (app as AppWithFontSize).setBaseFontSize === 'function';
}

export function getBaseFontSize(app: App): number | null {
	const { getBaseFontSize: getSize } = app as AppWithFontSize;
	return typeof getSize === 'function' ? getSize.call(app) : null;
}

/** Sets the base font size, clamped to the range Obsidian supports. */
export function setBaseFontSize(app: App, size: number): boolean {
	const { setBaseFontSize: setSize } = app as AppWithFontSize;
	if (typeof setSize !== 'function') return false;

	const clamped = Math.min(BASE_FONT_SIZE_MAX, Math.max(BASE_FONT_SIZE_MIN, Math.round(size)));
	setSize.call(app, clamped);
	return true;
}

/** Runs Obsidian's own reset-zoom command. Returns false if unavailable. */
export function resetWindowZoom(app: App): boolean {
	const commands = (app as AppWithFontSize).commands;
	if (typeof commands?.executeCommandById !== 'function') return false;
	return commands.executeCommandById(RESET_WINDOW_ZOOM_COMMAND);
}
