import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

  const HomePage = Loadable({
    loader: () => import("../../pages/admin/HomePage"),
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
      private: true
  },
  PartnerPage: {
    path: '/partnercontroller',
    exact: true,
    component: PartnerPage,
    private: true
},
    LoginPage: {
        path: '/admin/login',
        exact: true,
        component: 
            (localStorage.getItem("session") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0) 
                ? HomePage 
                : LoginPage
        ),
        private: false
    }
};

export default routes;