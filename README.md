# Todo Tree by NostraDavid

Todo Tree searches your VS Code workspace for tags such as `TODO`, `FIXME` and `BUG`. Results appear in a tree, open at the matching line, and can also be highlighted in the editor. Searches use ripgrep.

This is NostraDavid's maintained fork of [Todo Tree](https://github.com/Gruntfuggly/todo-tree), originally created by Nigel Scott. It keeps the existing `todo-tree.*` settings and command IDs. See [the fork's release notes](CHANGELOG.md) and [the original MIT license and copyright notice](License.txt).

## Install

### From the Marketplace

If a Marketplace listing is available, search for **Todo Tree by NostraDavid** in VS Code and verify the publisher is **nostradavid** before installing. This repository does not imply that a Marketplace listing has been published.

### From a VSIX

If a [GitHub release](https://github.com/NostraDavid/vscode-todo-tree/releases) includes a `.vsix` asset, download it. In VS Code, open **Extensions**, select **...**, choose **Install from VSIX...**, and select the downloaded file.

Disable or uninstall **Gruntfuggly.todo-tree** before using this fork. Both extensions register the same view and commands.

### From source

For a local development build, clone this repository, run `npm ci`, then `npm run build`. Press **F5** in VS Code to open an Extension Development Host. To create a local VSIX, enter the development environment and run `just package`. See [the getting-started guide](docs/getting-started.md) and [contribution instructions](CONTRIBUTING.md).

## Quick start

1. Open a folder in VS Code.
2. Add a comment such as `// TODO: Follow up` and save it.
3. Open **Todo Tree** from the activity bar. Select **Refresh** if needed.
4. Select a result to open its file at the matching line.

By default, the extension recognizes `BUG`, `HACK`, `FIXME`, `TODO`, `XXX`, `[ ]` and `[x]`. Existing settings and commands keep their names when moving from the original extension.

## Configuration

Open **Preferences: Open Settings (UI)** and search for `Todo Tree` to see all available settings. These common options can also be added to `settings.json`:

```json
{
  "todo-tree.general.tags": ["TODO", "FIXME", "BUG", "[ ]", "[x]"],
  "todo-tree.filtering.excludeGlobs": ["**/dist/**", "**/vendor/**"],
  "todo-tree.tree.scanMode": "workspace",
  "todo-tree.ripgrep.ripgrep": "~/.local/bin/rg",
  "todo-tree.highlights.customHighlight": {
    "TODO": { "foreground": "#d7ba7d", "icon": "check" },
    "FIXME": { "foreground": "#f44747", "icon": "flame" }
  }
}
```

- `todo-tree.general.tags` sets the recognized tags. If you customize `todo-tree.regex.regex`, keep its `$TAGS` placeholder so the tag list is applied.
- `todo-tree.filtering.includeGlobs` and `todo-tree.filtering.excludeGlobs` limit matching files. VS Code and ripgrep ignore rules also affect results.
- `todo-tree.tree.scanMode` selects `workspace`, `open files`, `current file` or `workspace only`.
- `todo-tree.highlights.defaultHighlight` sets shared styling; `todo-tree.highlights.customHighlight` overrides it for individual tags.
- Leave `todo-tree.ripgrep.ripgrep` empty to let Todo Tree locate ripgrep. Set it to a custom executable path when needed. A leading `~` expands to the extension host user's home directory; this does not install ripgrep.

### Markdown support

The default regular expression recognizes Markdown task-list entries, including unchecked (`- [ ]`) and checked (`- [x]`) items. Both checkbox markers are included in the default tag list. Add or remove them in `todo-tree.general.tags` to change which tasks appear.

If you replace `todo-tree.regex.regex`, keep the `$TAGS` placeholder and include the Markdown list prefixes you want to match. The default expression also recognizes common comment forms.

## Highlighting

Use `todo-tree.highlights.defaultHighlight` to set shared styling and `todo-tree.highlights.customHighlight` to override it for individual tags. For example:

```json
{
  "todo-tree.highlights.defaultHighlight": {
    "type": "text",
    "foreground": "#ffffff",
    "background": "#365880"
  },
  "todo-tree.highlights.customHighlight": {
    "FIXME": { "foreground": "#ff5555", "icon": "flame" }
  }
}
```

The `type` option controls the highlighted range; common values include `tag`, `text` and `line`. Colors can use CSS values or supported VS Code theme colors. The Settings UI describes the remaining options.

## Common controls

The tree title and context menus provide refresh, filtering, tree/flat/tag views, grouping, scan modes, expand/collapse, and export actions. The Command Palette also contains commands prefixed with **Todo Tree**.

## Credits and notices

The original project's [upstream README](https://github.com/Gruntfuggly/todo-tree#credits) records the following icon credits. They are retained here as historical, project-level acknowledgements; available records do not map each credit to every individual asset in this fork:

- Main icons: [Freepik](https://www.freepik.com/) via [Flaticon](https://www.flaticon.com/), licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Tree-view icons: [Vaadin](https://www.flaticon.com/authors/vaadin) via Flaticon, licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Tag icons: [Dave Gandy](https://www.flaticon.com/authors/dave-gandy) via Flaticon, licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Tags icon: [Vectors Market](https://www.flaticon.com/authors/vectors-market) via Flaticon, licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Reveal icon: [Gregor Cresnar](https://www.flaticon.com/authors/gregor-cresnar) via Flaticon. The upstream credit does not specify a license for this item.
- Icon updates to match the VS Code 1.37 interface: [johnletey](https://github.com/johnletey).
- Simplified Chinese translation: [loniceras](https://github.com/loniceras).

`resources/icons/license.txt` contains a separate [CC BY-ND 3.0](https://creativecommons.org/licenses/by-nd/3.0/) notice for the icon collection it describes. That file identifies Austin Andrews ([Templarian](https://templarian.com/)) as creator. The notice is retained unchanged and is not interchangeable with the upstream README's CC BY credits; the available records do not establish which notice applies to every individual image.

The extension's original MIT license and Nigel Scott's copyright notice remain in [License.txt](License.txt). The fork does not replace that license with the icon-asset notices above.
