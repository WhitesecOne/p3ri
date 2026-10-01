import { spawnSync } from 'node:child_process'
import { config } from 'dotenv'
import { isCmsEnabled } from '../src/lib/cms'

// Match Next.js production environment file precedence; platform variables win.
config({ path: ['.env.production.local', '.env.local', '.env.production', '.env'] })

function run(args: string[]) {
  const result = spawnSync('pnpm', args, {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

if (isCmsEnabled()) run(['payload', 'migrate'])
else console.log('Building public website without CMS; database migrations skipped.')
run(['build'])
