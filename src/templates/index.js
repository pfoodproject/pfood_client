import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import AdminLayout from './admin';
import PartnerLayout from './partner';
import adminRoutes from './routes/adminRoutes';
import partnerRoutes from './routes/partnerRoutes';
import Loadable from "react-loadable";
import MyLoadingComponent from "../components/LoadingComponent";
import { useStore, useDispatch } from 'react-redux';
import {mlts} from '../pages/partner/Account/actions'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
const Template = () => {
    const LoginPage = Loadable({
        loader: () => import("../pages/partner/SignIn"),
        loading: MyLoadingComponent
      });
      
    const store = useStore();
    const dispatch = useDispatch();
    const comp = (privateComponent) => {
        if ((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) && store.getState().partnerInfo) {
           return privateComponent
        }
        if((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) && store.getState().partnerInfo === null){            
            dispatch(mlts(JSON.parse(localStorage.getItem("sessionpartner"))))
            return privateComponent
        }
        localStorage.removeItem("sessionpartner")
        return LoginPage
    }
    const lay = (layout) => {
        
        if ((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) ) {
           return layout
        }
        return 'Minimal'
    }
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>

                    {_.map(adminRoutes, (route, key) => {
                        const { component, path, exact } = route;
                        return (
                            <Route
                                key={key}
                                render={(route) => <AdminLayout component={component} route={route} />}
                                path={path}
                                exact={exact}
                            />
                        )
                    })}

                    {_.map(partnerRoutes, (route, key) => {
                        const { component, path, exact, layout } = route;
                        return (
                            <Route
                                key={key}
                                render={(route) => <PartnerLayout component={comp(component)} route={route} layout={lay(layout)} />}
                                path={path}
                                exact={exact}
                            />
                        )
                    })}
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );

}


export default Template;
