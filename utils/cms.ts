import { createClient } from '@prismicio/client'
import { getEnvironmentVariable } from '/utils/get-environment-variable.ts'

export const getClient = () => {
  return createClient(getEnvironmentVariable('PRISMIC_REPO'), {
    fetch,
  })
}
