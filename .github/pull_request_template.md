# Pull Request Template

## 📄 Description

<!--
Provide a concise description of the changes introduced by this PR.
-->

## 📝 Changelog

<!--
**Required**: List all changes using Conventional Commit syntax.
Each entry should start with a type, followed by a colon and a brief description.
These entries will be scraped and included in the release tags.

**Example:**
- `feat: add user authentication module`
- `fix: resolve login issue with special characters`
- `docs: update API usage documentation`
- `perf: improve performance of the login endpoint`
- `test: add unit tests for the authentication module`
- `chore: update dependencies`
- `refactor(carbonProjects)!: removed very important field from entity`

Major changes should be marked with `!` and have a footer the `BREAKING CHANGE:` keyword.

docs: https://www.conventionalcommits.org/en/v1.0.0/#summary

ex: - refactor(carbonProjects)!: removed very important field from entity
-->


## ✅ Checklist


- [ ] Matchstick test included (if applicable).
- [ ] Version incremented in package.json of the applicable subgraph(s)
- [ ] All changes are reflected in the changelog of this PR for the applicable subgraph(s)

## ℹ️ Additional Information

<!--
Provide any additional information or context that may be relevant to this PR.
-->

