import { catalog } from '../../config';

export const hideCatalogLoader = () => {
  const loader = document.querySelector(catalog.domSelectors.loader);
  if (loader) {
    loader.style = 'display: none';
  }
};