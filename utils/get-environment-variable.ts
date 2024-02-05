import * as mod from 'https://deno.land/std@0.215.0/dotenv/mod.ts'

await mod.load()

export const getEnvironmentVariable = (envVar: string): string => {
  const value = Deno.env.get(envVar)
  if (!value) {
    throw new Error(`Missing process.env ${envVar}`)
  }
  return value
}
