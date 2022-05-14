export const getStorage = key => {
  return JSON.parse(window.localStorage.getItem(key)) ?? {};
};

export const setStorage = (key, value) => {
  const prev = getStorage(key);
  const save = prev ? { ...prev, ...value } : value;
  window.localStorage.setItem(key, JSON.stringify(save));
};
export const removeStorage = key => {
  window.localStorage.removeItem(key);
};
