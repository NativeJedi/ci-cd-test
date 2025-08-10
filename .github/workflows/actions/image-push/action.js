const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const registry = 'ghcr.io';
    const repo = process.env.GITHUB_REPOSITORY;
    const sha = process.env.GITHUB_SHA;

    const imageTag = `${registry}/${repo}:${sha}`;

    core.info(`Image tag: ${imageTag}`);

    await exec.exec('docker', ['login', registry, '-u', 'x-access-token', '-p', token]);

    // Build Docker image
    await exec.exec('docker', ['build', '-t', imageTag, '.']);
    await exec.exec('docker', ['push', imageTag]);

    core.setOutput('image', imageTag);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
