#!/usr/bin/env node
import { exec } from 'child_process';
import path from 'path';

const command = process.argv[2];
const appDirectory = process.cwd(); //當前工作資料夾


if (command === 'start') {
    const electronPath = path.join(appDirectory, 'node_modules', '.bin', 'electron');
    const mainPath = path.join(appDirectory, 'main.js');

    exec(`${electronPath} ${mainPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
} else {
    console.log('Unknown command. Use "start" to run the application.');
}