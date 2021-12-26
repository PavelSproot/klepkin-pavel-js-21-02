const FormData = require("form-data");
const imgBBApi = require('../constants/api/imgBB');

const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

class AvatarImg {
  uploadAvatar (file) {
    const formData = new FormData();
    formData.append(imgBBApi.IMGBB_API_PARAM_EXPIRE, imgBBApi.IMGBB_API_EXPIRE.toString());
    formData.append(imgBBApi.IMGBB_API_PARAM_KEY, imgBBApi.IMGBB_API_KEY);
    formData.append(imgBBApi.IMGBB_API_PARAM_IMAGE, file.buffer, {
      filename: file.originalname,
      size: file.size,
    })

    return fetch(imgBBApi.IMGBB_API_URL, {
      method: imgBBApi.IMGBB_API_METHOD,
      body: formData,
    })
        .then((response) => response.json());
  };
}

module.exports = new AvatarImg();
