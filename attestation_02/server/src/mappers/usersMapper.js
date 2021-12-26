const objectUtils = require("../utils/objectUtils");
const reducers = require("../constants/reducers");
const moment = require("moment");

class UsersMapper {
    baseInfo(response) {
        return {
            status: response.error ? "error" : "ok",
            ...objectUtils.reduceKeys(
                objectUtils.dateTimeSplitter(response, reducers.userDates),
                reducers.user
            ),
        };
    }
    makeUserList(response) {
        return {
            status: response.error ? "error" : "ok",
            ...objectUtils.reduceKeys(response, reducers.page),
            data: objectUtils.arrayReduceKeys(response.data, reducers.userPreview),
        };
    }
    checkRequired(user) {
        return objectUtils.keysInObject(user, reducers.userRequired);
    }

    prepareForDummy(user) {
        return  {
            ...user,
            dateOfBirth: moment(user.dateOfBirth.date).toISOString()
        };
    }

    prepareForDummyEdit(user) {
        const res = {
            ...user,
            dateOfBirth: moment(user.dateOfBirth.date).toISOString()
        };
        delete res.email;
        delete res.registerDate;
        return res;
    }
}

module.exports = new UsersMapper();
