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
      ListProduct: [],
      page: 1,
      limit: 15,
      orderBy: [{ column: "ItemID", value: "desc" }],
      ItemNameFillter: "",
      descriptionFillter: "",
      pageCount:0
    }
  }
  componentDidMount() {
    this.props.getData(this.getParam(), this.after);
  }

  getParam = () => {
    const { page, limit, orderBy, ItemNameFillter, descriptionFillter } = this.state
    return {
      orderBy: orderBy,
      limit: limit,
      offset: (page - 1) * limit,
      like: [
        { column: "ItemName", value: ItemNameFillter },
        { column: "description", value: descriptionFillter }
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
    this.props.changeStatus({ "StatusID": status, "ItemID": row.original.ItemID }, this.afterChange)

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
              Header: <div><div>Tên</div><input style={{ width: "99%" }} className="formControl" type="text" name="ItemNameFillter" value={this.state.ItemNameFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "ItemName",

            },
            {
              Header: <div><div>Mô tả</div><input style={{ width: "99%" }} className="formControl" type="text" name="descriptionFillter" value={this.state.descriptionFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "description",
            },
            {
              Header: <div><div></div><input style={{ width: "99%" }} className="formControl" type="text" name="descriptionFillter" value={this.state.descriptionFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "StatusID",
              show : false
            },
            {
              Header: <div><div>Kích hoạt</div></div>,
              Cell: props => {
                return (
                  <div style={{ textAlign: "center" }}>
                    <Toggle
                      checked={props.row.StatusID == 1}
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