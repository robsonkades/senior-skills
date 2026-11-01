import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (path) => JSON.parse(readFileSync(join(repoRoot, path), 'utf8'));

test('release versions agree across the root, workspace packages, internal dependencies and lockfile', () => {
  const root = readJson('package.json');
  const lock = readJson('package-lock.json');
  const packages = root.workspaces.map((directory) => ({
    directory,
    manifest: readJson(`${directory}/package.json`),
  }));
  const names = new Set(packages.map(({ manifest }) => manifest.name));

  assert.equal(lock.version, root.version, 'Lockfile root version must match the release');
  assert.equal(lock.packages[''].version, root.version, 'Locked root package must match');

  for (const { directory, manifest } of packages) {
    assert.equal(manifest.version, root.version, `${manifest.name} must use the release version`);
    const locked = lock.packages[directory];
    assert.ok(locked, `${directory} must have a lockfile entry`);
    assert.equal(locked.version, manifest.version, `${manifest.name} has a stale locked version`);

    for (const [name, range] of Object.entries(manifest.dependencies ?? {})) {
      if (!name.startsWith('@senior-skills/')) continue;
      assert.ok(names.has(name), `${manifest.name} refers to an unknown internal package: ${name}`);
      assert.equal(range, root.version, `${manifest.name} must pin ${name} to this release`);
      assert.equal(
        locked.dependencies?.[name],
        range,
        `${manifest.name} has a stale locked dependency on ${name}`,
      );
    }
  }
});
