import { setIcon } from 'obsidian';
import type FontResetPlugin from '../main';
import { resetZoom } from '../reset';

const LABEL = 'Reset font size';

/** Adds the reset button to the bottom status bar. */
export function addStatusBarButton(plugin: FontResetPlugin): void {
	const statusBarEl = plugin.addStatusBarItem();
	statusBarEl.addClass('font-reset-status-bar');

	const button = statusBarEl.createEl('button', {
		cls: 'font-reset-button clickable-icon',
		attr: {
			'aria-label': LABEL,
			type: 'button',
		},
	});
	setIcon(button, 'rotate-ccw');

	plugin.registerDomEvent(button, 'click', () => resetZoom(plugin));
}
