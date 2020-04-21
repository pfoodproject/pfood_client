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
      ListPartner: [],
      page: 1,
      limit: 15,
      orderBy: [{ column: "p.PartnerID", value: "desc" }],
      PartnerNameFillter: "",
      PartnerAddressFillter: "",
      PartnerEmailFillter: "",
      PartnerPhoneFillter: "",
      PartnerDescriptionFillter: "",
      PartnerTypeIDFillter: "",
      StatusNameFillter:"",
      pageCount:0
    }
  }
  componentDidMount() {
    this.props.getData(this.getParam(), this.after);
  }

  getParam = () => {
    const { StatusNameFillter, page, limit, orderBy, PartnerNameFillter, PartnerAddressFillter, PartnerEmailFillter, PartnerPhoneFillter, PartnerDescriptionFillter, PartnerTypeIDFillter } = this.state
    return {
      orderBy: orderBy,
      limit: limit,
      offset: (page - 1) * limit,
      like: [
        { column: "p.PartnerName", value: PartnerNameFillter },
        { column: "p.PartnerAddress", value: PartnerAddressFillter },
        { column: "p.PartnerEmail", value: PartnerEmailFillter },
        { column: "p.PartnerPhone", value: PartnerPhoneFillter },
        { column: "p.PartnerDescription", value: PartnerDescriptionFillter },
        { column: "p.PartnerTypeID", value: PartnerTypeIDFillter },
        { column: "s.StatusName", value: StatusNameFillter },
      ]
    }
  }

  after = (resp,resp1) => {
    const {limit} = this.state
    this.setState({
      ListPartner: resp,
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

  handleEnable = async (e, row) => {
    const  status_old =  row.original.StatusID
    console.log(status_old)
    var status = 2
    if (e.target.checked) {
      status = 1
    }
    this.props.changeStatus({ "StatusID": status, "PartnerID": row.original.PartnerID, "status_old": status_old }, this.afterChange)

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
          Kích hoạt / ban đối tác
        </div>
        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListPartner}
          pageSize={this.state.limit}
          columns={[
            {
              Header: <div><div>Tên</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerNameFillter" value={this.state.PartnerNameFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "PartnerName",

            },
            {
              Header: <div><div>Địa chỉ</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerAddressFillter" value={this.state.PartnerAddressFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "PartnerAddress",
            },
            {
              Header: <div><div>Email</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerEmailFillter" value={this.state.PartnerEmailFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "PartnerEmail",
            },
            {
              Header: <div><div>Số điện thoại</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerPhoneFillter" value={this.state.PartnerPhoneFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "PartnerPhone",
            },
            {
              Header: <div><div>Mô tả</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerDescriptionFillter" value={this.state.PartnerDescriptionFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "PartnerDescription",
            },
            {
              Header: <div><div>Trạng thái</div><input style={{ width: "99%" }} className="formControl" type="text" name="StatusNameFillter" value={this.state.StatusNameFillter} onChange={this.onChangeFillter} /></div>,
              accessor: "StatusName",
            },
            // {
            //   Header: <div><div>Kiểu</div><input style={{ width: "99%" }} className="formControl" type="text" name="PartnerTypeIDFillter" value={this.state.PartnerTypeIDFillter} onChange={this.onChangeFillter} /></div>,
            //   accessor: "PartnerTypeID",
            // },
            {
              Header: <div><div></div></div>,
              accessor: "StatusID",
              show: false
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