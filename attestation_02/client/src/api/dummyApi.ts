import {
  APP_ID_FIELD,
  APP_ID_VALUE,
  BASE_URL,
  USER_URL,
  LIMIT_FIELD,
  PAGE_FIELD,
  METHOD_GET,
  POST_URL,
  COMMENT_URL1,
  COMMENT_URL2,
  METHOD_POST,
  CREATE_URL, METHOD_PUT,
} from '../constants/api/dummyApi';
import { UserResponseType } from '../types/api/dumMyApiResponses';

const doGetRequest = (
  path: string,
  searchParams?: Record<string, number>,
) => {
  const url = new URL(path, BASE_URL);
  searchParams && Object.entries(searchParams).forEach((params) => {
    url.searchParams.append(params[0], params[1].toString());
  });
  return fetch(url.toString(), {
    method: METHOD_GET,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
    }),
  }).then((resp) => resp.json())
    .catch((error) => (error));
};

export const doPostRequest = (path: string, formParams?: Record<string, any>, method = METHOD_POST) => {
  const url = new URL(path, BASE_URL);
  return fetch(url.toString(), {
    method,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formParams),
  }).then((resp: Response) => resp.json())
    .catch((error) => (error));
};

export const doPutRequest = (path: string, formParams?: Record<string, any>, method = METHOD_PUT) => {
  const url = new URL(path, BASE_URL);
  return fetch(url.toString(), {
    method,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formParams),
  }).then((resp: Response) => resp.json())
    .catch((error) => (error));
};

const getUserList = (
  page: number,
  limit: number,
) => doGetRequest(
  USER_URL,
  {
    [PAGE_FIELD]: page,
    [LIMIT_FIELD]: limit,
  },
);

export const getUser = (
  id: string,
) => doGetRequest(
  `${USER_URL}/${id}`,
);

export const getPostList = (
  page: number,
  limit: number,
  userId: string = '',
) => doGetRequest(
  userId ? (`${USER_URL}/${userId}/${POST_URL}`) : POST_URL,
  {
    [PAGE_FIELD]: page,
    [LIMIT_FIELD]: limit,
  },
);

export const getPost = (
  id: string,
) => doGetRequest(
  `${POST_URL}/${id}`,
);

export const getCommentList = (
  postID: string,
  page: number,
  limit: number,
) => doGetRequest(
  COMMENT_URL1 + postID + COMMENT_URL2,
  {
    [PAGE_FIELD]: page,
    [LIMIT_FIELD]: limit,
  },
);

export const createUser = (
  user: UserResponseType,
) => doPostRequest(`${USER_URL}/${CREATE_URL}`, user);

export const editUser = (
  user: UserResponseType,
) => {
  delete user.email;
  return doPutRequest(`${USER_URL}/${user.id}`, user);
};

export default getUserList;
