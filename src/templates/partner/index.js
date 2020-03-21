import React, { Component } from 'react';
import Partner from '../../layouts/Partner';
import Minimal from '../../layouts/Minimal';
class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        let layout = this.props.layout;
        console.log(layout);
        
        return (
            <div> {layout==='Minimal' ? (
                <Minimal>
                    <Component route={route} />
                </Minimal>
              ) : (
                <Partner>
                    <Component route={route} />
                </Partner>
              )}
            </div>
        );
    }
}

export default index;