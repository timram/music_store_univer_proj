export const getSearchParams = (...names) => {
  const url = new URL(window.location.href);

  return names.reduce((acc, n) => ({
    ...acc,
    [n]: url.searchParams.get(n)
  }), {});
};

const getQueryParamPrefix = url => url.indexOf('?') >= 0
  ? '&'
  : '?';

export const applyQueryParam = (name, value) => url => value !== null && typeof value !== 'undefined'
  ? `${url}${getQueryParamPrefix(url)}${name}=${value}`
  : url;


export const applyQueryParams = ({ params, url }) => params
  .reduce((acc, { name, value }) => applyQueryParam(name, value)(acc), url);