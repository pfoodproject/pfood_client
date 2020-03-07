import React, { Component } from 'react';
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
    const a = (privateComponent) => {
        console.log(store.getState().partnerInfo);
        
        if ((localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("sessionpartner")).token.expires) - new Date()) >= 0)) && store.getState().partnerInfo) {
            console.log(222);
           return privateComponent
        }
        if(store.getState().partnerInfo === null){
            console.log(111111111111111111111111111);
            
            dispatch(mlts(JSON.parse(localStorage.getItem("sessionpartner"))))
            return privateComponent
        }
        return LoginPage
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
                                render={(route) => <PartnerLayout component={a(component)} route={route} layout={layout} />}
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
