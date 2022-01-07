const objectUtils = require("../utils/objectUtils");
const reducers = require("../constants/reducers");

class PostsMapper {
    baseInfo(response) {
        return {
            status: response.error ? "error" : "ok",
            ...objectUtils.reduceKeys(
                objectUtils.dateTimeSplitter(response, reducers.postDates),
                reducers.post
            ),
        };
    }
    listBaseInfo(response) {
        return {
            status: response.error ? "error" : "ok",
            ...objectUtils.reduceKeys(response, reducers.page),
            data: objectUtils.arrayReduceKeys(
                objectUtils.arrayDateTimeSplitter(response.data, reducers.postDates),
                reducers.post
            ),
        };
    }
}

module.exports = new PostsMapper();
