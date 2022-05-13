const API_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com';

const get = async ({ endPoint }) => {
  try {
    const res = await fetch(`${API_URL}${endPoint}`);
    return res.json();
  } catch (err) {
    window.alert(`API 호출 중 문제가 발생했습니다.\n error:${err}`);
  }
};

export const fetchData = ({ id }) => {
  return get({ endPoint: `/dev/${id ?? ''}` });
};
