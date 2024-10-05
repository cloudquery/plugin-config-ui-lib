const argv = require('minimist')(process.argv.slice(2));

const setEnvironment = require('@cloudquery/plugin-config-ui-lib/scripts/set_environment.js');
const generateTables = require('@cloudquery/plugin-config-ui-lib/scripts/gen_tables.js');

setEnvironment();
generateTables(argv.f);
