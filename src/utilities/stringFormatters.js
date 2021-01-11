export const capitalize = (str) => {
  let result;
  if (typeof str !== 'string') {
    result = str;
  } else {
    result = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return result;
};
