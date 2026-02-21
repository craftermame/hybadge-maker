import { execFile } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const binaryPath = path.join(__dirname, '..', 'dist', 'main');

const question = "Made in node.js!"
const csvPath = path.join(__dirname, '..', 'assets', 'test.csv');
const outputPath = path.join(__dirname, '..', 'output', 'badge.pdf');
const participantsEmails = [ 'e', 'm' ];

const args = [
  question,
  csvPath,
  outputPath,
  participantsEmails,
]

execFile(binaryPath, args, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stderr) {
    console.error(stderr);
    return;
  }

  console.log(stdout);
});
