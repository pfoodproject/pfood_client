import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

const HomePage = Loadable({
  loader: () => import("../../pages/partner/HomePage"),
  loading: MyLoadingComponent
});

const AccountPage = Loadable({
  loader: () => import("../../pages/partner/Account"),
  loading: MyLoadingComponent
});

const ProductPage = Loadable({
  loader: () => import("../../pages/partner/Product"),
  loading: MyLoadingComponent
});

const LoginPage = Loadable({
  loader: () => import("../../pages/partner/SignIn"),
  loading: MyLoadingComponent
});

const routes = {
  AccountPage: {
    path: '/partner/account',
    exact: true,
    component: AccountPage,
    private: true,
    layout: 'a'
  },
  ProductPage: {
    path: '/partner/product',
    exact: true,
    component: ProductPage,
    private: true,
    layout: 'a'
  },
  HomePage: {
    path: '/partner',
    exact: true,
    component: HomePage,
    private: true,
    layout: 'a'
  },
  LoginPage: {
    path: '/partner/login',
    exact: true,
    component:
      (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
        ? HomePage
        : LoginPage
      ),
    private: false,
    layout: 'a'
  }
};

export default routes;