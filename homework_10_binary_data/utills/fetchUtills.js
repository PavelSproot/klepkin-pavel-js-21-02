export function doFetch(url, callback, errorCallback, inits = {}) {
    fetch(url, inits)
        .then(response => response.json())
        .then(response => {
            callback(response);
        })
        .catch(errorCallback)
}