# Font Reset

An [Obsidian](https://obsidian.md) plugin that resets your font size and zoom level back to normal with one click.

Obsidian lets you change the font size with hotkeys or **Ctrl/Cmd + scroll**, and zoom the whole window with zoom hotkeys. It has no quick way to get back to the default afterwards. Font Reset adds a reset button to the status bar at the bottom of the window.

## Features

- **Status bar button**: select the reset icon at the bottom of the window to restore your default font size.
- **Command palette**: run **Font Reset: Reset font size** from the command palette, or assign it your own hotkey in **Settings → Hotkeys**.
- **Configurable default**: choose the font size the button restores, from 10 to 30 px (Obsidian's own default is 16 px).
- **Window zoom reset**: optionally reset the window zoom level at the same time, so one click undoes both kinds of zoom.

## Usage

1. Install and enable the plugin in **Settings → Community plugins**.
2. Change the font size or zoom as you normally would.
3. Select the **rotate** icon in the status bar, or run **Font Reset: Reset font size** from the command palette.

## Settings

Open **Settings → Font Reset**.

| Setting                 | Description                                                                                   | Default |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------- |
| **Default font size**   | The font size restored when you reset. Select the reset icon next to the slider to go back to 16. | 16 px   |
| **Also reset window zoom** | Also resets the window zoom changed with zoom hotkeys or Ctrl/Cmd + scroll. Desktop only.  | On      |

## Compatibility

- Requires Obsidian **1.4.0** or later.
- **Desktop:** the status bar button, the command, and the window zoom reset all work.
- **Mobile:** Obsidian's mobile app has no status bar, so the button isn't shown. The command still works and resets the font size. Window zoom isn't available on mobile.

### A note on undocumented APIs

Obsidian's public plugin API has no way to change the font size or zoom level. This plugin calls the same internal methods that Obsidian's own font-size hotkeys use (`app.setBaseFontSize`) and runs Obsidian's built-in `window:reset-zoom` command.

These are not part of the supported API and could change in a future Obsidian release. The plugin checks that they exist before using them. If they're missing or fail, you'll see a notice and your notes are never modified. If a future Obsidian update breaks the reset, please [open an issue](https://github.com/jordanjust34/Obsidian_Font_Reset/issues).

## Privacy

Font Reset works entirely offline. It makes no network requests, collects no data, and only stores its two settings in your vault's plugin folder (`.obsidian/plugins/font-reset/data.json`).

## Installation

### From the community plugin list

Once published, search for **Font Reset** in **Settings → Community plugins → Browse**.

### Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/jordanjust34/Obsidian_Font_Reset/releases).
2. Copy them to `<Vault>/.obsidian/plugins/font-reset/`.
3. Reload Obsidian and enable **Font Reset** in **Settings → Community plugins**.

## Development

Requires Node.js 18 or later.

```bash
npm install      # install dependencies
npm run dev      # build in watch mode
npm run build    # type-check and produce a production main.js
npm run lint     # lint (warnings are treated as errors)
```

For quick testing, clone this repo into `<Vault>/.obsidian/plugins/font-reset/`, run `npm run dev`, then reload Obsidian.

### Project layout

```
src/
  main.ts                  Plugin lifecycle only
  commands.ts              Command palette registration
  reset.ts                 The reset action and user feedback
  font-size.ts             Isolated access to Obsidian's internal font-size APIs
  settings.ts              Settings interface, validation, and settings tab
  ui/status-bar-button.ts  Status bar button
styles.css                 Button styles (must stay at the repo root)
```

All Obsidian-internal calls live in `src/font-size.ts`, so if Obsidian changes them, that is the only file to update.

### Linting

ESLint runs with [`eslint-plugin-obsidianmd`](https://github.com/obsidianmd/eslint-plugin), which checks for Obsidian's plugin guidelines, including whether each API used exists in the declared `minAppVersion`. CI runs the build and lint on every push and pull request.

One rule, `obsidianmd/settings-tab/prefer-setting-definitions`, is turned off in `eslint.config.mts`. It recommends an API that requires Obsidian 1.13 or later, and this plugin deliberately supports older versions.

### Releasing

1. Update `minAppVersion` in `manifest.json` if you started using a newer API.
2. Run `npm version patch` (or `minor` / `major`). This bumps the version in `package.json`, `manifest.json`, and `versions.json`.
3. Push the tag. The release workflow builds the plugin and creates a **draft** GitHub release with `main.js`, `manifest.json`, and `styles.css` attached.
4. Review the draft and publish it. The tag must exactly match the version in `manifest.json`, with no leading `v`.

## License

[0-BSD](LICENSE)
