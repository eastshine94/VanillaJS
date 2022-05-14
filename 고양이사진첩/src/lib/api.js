const API_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const cache = {};

const get = async ({ endpoint }) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`).then(data => data.json());
    return res;
  } catch (err) {
    window.alert('API 호출 중에 에러가 발생했습니다.');
  }
};

export const fetchData = id => {
  const endpoint = !!id ? `/${id}` : '/';
  if (!!cache[endpoint]) {
    return cache[endpoint];
  }
  const res = get({ endpoint: !!id ? `/${id}` : '/' }).then(data => {
    cache[endpoint] = data;
    return data;
  });
  return res;
};
