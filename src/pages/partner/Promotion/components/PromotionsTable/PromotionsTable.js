import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  CheckBoxOutlineBlank,
  CheckBox,
  Done,
  HighlightOff,
  Details
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, FormControlLabel, Checkbox, Paper, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { useSelector, useDispatch, useStore } from 'react-redux';
import { fetchOrder, updateOrder } from '../../actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import callApiUnauthWithBody, { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import * as moment from 'moment';
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  dialogContent: {
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);


const PromotionsTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Mã đơn hàng', field: 'orderid', filtering: false },
    { title: 'Tên khách hàng', field: 'CustomerName' },
    { title: 'Trạng thái', field: 'StatusName' },
    { title: 'Ngày tạo', field: 'adddate', render: rowData => <div>{moment(rowData.adddate).format('hh:mm:ss DD/MM/YYYY')}</div>, filtering: false },
    {
      title: '', field: 'StatusID', render: rowData => {


        return (<React.Fragment>
          <Tooltip title="Chi tiết">
            <Button variant="outlined" onClick={() => handleDetail(rowData)} style={{ marginLeft: '10px', color: '#4caf50', border: '#4caf50 1px solid' }}><Details /></Button>
          </Tooltip>
          {rowData.statusid == 1 ? (
            <React.Fragment>
              <Tooltip title="Hoàn thành">
                <Button variant="outlined" color="primary" onClick={() => handleAccept(rowData)} style={{ marginLeft: '10px' }}><Done /></Button>
              </Tooltip>
              <Tooltip title="Hủy">
                <Button variant="outlined" onClick={() => handleReject(rowData)} style={{ marginLeft: '10px', color: '#f44336', border: '#f44336 1px solid' }}><HighlightOff /></Button>
              </Tooltip>
            </React.Fragment>
          ) : (
              <React.Fragment>
              </React.Fragment>
            )}
        </React.Fragment>)

      }, filtering: false
    },
  ];

  const columnsOrderDetail = [
    { title: 'Avatar', field: 'Image', render: rowData => <img src={rowData.Image} alt={rowData.ItemName} style={{ width: 40, height: 40, borderRadius: '50%' }} />, },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Số lượng', field: 'total' },
    { title: 'Giá', field: 'price' },
    { title: 'Mô tả', field: 'Description' },
  ];

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);

  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    dispatch(fetchOrder(store));
  }, [dispatch, store]);

  const { data, msg, type, count } = useSelector(state => ({
    data: state.order.lst,
    msg: state.order.msg,
    type: state.order.type,
    count: state.order.count,
  }));

  const [detailData, setDetailData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (type === 'success' && type !== null) {
      NotificationManager.success(type, msg, 3000);
    } else if (type !== 'success' && type !== '') {

      NotificationManager.error(type, msg, 3000);
    }
  }, [msg, type, count]);


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setIsLoading(false);
  }, [data]);

  const handleAccept = (rowData) => {
    dispatch(updateOrder(rowData.orderid, 4))
  }

  const handleReject = (rowData) => {
    dispatch(updateOrder(rowData.orderid, 3))
  }
  const handleDetail = (rowData) => {
    const fetchData = async (orderid) => {
      const result = await callApiUnauthWithHeader(`partner/detailorderbyid`, 'GET', { orderid: orderid })
      setDetailData(result.data);
      setIsLoadingDetail(true);
      setOpen(true);
    };
    fetchData(rowData.orderid);
  }
  useEffect(() => {
    if (detailData) {
      setIsLoadingDetail(false);
    }
  }, [detailData]);

  const handleClose = () => {
    setOpen(false);
    setDetailData([]);
  }
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <div>
      <NotificationContainer />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <div>
            <MaterialTable
              title="Đơn hàng"
              columns={columns}
              data={data}
              icons={tableIcons}
              // actions={[
              //   {
              //     icon: Edit,
              //     tooltip: 'Sửa',
              //     onClick: (event, rowData) => handleEdit(rowData)
              //   },
              //   // {
              //   //   icon: DeleteOutline,
              //   //   tooltip: 'Xóa',
              //   //   onClick: (event, rowData) => handleDelete(rowData)
              //   // }
              // ]}
              options={{
                actionsColumnIndex: -1,
                // exportButton: true,
                filtering: true
              }}
            />

            <Dialog
              fullWidth={true}
              maxWidth={'md'}
              scroll={'body'}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Thông tin đơn hàng"}</DialogTitle>
              <DialogContent className={classes.dialogContent}>

                {isLoading ? (
                  <div>Loading ...</div>
                ) : (
                    <Grid
                      container
                      spacing={1}
                    >

                      <Grid
                      item
                        md={12}
                        xs={12}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Mã đơn hàng"
                          margin="dense"
                          value={(detailData.order) ? detailData.order.orderid : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={6}
                        xs={6}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Tên khách hàng"
                          margin="dense"
                          value={(detailData.order) ? detailData.order.CustomerName : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={6}
                        xs={6}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Số điện thoại"
                          margin="dense"
                          value={(detailData.order) ? detailData.order.CustomerPhone : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={12}
                        xs={12}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Lời nhắn"
                          margin="dense"
                          value={(detailData.order) ? detailData.order.ordernote : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={12}
                        xs={12}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Ship"
                          margin="dense"
                          value={(detailData.order) ? (detailData.order.shipaddress ? detailData.order.shipaddress : 'Không') : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={6}
                        xs={6}>
                        <TextField
                          fullWidth
                          helperText=""
                          label="Ngày tạo"
                          margin="dense"
                          value={(detailData.order) ? moment(detailData.order.adddate).format('hh:mm:ss DD/MM/YYYY') : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={6}
                        xs={6}>
                        <TextField
                          fullWidth
                          helperText=""
                          label={(detailData.order) ? (detailData.order.rejectdate ? 'Ngày hủy' : (detailData.order.approvedate ? 'Ngày hoàn thành' : '') ) : 'null'}
                          margin="dense"
                          value={(detailData.order) ? (detailData.order.rejectdate ? moment(detailData.order.rejectdate).format('hh:mm:ss DD/MM/YYYY') : (detailData.order.approvedate ? moment(detailData.order.approvedate).format('hh:mm:ss DD/MM/YYYY') : '') ) : 'null'}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid
                      item
                        md={12}
                        xs={12}>
                          <TextField
                          fullWidth
                          helperText=""
                          label="Trạng thái"
                          margin="dense"
                          value={(detailData.order) ? detailData.order.StatusName : 'null'}
                          variant="outlined"
                          disabled
                        />
                        </Grid>

                      <Grid
                      item
                        md={12}
                        xs={12}
                        style={{ borderTop: '1px solid #ddd', marginTop: '20px' }}>
                        <MaterialTable
                          title="Sản phẩm"
                          columns={columnsOrderDetail}
                          data={detailData.orderDetail}
                          icons={tableIcons}
                          options={{
                            search: false
                          }}
                        />
                      </Grid>
                    </Grid>


                  )}

              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Đóng
          </Button>
              </DialogActions>
            </Dialog>
          </div>

        )}
    </div>
  );
};

export default PromotionsTable;
