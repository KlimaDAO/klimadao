import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// const octokit = new Octokit({
//   auth: process.env.SEVEN_DAY_TOKEN_FOR_TUFNEL,
// })

const lastTag = process.env.LAST_TAG
const newTag = process.env.NEW_PUBLISHED_VERSION
const subgraphDir = process.env.SUBGRAPH_NAME

const owner = 'klimadao'
const repo = 'klima-subgraph'

// @todo remove after testing
// const lastTag = 'carbonmark-v1.6.0'
// const newTag = 'carbonmark-v1.6.1'
// const subgraphDir = 'carbonmark'

console.log(`Generating changelog from ${lastTag} to ${newTag} for subgraph: ${subgraphDir}`)

// Fetch commits between the two tags

const { data: commitComparison } = await octokit.rest.repos.compareCommitsWithBasehead({
  owner,
  repo,
  basehead: `${lastTag}...${newTag}`,
})

// // Handle if this is the first released of a versioned subgraph
// if (commitComparison.commits.length === 0) {
//   console.log('No changes.')
//   return
// }
// @todo fi test goes well wrap all in function so can return here

const commits = commitComparison.commits

let prNumbers = new Set()
let changelogEntries = []

const reversedCommits = commits.reverse()

for (const commit of reversedCommits) {
  // Check if the commit affects files in the subgraph directory
  const { data: commitData } = await octokit.rest.repos.getCommit({
    owner,
    repo,
    ref: commit.sha,
  })

  const filesChanged = commitData.files.map((file) => file.filename)
  const affectsSubgraph = filesChanged.some((filename) => filename.startsWith(subgraphDir + '/'))

  if (!affectsSubgraph) {
    continue // Skip commits that don't affect the current subgraph
  }

  // Get PRs associated with the commit
  const { data: prs } = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
    owner,
    repo,
    commit_sha: commit.sha,
  })

  for (const pr of prs) {
    // Avoid duplicates
    if (prNumbers.has(pr.number)) continue
    prNumbers.add(pr.number)

    const prBody = pr.body || ''
    const changelogMatch = prBody.match(/## ?📝 Changelog\s*([\s\S]*?)(?:##|$)/i)

    if (changelogMatch) {
      const changelogText = changelogMatch[1].trim()

      // Remove the example and instructions from the changelog text
      const actualChangelogText = changelogText.replace(/<!--[\s\S]*?-->/, '').trim()

      // Extract conventional commit messages from changelog text
      const conventionalCommitRegex = /^(feat|fix|perf|style|refactor|test|ci|chore|revert)(?:\(.*?\))?!?:\s*(.*)$/gim
      const conventionalCommits = [...actualChangelogText.matchAll(conventionalCommitRegex)]

      if (conventionalCommits.length > 0) {
        for (const [, type, message] of conventionalCommits) {
          changelogEntries.push({
            number: pr.number,
            title: pr.title,
            url: pr.html_url,
            versionChanges: `${type.toLowerCase()}: ${message.trim()}`,
            author: pr.user.login,
          })
        }
      } else {
        console.log('NO CHANGELOG FOUND FOR PR', pr.number)
        break
      }
    }
  }

  if (changelogEntries.length === 0) {
    core.setOutput('changelog', 'No changes.')
  } else {
    let changelog = ''
    for (const entry of changelogEntries) {
      changelog += `- PR [#${entry.number}](${entry.url}) by @${entry.author}:\n${entry.versionChanges}\n\n`
    }
    core.setOutput('changelog', changelog)
  }
}
