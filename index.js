const core = require('@actions/core');
const main = require('./lib/main')

main()
  .catch(e => {
    core.setFailed(e.massage)
  })
