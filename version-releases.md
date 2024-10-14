# Subgraph Release Process

This document outlines the development and release processes for subgraph management. Follow these steps for efficient subgraph deployment and versioning.

## 1. Development Workflow

### Pull Requests
- All PRs should point at the `staging` branch.
- Every PR must increment the version with the appropriate major/minor/patch version in package.json in order to merge. The `check-version` action will block any PRs that do not increment the version.
- Summarize changes in this PR in the PR description following conventional commit syntax: https://www.conventionalcommits.org/en/v1.0.0/#summary
- **Squash merges** all PRs to the `staging` branch.
- Main will be FF'd from the staging PR in the github deploy action.

### PR Template
Update the PR template to include the following section for documenting changes:

```markdown
# CHANGELOG
<Everything in this section should follow conventional commit syntax.>
```

## 2. Labeling Process for Releases

-   **Alchemy Labels**
    
    -   `alchemy:🚧 needs-promotion`: Indicates that the subgraph on Alchemy is pending promotion.
    -   `alchemy:✅ promoted`: Indicates that the subgraph on Alchemy has been promoted to `Live` and is the default query subgraph.
-   **Graph Labels**
    
    -   `graph:🚧 needs-publish`: Indicates that the subgraph needs to be published after the sync is complete.
    -   `graph:🚧 needs-promotion`: Indicates that the subgraph has been published from the Graph UI and the publish transaction needs to be finalized in the Safe multisig.
    -   `graph:✅ promoted`: The second signer has signed the transaction and the new subgraph version has been successfully published to the decentralized network.

## 3. Post-Release Actions (Subgraph Promotion)

Once the **release-subgraph** action completes, follow these steps to finalize the release:

1.  **Alchemy:**
	a. Wait for sync to finish.
2. **The Graph**:
	a. Wait for sync to complete. This should be immediate because the PR will deploy to staging and no PR should be merged without a successful sync.
	b. Publish the Graph from the Graph UI.
	c. In the auto-created issue, remove `graph: needs publish` and add `graph: needs promotion`
3. In Discord, tag `@SubgraphManager` to request a second signer to publish to the decentralized network.
4. **Second signer:** 
	a. Sign and finalize transaction to deploy new version to decentralized network
	b. Go to Alchemy and promote the same version of the subgraph to `Live`
	c. Go to the auto-created issue and remove `graph: needs promotion` and `alchemy: needs promotion`. Add both `graph: promoted` and `alchemy: promoted`.
5.  Now both subgraphs, both Alchemy and the Graph, will be using the same version.