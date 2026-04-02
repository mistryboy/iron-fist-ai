import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const SIGNUPS_FILE = join(DATA_DIR, 'signups.json');

/**
 * Ensure the data directory exists.
 */
async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // already exists
  }
}

/**
 * Read all signups from the JSON store.
 * @returns {Promise<Array>}
 */
export async function readSignups() {
  await ensureDataDir();
  try {
    const raw = await readFile(SIGNUPS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Write signups array to the JSON store.
 * @param {Array} signups
 */
export async function writeSignups(signups) {
  await ensureDataDir();
  await writeFile(SIGNUPS_FILE, JSON.stringify(signups, null, 2), 'utf-8');
}
