import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

export const getSearchParams = (...names) => {
  const url = new URL(window.location.href);

  return names.reduce((acc, n) => {
    const param = url.searchParams.get(n);
    if (param) {
      return { ...acc, [n]: param };
    }
    return acc;
  }, {});
};

const getQueryParamPrefix = url => url.indexOf('?') >= 0
  ? '&'
  : '?';

const transformValue = value => Array.isArray(value)
  ? value.join(',')
  : value;

export const applyQueryParam = (name, value) => url => value !== null && typeof value !== 'undefined'
  ? `${url}${getQueryParamPrefix(url)}${name}=${transformValue(value)}`
  : url;


export const applyQueryParams = ({ params, url }) => params
  .reduce((acc, { name, value }) => applyQueryParam(name, value)(acc), url);


export const setUrlQuery = searchParams => {
  const searchParamsForUrl = Object.keys(searchParams)
    .map(k => ({ name: k, value: searchParams[k] }));
  
  const urlQuery = applyQueryParams({ params: searchParamsForUrl, url: '' });

  history.push({ search: urlQuery });
}