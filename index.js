const core = require('@actions/core')
const main = require('./src/main')

async function run() {
  try {
    const entries = await main.exportEnvFile({
      region: core.getInput('region'),
      bucket: core.getInput('bucket'),
      key: core.getInput('key'),
    })
    const mask = core.getInput('mask') === 'true'
    for (const { key, value } of entries) {
      core.exportVariable(key, value)
      core.setOutput(key, value)
      if (mask) {
        core.setSecret(value)
      }
    }
    core.startGroup('Completed to fetch below envrionment variables')
    core.info(entries.map(({ key, value }) => `${key}:${value}`).join('\n'))
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
