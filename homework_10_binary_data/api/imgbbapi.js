import {doFetch} from "../utills/fetchUtills.js";
import {IMGBB_API_URL} from "../constants/imgbbapi.js";
import {IMGBB_API_KEY} from "../constants/imgbbapi.js";

export const imgbbApi = {
    imgbbApiUrl: IMGBB_API_URL,
    imgbbApiKey: IMGBB_API_KEY,
    uploadFileToImgbb(file, callback, errorCallback) {
        const formData = new FormData();
        formData.set('key', this.imgbbApiKey);
        formData.set('image', file.replace(/^.*,/, ''));
        doFetch(this.imgbbApiUrl, callback, errorCallback, {method: 'POST', body: formData});
    }
}