# Find your first TODO

This guide takes you from installing Todo Tree by NostraDavid to opening a TODO from its sidebar.
You need the desktop version of [Visual Studio Code](https://code.visualstudio.com/).

## Install the extension

### Marketplace

If a Marketplace listing is available, open the Extensions view, search for **Todo Tree by NostraDavid**, and verify that the publisher is **nostradavid** before installing. This source repository does not imply that a Marketplace listing has been published.

### VSIX package

If a GitHub release includes a `.vsix` asset, download it from [GitHub releases](https://github.com/NostraDavid/vscode-todo-tree/releases).
In the Extensions view, open the **...** menu, select **Install from VSIX...**, and choose the downloaded file.

Disable or uninstall **Gruntfuggly.todo-tree** before using this fork. Both extensions contribute the same view and commands.

## Open a TODO

1. Open a folder in VS Code.
2. Create a JavaScript file named `example.js`.
3. Add this line and save the file:

   ```javascript
   // TODO: Try Todo Tree by NostraDavid
   ```

4. Select the Todo Tree icon in the activity bar.
5. Select **Refresh** if the new comment has not appeared.
6. Click the comment in the tree. VS Code opens `example.js` at that line.

The extension also finds `FIXME` and other configured tags. See the [configuration reference](../README.md#configuration).

## Share your ripgrep setting across machines

Todo Tree uses `ripgrep`, a command-line search program whose executable is named `rg`.
It first checks your custom setting, then tries VS Code's bundled copies.

If your setup provides `rg` at `~/.local/bin/rg`, open **Preferences: Open User Settings (JSON)** from the Command Palette.
Add this property inside your existing settings object:

```json
{
  "todo-tree.ripgrep.ripgrep": "~/.local/bin/rg"
}
```

The leading `~` resolves to the home directory of the user running the extension.
The same text can therefore work on machines whose home directories are `/home/alex` and `/Users/12345`.
The executable must exist at that location on each machine. This setting does not install ripgrep.
In an SSH session or container, the path belongs to the machine running the extension host.

If your executable is elsewhere, use its full path instead. On Windows, escape backslashes in JSON:

```json
{
  "todo-tree.ripgrep.ripgrep": "C:\\Tools\\ripgrep\\rg.exe"
}
```

Existing `todo-tree.*` settings keep their names when you move from the original extension to this fork.
VS Code treats the fork as a separate extension, so installing the original does not automatically install this one.

## Check a missing search result

- Save the file and refresh the Todo Tree view.
- Check that you opened the folder containing the file.
- Check that the file is not excluded by your Git ignore rules or Todo Tree filters.
- If Todo Tree cannot find ripgrep, check that the configured executable exists.
- Enable `todo-tree.general.debug` and inspect Todo Tree's output for the search command and errors.

If the problem remains, [open an issue](https://github.com/NostraDavid/vscode-todo-tree/issues) with your operating system, VS Code version, extension version, and a small example.
Remove private paths and file contents from logs before sharing them.
