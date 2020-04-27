import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData, changeStatus } from './actions';
import ReactPaginate from 'react-paginate';
import "../../../theme/css/paginationAndTogle.css";
import Toggle from 'react-toggle'

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListUser: [],
      page: 1,
      limit: 15,
      orderBy: [{ column: "CustomerID", value: "desc" }],
      CustomerNameFillter: "",
      CustomerUsernameFillter: "",
      CustomerAddressFillter: "",
      CustomerPhoneFillter: "",
      CustomerEmailFillter: "",
      pageCount:0
    }
  }
  componentDidMount() {
    this.props.getData(this.getParam(), this.after);
  }

  getParam = () => {
    const { page, limit, orderBy, CustomerNameFillter, CustomerUsernameFillter, CustomerAddressFillter, CustomerPhoneFillter, CustomerEmailFillter} = this.state
    return {
      orderBy: orderBy,
      limit: limit,
      offset: (page - 1) * limit,
      like: [
        { column: "CustomerName", value: CustomerNameFillter },
        { column: "CustomerUsername", value: CustomerUsernameFillter },
        { column: "CustomerAddress", value: CustomerAddressFillter },
        { column: "CustomerPhone", value: CustomerPhoneFillter },
        { column: "CustomerEmail", value: CustomerEmailFillter }
      ]
    }
  }

  after = (resp,resp1) => {
    const {limit} = this.state
    this.setState({
      ListProduct: resp,
      pageCount: resp1[0].count/limit
    })

  }

  afterChange = () => {
    this.props.getData(this.getParam(), this.after);
  }

  handlePageClick = async (e) => {
    await this.setState({
      page: e.selected + 1
    })

    this.props.getData(this.getParam(), this.after);
  }

  handleEnable = (e, row) => {
    var status = 2
    if (e.target.checked) {
      status = 1
    }
    this.props.changeStatus({ "StatusID": status, "CustomerID": row.original.CustomerID }, this.afterChange)

  }

  onChangeFillter = async (e) => {
    let value = e.target.value
    let name = e.target.name
    await this.setState({
      [name]: value
    })
    this.props.getData(this.getParam(), this.after);
  }

  render() {
    return (
      <div >
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Kích hoạt sản phẩm đối tác đăng ký
        </div>
        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListProduct}
          pageSize={this.state.limit}
          columns={[
            {
              Header: <div><div>Tên đầy đủ</div><input style={{ width: "99%" }} className="formControl" type="text" name="CustomerNameFillter" value={this.state.CustomerNameFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "CustomerName",

            },
            {
              Header: <div><div>Username</div><input style={{ width: "99%" }} className="formControl" type="text" name="CustomerUsernameFillter" value={this.state.CustomerUsernameFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "CustomerUsername",
            },
            {
              Header: <div><div>Địa chỉ</div><input style={{ width: "99%" }} className="formControl" type="text" name="CustomerAddressFillter" value={this.state.CustomerAddressFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "CustomerAddress",

            },
            {
              Header: <div><div>Số điện thoại</div><input style={{ width: "99%" }} className="formControl" type="text" name="CustomerPhoneFillter" value={this.state.CustomerPhoneFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "CustomerPhone",
            },
            {
              Header: <div><div>Email</div><input style={{ width: "99%" }} className="formControl" type="text" name="CustomerEmailFillter" value={this.state.CustomerEmailFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "CustomerEmail",

            },
            {
              Header: <div><div></div><input style={{ width: "99%" }} className="formControl" type="text" onChange={this.onChangeFillter} /></div>,
              accessor: "StatusID",
              show : false
            },
            {
              Header: <div><div>Kích hoạt</div></div>,
              Cell: props => {
                return (
                  <div style={{ textAlign: "center" }}>
                    <Toggle
                      checked={props.row.StatusID === 1}
                      icons={false}
                      onChange={e => this.handleEnable(e, props)}
                    />
                  </div>
                )
              }
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          pageClassName={'page'}
          activeClassName={'active'}
        />
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
    getData: (value, after) => { dispatch(getData(value, after)) },
    changeStatus: (value, after) => { dispatch(changeStatus(value, after)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Manager);