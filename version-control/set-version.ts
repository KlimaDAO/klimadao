import fs from 'fs'
import path from 'path'

type Subgraph = {
  name: string
  versionJsonPath: string
  outputFile: string
  packageJsonPath: string
}

const scriptDir = __dirname
const subgraphsConfigPath = path.join(scriptDir, 'config.json')

const subgraphs: Subgraph[] = JSON.parse(fs.readFileSync(subgraphsConfigPath, 'utf8'))

const currentDir = process.cwd()
const subgraphName = path.basename(currentDir)

const subgraph = subgraphs.find((sg) => sg.name === subgraphName)

if (!subgraph) {
  console.error(`Subgraph configuration not found for current directory: ${subgraphName}`)
  process.exit(1)
}

// Function to inject versions for a single subgraph
function injectSubgraphVersion(subgraph: Subgraph) {
  const { name, versionJsonPath, outputFile } = subgraph

  try {
    const versionJsonFullPath = path.resolve(currentDir, versionJsonPath)
    const outputFullPath = path.resolve(currentDir, outputFile)

    const versions = JSON.parse(fs.readFileSync(versionJsonFullPath, 'utf8'))

    if (!versions.schemaVersion || !versions.publishedVersion) {
      console.error(`Missing schemaVersion or publishedVersion in ${name} version.json`)
      return
    }

    const schemaVersion = versions.schemaVersion
    const publishedVersion = versions.publishedVersion

    const versionTsContent = `
      // This file is auto-generated by set-version.ts
      export const SCHEMA_VERSION = '${schemaVersion}';
      export const PUBLISHED_VERSION = '${publishedVersion}';
    `

    fs.writeFileSync(outputFullPath, versionTsContent.trim())

    console.log(`Version information set into ${name} for version entity.`)
  } catch (error) {
    console.error(`Error setting versions for ${name}:`, error)
  }
}


injectSubgraphVersion(subgraph)
