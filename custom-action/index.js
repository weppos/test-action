const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit')

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const repoToken = core.getInput('repo-token');
    const tools = new Toolkit()

    const eventPayload = tools.context.payload;
    console.log(eventPayload);
    const { repository: repo } = eventPayload;
    const { issue: issue } = eventPayload;

    const { body: issueBody } = issue;
    let labels = [];
    if (issueBody.includes("bear")) {
      labels.push("l1");
    }
    if (issueBody.includes("bird")) {
      labels.push("l2");
    }
    if (issueBody.includes("beer")) {
      labels.push("l3");
    }
    if (issueBody.includes("beard")) {
      labels.push("l4");
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
    console.log(tools.context.payload);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
