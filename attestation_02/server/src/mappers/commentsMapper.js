const objUtils = require("../utils/objectUtils");
const reducers = require("../constants/reducers");

class CommentsMapper {
    listBaseInfo(response) {
        return {
            ...objUtils.reduceKeys(response, reducers.page),
            data: objUtils.arrayReduceKeys(
                objUtils.arrayDateTimeSplitter(response.data, reducers.commentDates),
                reducers.comment
            ),
            status: response.error ? "error" : "ok",
        };
    }
}

module.exports = new CommentsMapper();
