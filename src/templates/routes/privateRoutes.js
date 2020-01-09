import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/Public/LoadingComponent";

  const UserPage = Loadable({
    loader: () => import("../../pages/public/HomePage"),
    loading: MyLoadingComponent
  });
  

const routes = {
    UserPage: {
        path: '/user',
        exact: true,
        component: UserPage,
        private: false
    },


};

export default routes;