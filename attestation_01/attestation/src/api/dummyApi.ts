import {
  APP_ID_FIELD, APP_ID_VALUE, BASE_URL, USER_URL, LIMIT_FIELD, PAGE_FIELD, METHOD_GET,
} from '../constants/api/dummyApi';

const doGetRequest = (
  path: string,
  searchParams?: Record<string, any>,
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
    .then((resp) => resp.data);
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

export default getUserList;
