const axios = require("axios");

class Cosmetics {
  async getCosmetic(name, type, id) {
    try {
      let url = `https://fortnite-api.com/v2/cosmetics/br/${
        id ? id : `search?name=${name}&type=${type}`
      }`;

      const response = await axios.get(url);

      if (response.data.data) {
        const assignedType = type || response.data.data.type.value;
        return { ...response.data.data, type: assignedType };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  async getPath(path) {  
    if (typeof path !== 'string') {
      console.error('Path must be a string, received:', path);
      return '';
    }
    
    return path
      .replace(/^FortniteGame\/Content/, '/Game')
      .replace(/FortniteGame\/Plugins\/GameFeatures\/BRCosmetics\/Content/, '/BRCosmetics')
      .replace(/FortniteGame\/Plugins\/GameFeatures\/CosmeticShoes\/Content/, '/CosmeticShoes')
      .split('/')
      .slice(0, -1)
      .join('/');
  }
}

module.exports = Cosmetics;
