export const apiUrl = 'http://localhost:10010';
export const tokenTTLinDays = 1;

export const endpoints = {
  home: '/',
  products: '/products',
  product: '/products/:prodID',
  createProduct: '/create-product',
  login: '/login',
  posts: '/posts',
  createPost: '/create-post',
  post: '/posts/:postID'
};

export const labels = {
  validation: {
    required: 'Поле обязательно к заполнению',
    positive: 'Значение не может быть меньше нуля',
    integer: 'Значение может быть только целым числом',
    unique: 'Значение уже зарегистрировано'
  }
};

export const errorCodes = {
  duplication: 'UNIQUE_DUPLICATION'
}