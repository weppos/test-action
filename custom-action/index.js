const core = require('@actions/core');
const github = require('@actions/github');
const process = require('process');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const repoToken = core.getInput('repo-token');
    const octokit = new github.GitHub(repoToken);

    const { data: repo } = await octokit.repos.get({
      owner: 'weppos',
      repo: 'test-action',
    });

    console.log(repo);
    console.log(process.env);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
