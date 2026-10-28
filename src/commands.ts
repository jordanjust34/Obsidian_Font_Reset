import type FontResetPlugin from './main';
import { resetZoom } from './reset';

export function registerCommands(plugin: FontResetPlugin): void {
	plugin.addCommand({
		id: 'reset-note-font-size',
		name: 'Reset font size',
		callback: () => resetZoom(plugin),
	});
}
