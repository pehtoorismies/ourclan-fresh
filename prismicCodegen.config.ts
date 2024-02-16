export const getEnvironmentVariable = (envVar: string): string => {
  const value = Deno.env.get(envVar)
  if (!value) {
    throw new Error(`Missing process.env ${envVar}`)
  }
  return value
}

const repositoryName = getEnvironmentVariable('PRISMIC_REPO')
const customTypesAPIToken = getEnvironmentVariable(
  'PRISMIC_CUSTOM_TYPES_API_TOKEN',
)

const config = {
  output: './types.generated.ts',
  repositoryName,
  customTypesAPIToken,
  models: {
    fetchFromRepository: true,
  },
}

export default config
