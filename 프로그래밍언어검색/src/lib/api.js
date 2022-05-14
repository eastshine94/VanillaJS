const API_URL =
  'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

const cache = {};

const get = async ({ endpoint }) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`).then(res => res.json());
    return res;
  } catch (err) {
    window.alert('호출 중 에러가 발생했습니다.');
  }
};

export const fetchLanguage = ({ keyword }) => {
  if (!keyword) {
    return [];
  }
  const endpoint = `/languages?keyword=${keyword}`;
  if (cache[endpoint]) {
    return cache[endpoint];
  }

  const res = get({ endpoint }).then(data => {
    cache[endpoint] = data;
    return data;
  });

  return res;
};
