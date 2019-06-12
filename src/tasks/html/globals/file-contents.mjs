import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * File output (i.e. inlining content)
 */
export default path => {
  let contents = '';

  try {
    contents = readFileSync(resolve(process.cwd(), path), 'utf8');
  }

  catch (err) {}

  return contents.trim();
};
