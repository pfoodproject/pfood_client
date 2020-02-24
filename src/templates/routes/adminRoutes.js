import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

  const HomePage = Loadable({
    loader: () => import("../../pages/admin/HomePage"),
    loading: MyLoadingComponent
  });

  const ProductPage = Loadable({
    loader: () => import("../../pages/admin/Product"),
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
        path: '/',
        exact: true,
        component: HomePage,
        private: true
    },
    ProductPage: {
      path: '/product',
      exact: true,
      component: ProductPage,
      private: true
  },
  PartnerPage: {
    path: '/partnermanager',
    exact: true,
    component: PartnerPage,
    private: true
},
    LoginPage: {
        path: '/login',
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