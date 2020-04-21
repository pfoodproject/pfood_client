import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, Divider } from "@material-ui/core/";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData } from './actions';
import "../../../theme/css/paginationAndTogle.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  componentDidMount() {

    try {
      setInterval(async () => {
        this.props.getData(this.after);
      }, 10000);
    } catch(e) {
      console.log(e);
    }
    
  }

  after = (resp) => {
    resp.map(r=>{
      toast('có 1 sản phẩm mới được đăng ký với mã là ' + r.ItemID + ' của cửa hàng có mã là ' + r.PartnerID)
    })
    
  }

  
  

  render() {
    return (
      <div>
        <ToastContainer />
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (after) => { dispatch(getData(after)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Manager);