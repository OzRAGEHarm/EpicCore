const { existsSync, readFile, writeFile } = require('fs').promises;
const fs = require('node:fs');
const { get } = require('request-promise');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

function login(string) {
    if (fs.existsSync(`./account.json`)) {
        console.log('You are already logged in!')
    } else if (!fs.existsSync(`./account.json`)) {
        let authCode = string

        axios.post("https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token", `grant_type=authorization_code&code=${authCode}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE="
                }
            }).then(async res => {
                writeFile(`./account.json`, JSON.stringify({
                    "Token": Buffer.from(res.data.access_token, 'binary').toString('utf8'),
                    "Username": res.data.displayName,
                    "AccountID": res.data.account_id
                }, null, '\t'));
                console.log(`Logged in as: ${res.data.displayName}`)
          });
        }
}

module.exports = login