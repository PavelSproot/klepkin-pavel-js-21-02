import {
  IMGBB_API_EXPIRE, IMGBB_API_KEY, IMGBB_API_METHOD,
  IMGBB_API_PARAM_EXPIRE, IMGBB_API_PARAM_IMAGE, IMGBB_API_PARAM_KEY, IMGBB_API_URL,
} from '../constants/api/imgBB';

const uploadAvatar = (file: Blob) => {
  const formData = new FormData();
  formData.set(IMGBB_API_PARAM_EXPIRE, IMGBB_API_EXPIRE.toString());
  formData.set(IMGBB_API_PARAM_KEY, IMGBB_API_KEY);
  formData.set(IMGBB_API_PARAM_IMAGE, file);

  return fetch(IMGBB_API_URL, {
    method: IMGBB_API_METHOD,
    body: formData,
  }).then((response) => response.json());
};

export default uploadAvatar;
