const fs = require('fs');
const path = require('path');

const envFilePath = path.join(process.cwd(), 'src', '.env.json');
const exampleEnvFilePath = path.join(process.cwd(), 'src', '.env.example.json');

if (!fs.existsSync(envFilePath)) {
    fs.copyFileSync(exampleEnvFilePath, envFilePath);
    console.log('.env.json file created successfully.');
} else {
    console.log('.env.json file already exists.');
}