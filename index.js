const Auth = require('./src/auth/Auth.js');
const MCP = require('./src/MCP.js');
const Cosmetics = require('./src/Cosmetics.js');
const Playlists = require('./src/Playlist.js');
const Account = require('./src/Account.js');

class Api {
    constructor() {
        this.auth = new Auth();
        this.cosmetics = new Cosmetics();
        this.mcp = new MCP();
        this.playlist = new Playlists();
        this.account = new Account();
    }
    
    async login(auth, client) {
        return await this.auth.authenticate(auth, client);
    }

    async createDeviceAuth(credentials) {
        return await this.auth.createDeviceAuth(credentials);
    }

    async generateExchangeCode(credentials) {
        return await this.auth.generateExchangeCode(credentials);
    }
    
    async operation(accountId, profileId, operation, token, payload) {
        return await this.mcp.operation(accountId, profileId, operation, token, payload);
    }

    async getCosmetic (name, type, id) {
        return await this.cosmetics.getCosmetic(name, type, id);
    }

    async getPath (path) {
        return await this.cosmetics.getPath(path);
    }

    async getPlaylist (playlistId) {
        return await this.playlist.getPlaylist(playlistId);
    }

    async getAllPlaylists () {    
        return await this.playlist.getAllPlaylists();
    }

    async getStatsByName(name, apiKey) {
        return await this.account.getStatsByName(name, apiKey);
    }

    async getStatsById(id, apiKey) {
        return await this.account.getStatsById(id, apiKey);
    }
}

module.exports = new Api();
