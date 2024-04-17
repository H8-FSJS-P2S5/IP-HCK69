const axios = require("axios");

const options = {
  method: "GET",
  url: "https://api.jikan.moe/v4/top/manga",
  params: { type: "manhwa" },
};

(async () => {
  try {
    const { data } = await axios.request(options);
    const { pagination, data: list } = data;
    console.log(list[12]);
    // console.log(response.data.data.length);
  } catch (error) {
    console.error(error);
  }
})();
