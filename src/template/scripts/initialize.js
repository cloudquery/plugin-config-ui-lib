const argv = require('minimist')(process.argv.slice(2));

require('child_process').fork('@cloudquery/cloud-config-ui/scripts/set_environment.js');
require('child_process').fork(`@cloudquery/cloud-config-ui/scripts/gen_tables.js`, ['--f', argv.f]);