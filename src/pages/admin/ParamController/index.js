import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, Divider } from "@material-ui/core/";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData, changeStatus } from './actions';
import "../../../theme/css/paginationAndTogle.css";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListParam: [],
      page: 1,
      limit: 15,
      pageCount:0
    }
  }
  componentDidMount() {
    this.props.getData(this.after);
  }

  
  after = (resp) => {
    this.setState({
      ListParam: resp
    })
    console.log(resp)
  }

  save = () => {
    this.props.changeStatus({ListParam: this.state.ListParam}, this.afterChange)
  }

  afterChange = (resp) => {
    console.log(resp)
  }

  onChangeInput = (e) => {
    console.log(e.target.name)
    const ListParam = [...this.state.ListParam]
    ListParam.map (p => {
      if(p.ParamName == e.target.name){
        p.ParamValue = e.target.value
      }
    })
    this.setState({
      ListParam: ListParam
    })
  }

  render() {
    return (
      <div >
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Tham số hệ thống
        </div>
        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListParam}
          pageSize={this.state.ListParam.length}
          columns={[
            {
              Header: <div><div>Tên tham số</div></div>,
              accessor: "ParamName",
              filterable: true
            },
            {
              Header: <div><div>Giá trị</div></div>,
              accessor: "ParamValue",
              Cell: props => {
                return (
                  <div style={{ }}>
                    <input style = {{width: "100%", textAlign: "right" }} name = {props.row._original.ParamName} type="number" onChange = {this.onChangeInput} defaultValue = {props.value}/>
                  </div>
                )
              }
            },
            {
              Header: <div><div>Mô tả</div></div>,
              accessor: "Description",

            },
           
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <div style ={{textAlign: "center", margin: "20px"}}>
        <Button variant="contained" color="secondary" onClick = {this.save}>
          Lưu
        </Button>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  const { PartnerManager } = state

  return {
    PartnerList: PartnerManager.PartnerList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (after) => { dispatch(getData(after)) },
    changeStatus: (value, after) => { dispatch(changeStatus(value, after)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Manager);