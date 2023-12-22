const axios = require('axios');
const querystring = require('querystring');
const clientTokens = require('../ClientTokens.js');

class Auth {
  async authenticate(auth, client) {
    let payload;
  
    switch (auth.method) {
      case 'code':
        payload = `grant_type=authorization_code&code=${auth.value}&token_type=eg1`;
        break;
      case 'exchange':
        payload = `grant_type=exchange_code&exchange_code=${auth.value}&token_type=eg1`;
        break;
      case 'device':
        payload = `grant_type=device_auth&device_id=${auth.value.deviceId}&account_id=${auth.value.accountId}&secret=${auth.value.secret}&token_type=eg1`;
        break;
      case 'refresh':
        payload = `grant_type=refresh_token&refresh_token=${auth.value}&token_type=eg1`;
        break;
    }
  
    const url = 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token';
    const token = client ? clientTokens[client] : 'MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE=';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${token}`,
    };
  
    try {
      const response = await axios.post(url, payload, { headers });
      const data = response.data;
  
      if (data.errorMessage) throw new Error(JSON.stringify(data));
  
      // Modify the access_token in data to be a UTF-8 string
      //data.access_token = Buffer.from(data.access_token, 'binary').toString('utf8');
  
      return data;
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
      throw new Error(error.message);
    }
  }  

  async createDeviceAuth(credentials) {
    const url = `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/${credentials.account_id}/deviceAuth`;
    const payload = querystring.stringify({}); // Empty payload
    const headers = {
      'Authorization': `Bearer ${credentials.access_token}`,
      'Content-Type': 'application/json', // Add Content-Type header
    };

    try {
      const response = await axios.post(url, payload, { headers });
      const data = response.data;

      if (data.errorMessage) throw new Error(JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
      throw new Error(error.message);
    }
  }

  async generateExchangeCode(credentials) {
    const url = 'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/exchange';
    const headers = {
      'Authorization': `Bearer ${credentials.access_token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      const data = response.data;

      if (data.errorMessage) throw new Error(JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
      throw new Error(error.message);
    }
  }
}

module.exports = Auth;
