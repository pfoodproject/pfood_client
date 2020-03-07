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

const SignUpPage = Loadable({
  loader: () => import("../../pages/partner/SignUp"),
  loading: MyLoadingComponent
});


const routes = {
  AccountPage: {
    path: '/partner/account',
    exact: true,
    component: AccountPage,
    private: true,
    layout: 'Partner'
  },
  ProductPage: {
    path: '/partner/product',
    exact: true,
    component: ProductPage,
    private: true,
    layout: 'Partner'
  },
  HomePage: {
    path: '/partner',
    exact: true,
    component: HomePage
    ,
    layout: 'Partner'
  },
  LoginPage: {
    path: '/partner/login',
    exact: true,
    component: LoginPage,
    // (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
    //   ? HomePage
    //   : LoginPage
    // ),
    private: false,
    layout: 'Minimal'
  },
  SignUpPage: {
    path: '/partner/sign-up',
    exact: true,
    component:SignUpPage,
      // (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
      //   ? HomePage
      //   : SignUpPage
      // ),
    private: false,
    layout: 'Minimal'
  }
};

export default routes;