import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";
const HomePage = Loadable({
  loader: () => import("../../pages/public"),
  loading: MyLoadingComponent
});


const routes = {

  HomePage: {
    path: '/',
    exact: true,
    component: HomePage
  }
};

export default routes;