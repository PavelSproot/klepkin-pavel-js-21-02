const objUtils = require("../utils/objectUtils");
const reducers = require("../constants/reducers");

class ImageMapper {
    makeUrl(response) {
        return {
            status: response.error ? "error" : "ok",
            ...objUtils.reduceKeys(response, reducers.imgUrl),
        };
    }
}

module.exports = new ImageMapper();
