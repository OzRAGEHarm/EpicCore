const { get } = require("request-promise");

class Cosmetics {
  async getCosmetic(name, type, id) {
    try {
      let url = `https://fortnite-api.com/v2/cosmetics/br/${
        id ? id : `search?name=${name}&type=${type}`
      }`;

      const cosmetic = await get({
        url,
        json: true,
      });

      if (cosmetic.data) {
        const assignedType = type || cosmetic.data.type.value;
        return { ...cosmetic.data, type: assignedType };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  async getPath(path) {
    path
      .replace(/^FortniteGame\/Content/, "/Game")
      .replace(
        /FortniteGame\/Plugins\/GameFeatures\/BRCosmetics\/Content/,
        "/BRCosmetics"
      )
      .split("/")
      .slice(0, -1)
      .join("/");

    return path;
  }
}

module.exports = Cosmetics;