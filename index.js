const Auth = require('./src/auth/Auth.js');
const MCP = require('./src/MCP.js');
const Cosmetics = require('./src/Cosmetics.js');
const Playlist = require('./src/Playlists.js');
const Account = require('./src/account/Account.js');
const clientTokens = require('./src/ClientTokens.js');

class Api {
    constructor() {
        /**
         * The authentication module for handling user login and tokens.
         * @type {Auth}
         */
        this.auth = new Auth();
        
        /**
         * The cosmetics module for fetching cosmetic data.
         * @type {Cosmetics}
         */
        this.cosmetics = new Cosmetics();
        
        /**
         * The MCP (Matchmaking and Content Publishing) module for in-game operations.
         * @type {MCP}
         */
        this.mcp = new MCP();
        
        /**
         * The playlists module for fetching playlist information.
         * @type {Playlist}
         */
        this.playlist = new Playlist();
        
        /**
         * The account module for fetching user stats.
         * @type {Account}
         */
        this.account = new Account();
        
        /**
         * A collection of client tokens for different platforms.
         * @type {object}
         */
        this.clientTokens = clientTokens;
    }
    
    /**
     * Authenticates an account with Epic Games.
     * @param {object} auth - The authentication object.
     * @param {string} client - The client token to use for authentication.
     * @returns {Promise<object>} The authentication response object.
     */
    async login(auth, client) {
        return await this.auth.authenticate(auth, client);
    }

    /**
     * Creates a new device authorization for an account.
     * @param {object} credentials - The account credentials.
     * @returns {Promise<object>} The device authorization object.
     * ### Example Device Auth:
     * * `account_id`: Your Account Id
     * * `device_id`: The Device Id from the Device Auth
     * * `secret`: The Device Auth Secret (Only revealed on Device Auth Creation)
     */
    async createDeviceAuth(credentials) {
        return await this.auth.createDeviceAuth(credentials);
    }

    /**
     * Generates an exchange code for authentication.
     * @param {object} credentials - The account credentials.
     * @returns {Promise<string>} The generated exchange code.
     */
    async generateExchangeCode(credentials) {
        return await this.auth.generateExchangeCode(credentials);
    }
    
    /**
     * Performs an MCP operation.
     * @param {string} accountId - The account ID.
     * @param {string} profileId - The profile ID.
     * @param {string} operation - The operation to perform.
     * @param {string} token - The access token.
     * @param {object} payload - The payload for the operation.
     * @returns {Promise<object>} The MCP operation response.
     */
    async operation(accountId, profileId, operation, token, payload) {
        return await this.mcp.operation(accountId, profileId, operation, token, payload);
    }

    /**
     * Fetches a specific cosmetic item.
     * @param {string} name - The name of the cosmetic item.
     * @param {string} type - The type of the cosmetic item (e.g., "outfit").
     * @param {string} id - The ID of the cosmetic item (optional if using name and type).
     * @returns {Promise<object>} The cosmetic item data.
     */
    async getCosmetic (name, type, id) {
        return await this.cosmetics.getCosmetic(name, type, id);
    }

    /**
     * Fetches a cosmetic item by its path.
     * @param {string} path - The path to the cosmetic item.
     * @returns {Promise<object>} The cosmetic item data.
     */
    async getPath (path) {
        return await this.cosmetics.getPath(path);
    }

    /**
     * Fetches a specific playlist.
     * @param {string} playlistId - The ID of the playlist.
     * @returns {Promise<object>} The playlist data.
     */
    async getPlaylist (playlistId) {
        return await this.playlist.getPlaylist(playlistId);
    }

    /**
     * Fetches all available playlists.
     * @returns {Promise<object>} The playlist data.
     */
    async getAllPlaylists () {
        return await this.playlist.getAllPlaylists();
    }

    /**
     * Fetches user stats by display name.
     * @param {string} name - The user's display name.
     * @param {string} apiKey - The API key for the stats service. Get one here: https://dash.fortnite-api.com/account
     * @returns {Promise<object>} The user's stats data.
     */
    async getStatsByName(name, apiKey) {
        return await this.account.getStatsByName(name, apiKey);
    }

    /**
     * Fetches user stats by account ID.
     * @param {string} id - The user's account ID.
     * @param {string} apiKey - The API key for the stats service. Get one here: https://dash.fortnite-api.com/account
     * @returns {Promise<object>} The user's stats data.
     */
    async getStatsById(id, apiKey) {
        return await this.account.getStatsById(id, apiKey);
    }
}

module.exports = new Api();
