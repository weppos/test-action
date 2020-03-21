const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    console.log(`Running ...`)

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
