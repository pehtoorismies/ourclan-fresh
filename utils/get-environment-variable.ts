export const getEnvironmentVariable = (envVar: string): string => {
  const value = Deno.env.get(envVar)
  if (!value) {
    throw new Error(`Missing process.env ${envVar}`)
  }
  return value
}
