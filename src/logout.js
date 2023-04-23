const { existsSync, readFile, writeFile } = require('fs').promises;
const fs = require('node:fs');
const { get } = require('request-promise');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

function logout() {
    if (!fs.existsSync(`./account.json`)) {
        console.log('You are not logged in!')
    }
    if (fs.existsSync(`./account.json`)) {
        fs.rmSync(
            `./account.json`
        );
        console.log('Logged Out!')
    }
}

module.exports = logout