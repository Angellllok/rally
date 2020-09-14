const RallyValidate = require('./lib/RallyValidate')
const ExtendedSetup = require('probot-extended-setup')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.load(ExtendedSetup)
  const handler = new RallyValidate(app)

  app.on(['pull_request.opened', 'pull_request.edited',
    'pull_request.reopened', 'pull_request.ready_for_review'],
  async context => handler.handlePullRequest(context))

  app.on(['check_run.rerequested', 'check_suite.rerequested'], async context => handler.rerunCheck(context))
  app.on('pull_request.closed', async context => handler.handlePullRequestClosed(context))
}
