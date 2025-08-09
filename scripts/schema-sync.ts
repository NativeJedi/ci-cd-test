import 'dotenv/config';
import { exec } from 'child_process';

const DATA_SOURCE_PATH = './src/type-orm/data-source.ts';

exec(
  `npx ts-node ./node_modules/typeorm/cli.js schema:sync -d ${DATA_SOURCE_PATH}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error('[schema:sync] Error:', error);
      process.exit(1);
    }

    if (stderr) {
      console.error('[schema:sync] Input error:', stderr);
      process.exit(1);
    }

    console.log(stdout);
  },
);
