import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { parseManifest, parseRegistryIndex, satisfies } from '@senior-skills/core';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const featureSkills = [
  'collaborative-feature-definition',
  'feature-architecture-analysis',
  'feature-context-analysis',
  'feature-contract-definition',
  'feature-decision-analysis',
  'feature-decomposition',
  'feature-discovery',
  'feature-engineering',
  'feature-execution',
  'feature-feasibility-experiment',
  'feature-implementation-plan',
  'feature-progress-tracking',
  'feature-readiness-review',
  'feature-requirement-clarification',
  'feature-risk-analysis',
  'feature-scope-analysis',
  'feature-solution-analysis',
];
const supportingSkills = [
  'architecture-coupling-and-quanta',
  'architecture-decision-making',
  'architecture-trade-off-analysis',
  'clean-delivery-workflow',
  'code-review',
  'coding-agent-discipline',
  'debugging',
  'delivery-semantics',
  'failure-models',
  'layering-and-boundaries',
  'quality-gates',
  'requirements-and-acceptance',
  'rpc-and-api-contracts',
  'schema-evolution-and-compatibility',
  'technical-debt-decisions',
];
const domainSkills = ['senior-hcm-specialist'];
const manifests = new Map(
  readdirSync(join(repoRoot, 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const source = join(repoRoot, 'skills', entry.name, 'skill.yaml');
      return [entry.name, parseManifest(readFileSync(source, 'utf8'), { strict: true }).manifest];
    }),
);

test('the catalog contains exactly the approved feature, supporting and domain skills', () => {
  assert.deepEqual(
    [...manifests.keys()].sort(),
    [...featureSkills, ...supportingSkills, ...domainSkills].sort(),
  );
  const required = new Set([...featureSkills, ...domainSkills]);
  for (const name of required) {
    const manifest = manifests.get(name);
    assert.ok(manifest, `Missing required skill: ${name}`);
    assert.equal(manifest.name, name);
    for (const dependency of [
      ...(manifest.dependencies ?? []),
      ...(manifest.optionalDependencies ?? []),
    ]) {
      const target = manifests.get(dependency.name);
      assert.ok(target, `${name} requires missing skill ${dependency.name}`);
      assert.ok(
        satisfies(target.version, dependency.version),
        `${name} requires ${dependency.name}@${dependency.version}, found ${target.version}`,
      );
      required.add(dependency.name);
    }
    for (const suggestion of manifest.suggests ?? []) {
      assert.ok(manifests.has(suggestion), `${name} suggests missing skill ${suggestion}`);
    }
  }
  assert.deepEqual([...manifests.keys()].sort(), [...required].sort());
});

test('the published index contains exactly the retained catalog', () => {
  const index = parseRegistryIndex(
    readFileSync(join(repoRoot, 'registry', 'skills.yaml'), 'utf8'),
    'registry/skills.yaml',
  );
  assert.deepEqual(index.skills.map((skill) => skill.name).sort(), [...manifests.keys()].sort());
});
