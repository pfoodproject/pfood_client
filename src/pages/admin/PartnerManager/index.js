import React, { Component } from 'react';
import { checkLogin } from './actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  

  render() {
    
    return (
        <div>
            <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={5}
            />
        </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    state
  }
}


export default withRouter(connect(mapStateToProps)(LoginPage));
