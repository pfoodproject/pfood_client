import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

  const HomePage = Loadable({
    loader: () => import("../../pages/partner/HomePage"),
    loading: MyLoadingComponent
  });

  const LoginPage = Loadable({
    loader: () => import("../../pages/partner/SignIn"),
    loading: MyLoadingComponent
  });

const routes = {
    HomePage: {
        path: '/',
        exact: true,
        component: HomePage,
        private: true,
        layout: 'a'
    },
    LoginPage: {
        path: '/login',
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