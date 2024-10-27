#!/usr/bin/env zx

import { $ } from 'zx';
import dbSeedThemes from './dbSeedThemes.json';

$.verbose = false;

for (const theme of dbSeedThemes) {
  try {
    console.log(`Adding ${theme.name} theme...`);
    const sqlCmd = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, repoUrl, repoStars, userId, theme, installCount)
      VALUES ('${theme.id}', '${theme.name}', '${theme.author}', ${new Date(theme.updatedDate).getTime()}, '${theme.versionHash}', ${theme.bundled}, '${theme.repoUrl}', ${theme.repoStars}, NULL, '${JSON.stringify(theme.theme)}', ${theme.installCount})
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          author = EXCLUDED.author,
          updatedDate = EXCLUDED.updatedDate,
          versionHash = EXCLUDED.versionHash,
          bundled = EXCLUDED.bundled,
          repoUrl = EXCLUDED.repoUrl,
          repoStars = EXCLUDED.repoStars,
          userId = EXCLUDED.userId,
          theme = EXCLUDED.theme,
          installCount = EXCLUDED.installCount;
    `;

    await $`pnpm wrangler d1 execute zed_themes --command=${sqlCmd} --local`;
  } catch (e) {
    // ignore
    console.error(e);
  }
}
