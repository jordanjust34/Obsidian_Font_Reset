import type { App } from 'obsidian';

/** Obsidian's built-in base font size and the range its UI allows. */
export const BASE_FONT_SIZE_DEFAULT = 16;
export const BASE_FONT_SIZE_MIN = 10;
export const BASE_FONT_SIZE_MAX = 30;

/** Built-in command that resets the window zoom (desktop only). */
const RESET_WINDOW_ZOOM_COMMAND = 'window:reset-zoom';

/**
 * Obsidian does not expose font-size controls in its public typings, but the
 * font-size hotkeys and Ctrl/Cmd + scroll all go through `setBaseFontSize`.
 * Everything here is optional because it is undocumented and may change.
 */
interface AppWithFontSize extends App {
	setBaseFontSize?: (size: number) => void;
	commands?: {
		executeCommandById?: (id: string) => boolean;
	};
}

/** Coerces any value to a whole font size within Obsidian's supported range. */
export function clampFontSize(value: unknown): number {
	const size = typeof value === 'number' ? value : Number.NaN;
	if (!Number.isFinite(size)) return BASE_FONT_SIZE_DEFAULT;
	return Math.min(BASE_FONT_SIZE_MAX, Math.max(BASE_FONT_SIZE_MIN, Math.round(size)));
}

export function isFontSizeSupported(app: App): boolean {
	return typeof (app as AppWithFontSize).setBaseFontSize === 'function';
}

/**
 * Sets the base font size, clamped to the range Obsidian supports.
 * Returns false if the internal API is missing or throws.
 */
export function setBaseFontSize(app: App, size: number): boolean {
	const target = app as AppWithFontSize;
	if (typeof target.setBaseFontSize !== 'function') return false;

	try {
		target.setBaseFontSize(clampFontSize(size));
		return true;
	} catch (error) {
		console.error('Font Reset: failed to set the base font size', error);
		return false;
	}
}

/**
 * Runs Obsidian's own reset-zoom command.
 * Returns false if the command is unavailable (for example on mobile) or throws.
 */
export function resetWindowZoom(app: App): boolean {
	const commands = (app as AppWithFontSize).commands;
	if (typeof commands?.executeCommandById !== 'function') return false;

	try {
		return commands.executeCommandById(RESET_WINDOW_ZOOM_COMMAND);
	} catch (error) {
		console.error('Font Reset: failed to reset the window zoom', error);
		return false;
	}
}
