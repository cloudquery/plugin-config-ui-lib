#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Handlebars from 'handlebars';
import humanizeString from 'humanize-string';

import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pluginLogoPathNotProvided = false;

async function main() {
  const outputDir = path.join(process.cwd(), 'cloud-config-ui');

  try {
    const { pluginKind, pluginLabel, pluginLogoPath, pluginName, pluginTeam, pluginVersion } =
      await inquirer.prompt([
        {
          type: 'input',
          name: 'pluginLabel',
          message: 'What is the label of the plugin (e.g. "AWS", "GitHub", "Zendesk")?',
          required: true,
        },
        {
          type: 'input',
          name: 'pluginName',
          message: 'What is the name of the plugin (e.g. "aws", "github", "zendesk")?',
          required: true,
          validate: (input) => /^[a-z](-?[\da-z]+)+$/.test(input),
        },
        {
          type: 'select',
          name: 'pluginKind',
          message: 'What is the kind of the plugin?',
          choices: ['source', 'destination'],
          required: true,
        },
        {
          type: 'input',
          name: 'pluginTeam',
          message: 'What is the team name of the plugin (e.g. "cloudquery")?',
          required: true,
          default: 'cloudquery',
        },
        {
          type: 'input',
          name: 'pluginVersion',
          message: 'What is the latest version of the plugin (e.g. "v1.0.0")?',
          required: true,
          validate: (input) =>
            /^v\d+\.\d+\.\d+(-[\dA-Za-z-]+(\.[\dA-Za-z-]+)*)?(\+[\dA-Za-z-]+(\.[\dA-Za-z-]+)*)?$/.test(
              input,
            ),
        },
        {
          type: 'input',
          name: 'pluginLogoPath',
          message: 'Provide the path to the plugin logo (optional):',
          validate: (input) => {
            if (!input) {
              return true;
            }

            let logoSrcPath = input;
            if (!path.isAbsolute(logoSrcPath)) {
              logoSrcPath = path.resolve(process.cwd(), logoSrcPath);
            }
            if (!fs.existsSync(logoSrcPath)) {
              return 'Logo file was not found. Please provide a valid path.';
            }

            return true;
          },
          transformer: (input, { isFinal }) => {
            if (!isFinal) {
              return input;
            } else if (!input) {
              return '';
            }

            let logoSrcPath = input;
            if (!path.isAbsolute(logoSrcPath)) {
              logoSrcPath = path.resolve(process.cwd(), logoSrcPath);
            }

            return logoSrcPath;
          },
        },
      ]);

    pluginLogoPathNotProvided = !pluginLogoPath;

    let createTablesSelector = false;
    if (pluginKind === 'source') {
      ({ createTablesSelector } = await inquirer.prompt({
        type: 'confirm',
        name: 'createTablesSelector',
        message: 'Does the plugin support table selection?',
        required: true,
      }));
    }

    let createServicesSelector = false;
    let topServices = [];
    let slowTables = [];
    if (pluginKind === 'source') {
      ({ createServicesSelector } = await inquirer.prompt({
        type: 'confirm',
        name: 'createServicesSelector',
        message: 'Does the plugin support service selection?',
        required: true,
      }));

      if (createServicesSelector) {
        ({ topServices } = await inquirer.prompt({
          type: 'input',
          name: 'topServices',
          message: 'Provide the list of top services (comma separated, e.g. "service1,service2"):',
        }));

        ({ slowTables } = await inquirer.prompt({
          type: 'input',
          name: 'slowTables',
          message: 'Provide the list of slow tables (comma separated, e.g. "table1,table2"):',
        }));
      }
    }

    const { authentication } = await inquirer.prompt({
      type: 'select',
      name: 'authentication',
      message: 'What is the authentication type of the plugin?',
      choices: ['oauth', 'token', 'both'],
      required: true,
    });

    let authTokenSpecProperties = [];
    if (['token', 'both'].includes(authentication)) {
      const { specProperties } = await inquirer.prompt([
        {
          type: 'input',
          name: 'specProperties',
          message:
            'Provide the list of spec properties to be used for the authentication (comma separated, e.g. "access_key,secret_key"):',
          required: true,
        },
      ]);
      authTokenSpecProperties = specProperties.split(',').map((property) => {
        const name = property.trim();

        return {
          name,
          label: humanizeString(name),
        };
      });
    }

    // Advanced options collection
    const advancedOptions = [];
    const { includeAdvancedOptions } = await inquirer.prompt({
      type: 'confirm',
      name: 'includeAdvancedOptions',
      message: 'Would you like to include any advanced options?',
      default: false,
    });

    let addMoreOptions = includeAdvancedOptions;
    while (addMoreOptions) {
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the advanced option (e.g. max_requests_per_second):',
        required: true,
        validate: (input) => input.trim().length > 0 || 'Name is required',
      });

      const { label } = await inquirer.prompt({
        type: 'input',
        name: 'label',
        message: 'Enter the label for this option:',
        default: humanizeString(name),
      });

      const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Select the data type for this option:',
        choices: ['string', 'number', 'boolean'],
        required: true,
      });

      let numberConstraints = {};
      if (type === 'number') {
        const { isPositive } = await inquirer.prompt({
          type: 'confirm',
          name: 'isPositive',
          message: 'Should this number be positive only?',
          default: false,
        });

        const { isInteger } = await inquirer.prompt({
          type: 'confirm',
          name: 'isInteger',
          message: 'Should this number be an integer?',
          default: false,
        });

        numberConstraints = { isPositive, isInteger };
      }

      const { required } = await inquirer.prompt({
        type: 'confirm',
        name: 'required',
        message: 'Is this option required?',
        default: false,
      });

      const { value } = await inquirer.prompt({
        type: type === 'boolean' ? 'confirm' : 'input',
        name: 'value',
        message: 'Enter the default value:',
        validate: (input) => {
          if (type === 'number') {
            const num = Number(input);
            if (isNaN(num)) return 'Must be a valid number';
            if (numberConstraints.isPositive && num <= 0) return 'Must be positive';
            if (numberConstraints.isInteger && !Number.isInteger(num)) return 'Must be an integer';
          }
          return true;
        },
        transformer: (input) => {
          if (type === 'number') return Number(input);
          if (type === 'boolean') return input === 'true';
          return input;
        },
      });
      
      advancedOptions.push({
        name,
        label,
        type,
        required,
        default: type === 'number' ? Number(value) : type === 'boolean' ? value === 'true' : `'${value}'`,
        ...(type === 'number' ? numberConstraints : {}),
      });

      const { addAnother } = await inquirer.prompt({
        type: 'confirm',
        name: 'addAnother',
        message: 'Would you like to add another advanced option?',
        default: false,
      });

      addMoreOptions = addAnother;
    }

    const packageJson = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8'),
    );

    const payload = {
      pluginName,
      pluginKind,
      pluginTeam,
      pluginLabel,
      pluginVersion,
      pluginKindLabel: pluginKind === 'source' ? 'integrations' : 'destinations',
      authenticationOAuth: authentication === 'oauth' || authentication === 'both',
      authenticationToken: authentication === 'token' || authentication === 'both',
      authenticationBoth: authentication === 'both',
      authentication:
        authentication === 'both'
          ? '[AuthType.OAUTH, AuthType.OTHER]'
          : authentication === 'oauth'
          ? '[AuthType.OAUTH]'
          : '[AuthType.OTHER]',
      createTablesSelector,
      createServicesSelector,
      topServices: topServices.split(',').map((service) => `'${service.trim().replace(/'/g, "\\'")}'`).join(', '),
      slowTables: slowTables.split(',').map((table) => `'${table.trim().replace(/'/g, "\\'")}'`).join(', '),
      advancedOptions: advancedOptions.length > 0 ? advancedOptions : undefined,
      authTokenSpecProperties,
      cloudQueryPluginConfigUiLibVersion: packageJson.version,
      yup:
        authentication === 'both' ||
        authentication === 'token' ||
        advancedOptions.length > 0 ||
        advancedOptions.length > 0,
    };

    if (fs.existsSync(outputDir)) {
      throw new Error('cloud-config-ui directory already exists.');
    }

    fs.mkdirSync(outputDir);

    const templateDir = path.join(__dirname, '..', 'template');

    // Copy and compile index.html
    createAndCompileTemplate(
      path.join(templateDir, 'index.html.hbs'),
      path.join(outputDir, 'index.html'),
      payload,
    );

    // Copy template/public folder
    const publicSrcDir = path.join(templateDir, 'public');
    const publicDestDir = path.join(outputDir, 'public');
    fs.cpSync(publicSrcDir, publicDestDir, { recursive: true });

    // Copy and compile public/manifest.json
    createAndCompileTemplate(
      path.join(templateDir, 'public', 'manifest.json.hbs'),
      path.join(outputDir, 'public', 'manifest.json'),
      payload,
    );

    // Copy logo
    if (pluginLogoPath) {
      let logoSrcPath = pluginLogoPath;
      if (!path.isAbsolute(logoSrcPath)) {
        logoSrcPath = path.resolve(process.cwd(), logoSrcPath);
      }
      const logoDestPath = path.join(outputDir, 'public', 'images', 'logo.png');
      fs.mkdirSync(path.dirname(logoDestPath), { recursive: true });
      fs.copyFileSync(logoSrcPath, logoDestPath);
    }

    // Copy scripts if plugin is a source
    if (pluginKind === 'source') {
      createAndCompileTemplate(
        path.join(templateDir, 'scripts', 'initialize.js.hbs'),
        path.join(outputDir, 'scripts', 'initialize.js'),
        payload,
      );
    }

    // Copy and compile src/hooks/useConfig.tsx
    createAndCompileTemplate(
      path.join(templateDir, 'src', 'hooks', 'useConfig.tsx.hbs'),
      path.join(outputDir, 'src', 'hooks', 'useConfig.tsx'),
      payload,
    );

    // Copy src/utils
    const utilsSrcDir = path.join(templateDir, 'src', 'utils');
    const utilsDestDir = path.join(outputDir, 'src', 'utils');
    fs.cpSync(utilsSrcDir, utilsDestDir, { recursive: true });

    // Copy and compile src/tests
    createAndCompileTemplate(
      path.join(templateDir, 'src', 'tests', 'setupTests.ts.hbs'),
      path.join(outputDir, 'src', 'tests', 'setupTests.ts'),
      payload,
    );
    const testsSrcPath = path.join(templateDir, 'src', 'tests', 'create.test.tsx');
    const testsDestPath = path.join(outputDir, 'src', 'tests', 'create.test.tsx');
    fs.copyFileSync(testsSrcPath, testsDestPath);

    // Copy .env.json
    const envExampleSrcPath = path.join(templateDir, 'src', '.env.example.json');
    const envExampleDestPath = path.join(outputDir, 'src', '.env.example.json');
    const envDestPath = path.join(outputDir, 'src', '.env.json');
    fs.copyFileSync(envExampleSrcPath, envExampleDestPath);
    fs.copyFileSync(envExampleSrcPath, envDestPath);

    // Copy and compile src/App.tsx
    createAndCompileTemplate(
      path.join(templateDir, 'src', 'App.tsx.hbs'),
      path.join(outputDir, 'src', 'App.tsx'),
      payload,
    );

    // Copy src/index.tsx
    const indexSrcPath = path.join(templateDir, 'src', 'index.tsx');
    const indexDestPath = path.join(outputDir, 'src', 'index.tsx');
    fs.copyFileSync(indexSrcPath, indexDestPath);

    // Copy and compile .env
    createAndCompileTemplate(
      path.join(templateDir, '.env.example.hbs'),
      path.join(outputDir, '.env.example'),
      payload,
    );
    fs.copyFileSync(path.join(outputDir, '.env.example'), path.join(outputDir, '.env'));

    // Copy .eslintrc.cjs
    const eslintSrcPath = path.join(templateDir, '.eslintrc.cjs');
    const eslintDestPath = path.join(outputDir, '.eslintrc.cjs');
    fs.copyFileSync(eslintSrcPath, eslintDestPath);

    // Copy .gitignore
    const gitignoreSrcPath = path.join(templateDir, '_gitignore');
    const gitignoreDestPath = path.join(outputDir, '.gitignore');
    fs.copyFileSync(gitignoreSrcPath, gitignoreDestPath);

    // Copy .nvmrc
    const nvmrcSrcPath = path.join(templateDir, '.nvmrc');
    const nvmrcDestPath = path.join(outputDir, '.nvmrc');
    fs.copyFileSync(nvmrcSrcPath, nvmrcDestPath);

    // Copy .prettierrc.cjs
    const prettierrcSrcPath = path.join(templateDir, '.prettierrc.cjs');
    const prettierrcDestPath = path.join(outputDir, '.prettierrc.cjs');
    fs.copyFileSync(prettierrcSrcPath, prettierrcDestPath);

    // Copy and compile package.json
    createAndCompileTemplate(
      path.join(templateDir, 'package.json.hbs'),
      path.join(outputDir, 'package.json'),
      payload,
    );

    // Copy playwright.config.ts
    const playwrightConfigSrcPath = path.join(templateDir, 'playwright.config.ts');
    const playwrightConfigDestPath = path.join(outputDir, 'playwright.config.ts');
    fs.copyFileSync(playwrightConfigSrcPath, playwrightConfigDestPath);

    // Copy and compile README.md
    createAndCompileTemplate(
      path.join(templateDir, 'README.md.hbs'),
      path.join(outputDir, 'README.md'),
      payload,
    );

    // Copy tsconfig.json
    const tsconfigSrcPath = path.join(templateDir, 'tsconfig.json.hbs');
    const tsconfigDestPath = path.join(outputDir, 'tsconfig.json');
    fs.copyFileSync(tsconfigSrcPath, tsconfigDestPath);

    // Copy vite.config.js
    const viteConfigSrcPath = path.join(templateDir, 'vite.config.js');
    const viteConfigDestPath = path.join(outputDir, 'vite.config.js');
    fs.copyFileSync(viteConfigSrcPath, viteConfigDestPath);
  } catch (error) {
    if (fs.existsSync(outputDir)) {
      fs.rmdirSync(outputDir, { recursive: true });
    }

    if (error.name === 'ExitPromptError') {
      return;
    }

    throw error;
  }
}

function createAndCompileTemplate(templatePath, outputPath, data) {
  const template = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = Handlebars.compile(template);
  const outputDir = path.dirname(outputPath);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, compiledTemplate(data));
}

await main();

// eslint-disable-next-line no-console
console.log('Generating cloud config UI completed. Installing dependencies...');

try {
  const cloudConfigUiDir = path.join(process.cwd(), 'cloud-config-ui');
  process.chdir(cloudConfigUiDir);
  execSync('npm install', { stdio: 'inherit' });
  // eslint-disable-next-line no-console
  console.log('\n\nDependencies installed successfully.');

  if (pluginLogoPathNotProvided) {
    // eslint-disable-next-line no-console
    console.warn(
      'No logo path provided. Please remember to add a logo to your plugin to the public/images/logo.png file.',
    );
  }

  process.chdir('..');
  // eslint-disable-next-line no-console
  console.log('You can now navigate into the cloud-config-ui directory and start developing.');
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}
