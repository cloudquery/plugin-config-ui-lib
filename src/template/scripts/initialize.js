const argv = require('minimist')(process.argv.slice(2));

require('child_process').fork('@cloudquery/plugin-config-ui-lib/scripts/set_environment.js');
require('child_process').fork(`@cloudquery/plugin-config-ui-lib/scripts/gen_tables.js`, ['--f', argv.f]);