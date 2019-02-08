export const isArrayEqual = (source, compare) => {
  const sourceLength = source.length;
  const compareLength = compare.length;

  if (sourceLength !== compareLength) {
    return false;
  }

  return source.reduce((result, item, key) => compare[key] === item && result, true);
};

