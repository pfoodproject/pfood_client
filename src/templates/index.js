import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import AdminLayout from './admin';
import adminRoutes from './routes/adminRoutes';

class Template extends Component {
    render() {
        return (
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


                </Switch>
            </BrowserRouter>
        );
    }
}


export default Template;
