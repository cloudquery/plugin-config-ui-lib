const fs = require('node:fs');

const argv = require('minimist')(process.argv.slice(2));
const commandExistsSync = require('command-exists').sync;

const generateTables = () => {
  if (commandExistsSync('cloudquery')) {
    require('node:child_process').execSync(
      `cd ..
dirname="$(basename $(pwd))"
cloudquery tables --output-dir data test/config.yml
mkdir -p cloud-config-ui/src/data
mv data/$dirname/__tables.json cloud-config-ui/src/data/__tables.json`,
      (error) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      },
    );
  } else {
    console.error(
      'Warning: cloudquery is not available. Please install it before running this script.',
    );
  }
};

// In production, or when forced, re-generate tables every time
if (process.env.NODE_ENV === 'production' || argv.f) {
  return generateTables();
  // In development, only generate tables if they don't exist
} else if (
  (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
  !fs.existsSync('src/data/__tables.json')
) {
  return generateTables();
}
