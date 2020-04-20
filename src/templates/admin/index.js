import React, { Component } from 'react';
import MainLayout from '../../layouts/Main';
import Notication from '../../pages/admin/Notication'

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        
        return (
            <div>
                <Notication></Notication>
                <MainLayout>
                    <Component route={route} />
                </MainLayout>
            </div>
        );
    }
}

export default index;