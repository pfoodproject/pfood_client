import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
  }));
  
class Homepage extends Component {

    componentDidMount() {
       
    }


    render() {
     

        return (

            <div className="container-fluid container-index">

                <section>
                    <div className="row row-index">
                        <div className="col-md-12">
                            <h1 id="newest-Game">&nbsp;</h1>
                        </div>
                        <div className="col-md-12">
                         hello world
                           
                        </div>
                    </div>
                </section>
            </div>

        );

    }
}


const mapStateToProps = (state) => {
   
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);