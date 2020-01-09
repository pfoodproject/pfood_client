import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/Public/LoadingComponent";

  const HomePage = Loadable({
    loader: () => import("../../pages/public/HomePage"),
    loading: MyLoadingComponent
  });
  
  const LoginPage = Loadable({
    loader: () => import("../../pages/public/Login"),
    loading: MyLoadingComponent
  });

  const CategoryPage = Loadable({
    loader: () => import("../../pages/public/CategoryPage"),
    loading: MyLoadingComponent
  });

  const DetailPage = Loadable({
    loader: () => import("../../pages/public/DetailPage"),
    loading: MyLoadingComponent
  });

const routes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage,
        private: false
    },
    CategoryPage: {
        path: '/category/:name',
        exact: false,
        component: CategoryPage,
        private: false
    },
    DetailPage: {
        path: '/detail/:name',
        exact: false,
        component: DetailPage,
        private: false
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