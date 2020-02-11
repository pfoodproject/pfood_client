import React, { Component } from 'react';
import Footer from '../../components/Footer';

class index extends Component {
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

export default index;