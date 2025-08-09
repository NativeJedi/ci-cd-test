import { execSync } from 'child_process';
import * as process from 'node:process';

const DATA_SOURCE = './src/type-orm/data-source.ts';

function runCommand(command: string) {
  console.log(`[exec]: ${command}`);
  return execSync(command, { stdio: 'inherit' });
}

// HACK: don't have a better way to check log output
const SUCCESS_LOG_MESSAGE =
  'Your schema is up to date - there are no queries to be executed by schema synchronization.';

function run() {
  try {
    runCommand('npm run db');

    const stdout = execSync(
      `npx ts-node ./node_modules/typeorm/cli.js schema:log -d ${DATA_SOURCE}`,
      { encoding: 'utf-8' },
    );

    if (stdout.includes(SUCCESS_LOG_MESSAGE)) {
      console.log('[schema-check]: Schema is up to date.');
      process.exit(0);
    } else {
      console.error('[schema-check]: Schema has differences:');
      console.error(stdout);
      process.exit(1);
    }
  } catch (error) {
    console.error('[schema-check]: Error running schema:log:', error);
    process.exit(1);
  }
}

run();
