import React, { Component } from 'react';
import Footer from '../../components/Public/Footer';

export default class PublicLayout extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        
        return (
            <div>
                <Component route={route} />
                <Footer />
            </div>
        );
    }
}