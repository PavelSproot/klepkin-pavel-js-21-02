const moment = require("moment");

class objectUtils {
    reduceKeys(inputObject, allowed = []) {
        return Object.keys(inputObject)
            .filter((key) => allowed.includes(key))
            .reduce((outputObject, key) => {
                outputObject[key] = inputObject[key];
                return outputObject;
            }, {});
    }
    arrayReduceKeys(arr, allowed) {
        return arr.map((value) => this.reduceKeys(value, allowed));
    }
    dateTimeSplitter(inputObject, keys = []) {
        return Object.keys(inputObject).reduce((outputObject, key) => {
            outputObject[key] = keys.includes(key)
                ? {
                    date: moment(inputObject[key]).format("YYYY-MM-DD"),
                    time: moment(inputObject[key]).format("HH:MM"),
                }
                : inputObject[key];
            return outputObject;
        }, {});
    }
    arrayDateTimeSplitter(arr, keys = []) {
        return arr.map((value) => this.dateTimeSplitter(value, keys));
    }
    keysInObject(obj, keys) {
        return keys.filter((key) => !obj.hasOwnProperty(key));
    }
}

module.exports = new objectUtils();
