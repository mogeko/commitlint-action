import * as core from "@actions/core"
import * as github from "@actions/github"
import lint from "@commitlint/lint"
import load from "@commitlint/load"
import format from "@commitlint/format"
import { LintOutcome } from "@commitlint/types"
import { OctokitResponse } from "@octokit/types"

// Processing config
const getConfig = () => {
  const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE as string
  const input = {
    config: core.getInput("config"),
  }

  if (!input.config) {
    throw new Error("No config found, please set commitlint config to your project!")
  }

  return { config: input.config, opt: { cwd: GITHUB_WORKSPACE } }
}

// Get commit message
const getCommitMsg = async () => {
  type CommitType = OctokitResponse<{ message: string }>
  const { context: cx } = github
  const token = core.getInput("token")
  const octokit = github.getOctokit(token)
  return (await octokit.git.getCommit({
    owner: cx.repo.owner,
    repo: cx.repo.repo,
    commit_sha: cx.sha,
  }) as CommitType).data.message
}

// Output result
const setOutput = (val: LintOutcome) => {
  const fmt = (val: LintOutcome, verbose: boolean) => format({ results: [val] }, {
    color: true,
    helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
    verbose,
  })
  const bool = (val: string): boolean => (val === 'true')
  const strict = bool(core.getInput("strict"))
  const verbose = bool(core.getInput("verbose"))

  if (val.errors.length) {
    core.info("Failed due to the following errors:")
    core.info(fmt(val, verbose))
    process.exit(1)
  }

  if (strict && val.warnings.length) {
    core.info("Failed due to the following warnings:")
    core.info(fmt(val, verbose))
    process.exit(1)
  }
}

export = async function main() {
  const { config, opt } = getConfig()
  const commitMsg = await getCommitMsg()

  await load({ extends: [config] }, opt)
    .then(({ rules }) => {
      lint(commitMsg, rules)
        .then(res => {
          setOutput(res)
        })
    })

  core.info("All good! 🎉")
}
