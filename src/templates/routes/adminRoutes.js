import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

  const HomePage = Loadable({
    loader: () => import("../../pages/admin/HomePage"),
    loading: MyLoadingComponent
  });

  const ParamPage = Loadable({
    loader: () => import("../../pages/admin/ParamController"),
    loading: MyLoadingComponent
  });

  const UserPage = Loadable({
    loader: () => import("../../pages/admin/UserController"),
    loading: MyLoadingComponent
  });

  const ProductPage = Loadable({
    loader: () => import("../../pages/admin/ProductController"),
    loading: MyLoadingComponent
  });

  const PartnerPage = Loadable({
    loader: () => import("../../pages/admin/PartnerController"),
    loading: MyLoadingComponent
  });
  
  const LoginPage = Loadable({
    loader: () => import("../../pages/admin/Login"),
    loading: MyLoadingComponent
  });

const routes = {
    HomePage: {
        path: '/admin',
        exact: true,
        component: HomePage,
        layout: 'MainLayout'
    },

    ParamPage: {
      path: '/paramcontroller',
      exact: true,
      component: ParamPage,
      private: true
  },

    UserPage: {
      path: '/usercontroller',
      exact: true,
      component: UserPage,
      private: true
  },
    ProductPage: {
      path: '/productcontroller',
      exact: true,
      component: ProductPage,
      layout: 'MainLayout'
  },
  PartnerPage: {
    path: '/partnercontroller',
    exact: true,
    component: PartnerPage,
    private: true
},
    LoginPage: {
        path: '/admin/login',
        component: LoginPage,
        exact: true,
        layout: 'Minimal'
    }
};

export default routes;