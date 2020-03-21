const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit')

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const repoToken = core.getInput('repo-token');
    const tools = new Toolkit()

    const eventPayload = tools.context.payload;
    const { repository: repo } = eventPayload;
    const { issue: issue } = eventPayload;

    const { body: issueBody } = issue;
    let labels = [];
    if (issueBody.includes("bear")) {
      labels.push("bear");
    }
    if (issueBody.includes("bird")) {
      labels.push("bird");
    }
    if (issueBody.includes("beer")) {
      labels.push("beer");
    }
    if (issueBody.includes("beard")) {
      labels.push("beard");
    }

    const octokit = new github.GitHub(repoToken);
    await octokit.issues.replaceLabels({
      owner: repo.owner.login,
      repo: repo.name,
      issue_number: issue.number,
      labels: labels,
    });

    // const octokit = new github.GitHub(repoToken);
    // const { data: repo } = await octokit.repos.get({
    //   owner: 'weppos',
    //   repo: 'test-action',
    // });

    // console.log(repo);
    console.log(labels);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
