import { readFileSync } from 'fs';

/**
 * File output (i.e. inlining content)
 */
export default path => {
  let contents = '';

  try {
    contents = readFileSync(path, 'utf8');
  }

  catch (err) {}

  return contents.trim();
};
