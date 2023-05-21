// this is a login example using EpicCore with a console prompt for an Epic Games authentication code
const { login } = require('@ozrageharm/epiccore');
const prompt = require("prompt-sync")();

let auth = prompt('Enter auth code: ')

login(auth)