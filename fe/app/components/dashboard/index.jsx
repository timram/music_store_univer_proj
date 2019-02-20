import {
  withStateHandlers,
  compose,
  withProps
} from 'recompose';
import { saveAccount } from '../../helpers/account';
import Home from '../pages/home';
import Products from '../pages/products';
import CreateProduct from '../pages/create-product';
import EditProduct from '../pages/edit-product';
import EditPost from '../pages/edit-post';
import Posts from '../pages/posts';
import CreatePost from '../pages/create-post';
import Dashboard from './Dashboard';
import { endpoints } from '../../config';
 
export default compose(
  withStateHandlers(
    ({ account }) => ({ account }),
    {
      setAccount: () => account => {
        saveAccount(account);
        return { account };
      }
    }
  ),
  withProps({
    routes: [
      {
        path: endpoints.home,
        exact: true,
        component: Home
      },
      {
        path: endpoints.products,
        exact: true,
        component: Products
      },
      {
        path: endpoints.product,
        component: EditProduct
      },
      {
        path: endpoints.createProduct,
        exact: true, 
        component: CreateProduct
      },
      {
        path: endpoints.posts,
        exact: true,
        component: Posts
      },
      {
        path: endpoints.createPost,
        exact: true,
        component: CreatePost
      },
      {
        path: endpoints.post,
        exact: true,
        component: EditPost
      }
    ]
  })
)(Dashboard);
