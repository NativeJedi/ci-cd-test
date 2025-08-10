import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const registry = process.env.REGISTRY ?? 'ghcr.io';
    const imageName = (process.env.IMAGE_NAME ?? '').toLowerCase();
    const token = process.env.TOKEN ?? '';
    const sha = process.env.GITHUB_SHA?.substring(0, 7) ?? 'local';

    await exec.exec('npm', ['ci', '--omit=dev']);
    await exec.exec('npm', ['run', 'build']);

    await exec.exec('docker', ['login', registry, '-u', 'x-access-token', '-p', token]);
    const tag = `${registry}/${imageName}:${sha}`;
    await exec.exec('docker', ['build', '.', '-t', tag]);
    await exec.exec('docker', ['push', tag]);
    core.setOutput('image', tag);
  } catch (e) {
    core.setFailed((e as Error).message);
  }
}

run();
