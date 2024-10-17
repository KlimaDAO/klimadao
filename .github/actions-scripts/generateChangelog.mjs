import { Octokit } from 'octokit'

console.log('asd node version', process.version)
console.log('asd directory', process.cwd())

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const lastTag = process.env.LAST_TAG

const subgraphDir = process.env.SUBGRAPH_NAME
const newTag = `${subgraphDir}-v${process.env.NEW_PUBLISHED_VERSION}`

const owner = 'klimadao'
const repo = 'klima-subgraph'

// const octokit = new Octokit({
//   auth: process.env.SEVEN_DAY_TOKEN_FOR_TUFNEL,
// })

// // @todo remove after testing
// const lastTag = 'carbonmark-v1.6.0'
// const newTag = 'carbonmark-v1.6.1'
// const subgraphDir = 'carbonmark'

console.log(`Generating changelog from ${subgraphDir}-v${lastTag} to ${subgraphDir}-${newTag}`)

// Fetch commits between the two tags

async function generateChangelog() {
  let prNumbers = new Set()
  let changelogEntries = []

  if (lastTag === '0.0.0') {
    changelogEntries.push({
      number: 0,
      title: `Initial release of versioned ${subgraphDir} subgraph`,
      url: `https://github.com/klimadao/klima-subgraph/releases/tag/${newTag}`,
      versionChanges: 'initial-release of versioned subgraph',
      author: 'klimadao',
    })
  } else {
    const { data: commitComparison } = await octokit.rest.repos.compareCommitsWithBasehead({
      owner,
      repo,
      basehead: `${lastTag}...${newTag}`,
    })

    // Handle if this is the first released of a versioned subgraph
    if (commitComparison.commits.length === 0) {
      console.log('No changes.')
      return
    }

    const commits = commitComparison.commits

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
          const conventionalCommitRegex =
            /^(feat|fix|perf|style|refactor|test|ci|chore|revert)(?:\(.*?\))?!?:\s*(.*)$/gim
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
            continue
          }
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
}

generateChangelog().then(() => {
  console.log('Changelog generated')
})
