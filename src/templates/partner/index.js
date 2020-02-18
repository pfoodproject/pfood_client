import React, { Component } from 'react';
import MinimalLayout from '../../layouts/Minimal';

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        let layout = this.props.layout;
        console.log(layout);
        
        return (
            <div>
                <MinimalLayout>
                    <Component route={route} />
                </MinimalLayout>
            </div>
        );
    }
}

export default index;