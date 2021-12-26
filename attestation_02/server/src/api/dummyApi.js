const dummyApi = require("../constants/api/dummyApi");

const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

class DummyApi {

  doGetRequest = (
      path,
      searchParams
  ) => {
    const url = new URL(path, dummyApi.BASE_URL);
    searchParams && Object.entries(searchParams)
        .forEach((params) => {
          url.searchParams.append(params[0], params[1].toString());
        });
    return fetch(url.toString(), {
      method: dummyApi.METHOD_GET,
      headers: {
        [dummyApi.APP_ID_FIELD]: dummyApi.APP_ID_VALUE,
        "Content-Type": "application/json",
      },
    })
        .then((resp) => resp.json())
        .catch((error) => (error));
  };

  doPostRequest = (path, formParams, method = dummyApi.METHOD_POST) => {
    const url = new URL(path, dummyApi.BASE_URL);
    return fetch(url.toString(), {
      method,
      headers: {
        [dummyApi.APP_ID_FIELD]: dummyApi.APP_ID_VALUE,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formParams),
    })
        .then((resp) => resp.json())
        .catch((error) => (error));
  };

  doPutRequest = (path, formParams, method = dummyApi.METHOD_PUT) => {
    const url = new URL(path, dummyApi.BASE_URL);
    return fetch(url.toString(), {
      method,
      headers: {
        [dummyApi.APP_ID_FIELD]: dummyApi.APP_ID_VALUE,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formParams),
    })
        .then((resp) => resp.json())
        .catch((error) => (error));
  };

  getUserList = (
      page,
      limit
  ) => this.doGetRequest(
      dummyApi.USER_URL,
      {
        [dummyApi.PAGE_FIELD]: page,
        [dummyApi.LIMIT_FIELD]: limit,
      },
  );

  getUser = (
      id
  ) => this.doGetRequest(
      `${dummyApi.USER_URL}/${id}`,
  );

  getPostList = (
      page,
      limit,
      userId = '',
  ) => this.doGetRequest(
      userId ? (`${dummyApi.USER_URL}/${userId}/${dummyApi.POST_URL}`) : dummyApi.POST_URL,
      {
        [dummyApi.PAGE_FIELD]: page,
        [dummyApi.LIMIT_FIELD]: limit,
      },
  );

  getPost = (
      id,
  ) => this.doGetRequest(
      `${dummyApi.POST_URL}/${id}`,
  );

  getCommentList = (
      postID,
      page,
      limit,
  ) => this.doGetRequest(
      dummyApi.COMMENT_URL1 + postID + dummyApi.COMMENT_URL2,
      {
        [dummyApi.PAGE_FIELD]: page,
        [dummyApi.LIMIT_FIELD]: limit,
      },
  );

  createUser = (
      user,
  ) => this.doPostRequest(`${dummyApi.USER_URL}${dummyApi.CREATE_URL}`, user);

  editUser = (
      user,
  ) => {
    delete user.email;
    return this.doPutRequest(`${dummyApi.USER_URL}/${user.id}`, user);
  };
}

module.exports = new DummyApi();
