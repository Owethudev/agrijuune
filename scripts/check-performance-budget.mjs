import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const distDirectory = fileURLToPath(
  new URL('../frontend/dist/', import.meta.url),
);

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return findFiles(path);
      }

      return [path];
    }),
  );

  return nestedFiles.flat();
}

function sumBytes(buffers) {
  return buffers.reduce((total, buffer) => total + buffer.length, 0);
}

async function measure(files, compressed) {
  const assets = await Promise.all(files.map((file) => readFile(file)));
  const measuredAssets = compressed ? assets.map(gzipSync) : assets;

  return sumBytes(measuredAssets);
}

const allFiles = await findFiles(distDirectory);
const budgets = [
  {
    name: 'JavaScript (gzip)',
    files: allFiles.filter((file) => file.endsWith('.js')),
    maxBytes: 100 * 1024,
    compressed: true,
  },
  {
    name: 'CSS (gzip)',
    files: allFiles.filter((file) => file.endsWith('.css')),
    maxBytes: 20 * 1024,
    compressed: true,
  },
  {
    name: 'Route HTML (gzip total)',
    files: allFiles.filter((file) => file.endsWith('.html')),
    maxBytes: 20 * 1024,
    compressed: true,
  },
  {
    name: 'Images (uncompressed total)',
    files: allFiles.filter((file) =>
      /\.(avif|gif|ico|jpe?g|png|svg|webp)$/i.test(file),
    ),
    maxBytes: 100 * 1024,
    compressed: false,
    optional: true,
  },
];

let overBudget = false;

for (const budget of budgets) {
  if (budget.files.length === 0 && !budget.optional) {
    throw new Error(`No files found for the ${budget.name} budget.`);
  }

  const bytes = await measure(budget.files, budget.compressed);
  const sizeInKiB = (bytes / 1024).toFixed(2);
  const budgetInKiB = (budget.maxBytes / 1024).toFixed(2);

  console.log(`${budget.name}: ${sizeInKiB} / ${budgetInKiB} KiB`);

  if (bytes > budget.maxBytes) {
    console.error(`${budget.name} exceeds its performance budget.`);
    overBudget = true;
  }
}

if (overBudget) {
  process.exitCode = 1;
}
