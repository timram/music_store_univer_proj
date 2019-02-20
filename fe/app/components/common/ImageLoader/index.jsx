import ImageLoader from './ImageLoader';
import { withStateHandlers, withHandlers, compose } from 'recompose';

const imageToBase64 = imageSrc => new Promise((resolve) => {
  const image = new Image();
 
  image.onload = () => {
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width; 
    canvas.height = height;

    ctx.drawImage(image, 0, 0);

    return resolve(canvas.toDataURL('image/jpeg'));
  };

  image.src = imageSrc;
})

const enhancer = compose(
  withStateHandlers(
    ({ imageUrl }) => ({
      src: imageUrl,
      loaded: true
    }),
    {
      setSrc: () => src => ({
        loaded: true,
        src
      }),
      setLoaded: state => loaded => ({ ...state, loaded })
    }
  ),
  withHandlers({
    onChange: ({ onChange, setSrc, setLoaded }) => async e => {
      const image = e.target.files[0];
      if (!image) {
        return;
      }

      setLoaded(false);
      const src = window.URL.createObjectURL(image);
      const base = await imageToBase64(src);
      setSrc(src);
      onChange(base);
    }
  })
);


export default enhancer(ImageLoader);