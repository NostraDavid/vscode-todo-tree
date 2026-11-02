import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import QUnit from 'qunit';
import type { DecorationRenderOptions } from 'vscode';
import { fixture } from './tree-boundary.mts';
for (const icon of ['todo-tree', 'todo-tree-filled', 'not-a-real-icon']) {
  QUnit.test('icon validation recognizes documented built-in names: ' + icon, assert => {
    const f = fixture();
    const workspace = {
      getConfiguration() {
        return {
          get(key: string) {
            return key === 'defaultHighlight.icon' ? icon : undefined;
          },
        };
      },
    };
    const message = f.load('icons.js').validateIcons(
      workspace as unknown as Pick<typeof import('vscode').workspace, 'getConfiguration'>,
    );
    if (icon === 'not-a-real-icon') assert.ok(message.includes(icon));
    else assert.strictEqual(message, '');
  });
}

for (const [legacy, replacement] of [['commit', 'git-commit'], ['issue-tracked-in', 'issue-tracked-by']] as const) {
  QUnit.test('legacy Octicons setting maps to its supported replacement: ' + legacy, assert => {
    const f = fixture({ 'todo-tree.highlights.defaultHighlight': { icon: legacy } });
    const storage = fs.mkdtempSync(path.join(os.tmpdir(), 'todo-tree-icons-'));
    try {
      const icons = f.load('icons.js');
      const workspace = {
        getConfiguration() {
          return { get: (key: string) => key === 'defaultHighlight.icon' ? legacy : undefined };
        },
      };
      assert.strictEqual(
        icons.validateIcons(workspace as unknown as Pick<typeof import('vscode').workspace, 'getConfiguration'>),
        '',
      );
      icons.getIcon({
        asAbsolutePath: (relativePath: string) => relativePath,
        globalStorageUri: { fsPath: storage },
      } as unknown as Pick<import('vscode').ExtensionContext, 'asAbsolutePath' | 'globalStorageUri'>, 'TODO');
      assert.ok(fs.existsSync(path.join(storage, `todo-${replacement}-green.svg`)));
    } finally {
      fs.rmSync(storage, { recursive: true, force: true });
    }
  });
}

for (const [rulerLane, expected] of [['right', 4], ['4', 4], [4, 4], ['none', undefined]]) {
  QUnit.test('decorations pass a numeric ruler lane to VS Code: ' + rulerLane, assert => {
    const f = fixture({ 'todo-tree.highlights.defaultHighlight': { rulerLane } });
    let received: DecorationRenderOptions | undefined;
    f.vscode.window = {
      createTextEditorDecorationType(options) {
        received = options;
        return { dispose() {} };
      },
    };
    f.load('highlights.js').getDecoration('TODO');
    assert.strictEqual(received!.overviewRulerLane, expected);
  });
}
