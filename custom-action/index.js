const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit')

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const repoToken = core.getInput('repo-token');
    const octokit = new github.GitHub(repoToken);
    const tools = new Toolkit()

    const { data: repo } = await octokit.repos.get({
      owner: 'weppos',
      repo: 'test-action',
    });

    console.log(repo);
    console.log(tools.context.payload);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
