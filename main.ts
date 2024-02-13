/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from '$fresh/server.ts'
import manifest from './fresh.gen.ts'
import config from './fresh.config.ts'
import * as dotenv from 'https://deno.land/std@0.215.0/dotenv/mod.ts'

await dotenv.load()

await start(manifest, config)
