const { exec } = require("child_process")

function execPromised(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => error ? reject(error) : resolve(stdout))
  })
}

async function checkoutToMaster() {
  console.log("Checking out to master")
  await execPromised("git checkout master")
}

async function rebaseMainIntoMaster() {
  console.log("Rebasing main into master")
  await execPromised("git rebase main")
}

async function runBuild() {
  console.log("Running build...")
  await execPromised("npm run build")
  console.log("BUILD CONCLUDED")
}

async function commitBuildFolder() {
  console.log("Adding files to commit...")
  await execPromised("git add build -f")
  console.log("Doing Commit...")
  await execPromised("git commit -m 'updating build folder'")
}

async function push() {
  console.log("Pushing to branch...")
  await execPromised("git push")
  console.log("UPDATED IN CODEBASE!")
}

async function removeBuildFolderLocally() {
  console.log("Removing build folder...")
  await execPromised("rm -rf build")
  console.log("BUILD FOLDER REMOVED")
}

async function checkoutToMain() {
  console.log("Checking out to main...")
  await execPromised("git checkout main")
  console.log("ALL DONE! Back to main")
}

async function run() {
  try {
    await checkoutToMaster()
    await rebaseMainIntoMaster()
    await runBuild()
    await commitBuildFolder()
    await push()
    await removeBuildFolderLocally()
    await checkoutToMain()
  } catch (err) {
    console.error(err)
  }
}

run()
