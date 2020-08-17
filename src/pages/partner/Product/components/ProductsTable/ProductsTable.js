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
  CheckBox
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, FormControlLabel, Checkbox, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { useSelector, useDispatch, useStore } from 'react-redux';
import { fetchProduct, updateProduct } from '../../actions';
import ProductAdd from '../ProductAdd';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import validate from 'validate.js';

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

let schema = {};
let errors = []

const UsersTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, height: 40, borderRadius: '50%' }} />, filtering: false },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Giá gốc', field: 'defaultprice', filtering: false },
    { title: 'Loại', field: 'categoryName' },
    { title: 'Trạng thái', field: 'StatusName' },
    {
      title: 'Đăng bán', field: 'StatusID', render: rowData => {

        if (rowData.StatusID === 1) {
          return (<Button variant="outlined" color="primary" disabled={isAdding} onClick={() => handleAdd(rowData)}>Đăng bán</Button>)
        }
      }, filtering: false
    },
  ];

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [category, setCategory] = useState([]);
  const firstUpdate = useRef(true);
  const [isSschedule, setIsSschedule] = useState(false);
  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    dispatch(fetchProduct(store));
  }, [dispatch, store]);

  const { data, msg, type, msgSourceOfItems, typeSourceOfItems, count } = useSelector(state => ({
    data: state.product.lst,
    msg: state.product.msg,
    type: state.product.type,
    count: state.product.count,
    msgSourceOfItems: state.sourceOfItems.msg,
    typeSourceOfItems: state.sourceOfItems.type
  }));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await callApiUnauthWithHeader(`category`, 'GET', {})
  //     setCategory(result.data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (type === 'success' && type !== null && msg !='') {
      NotificationManager.success(type, msg, 3000);
    } else if (type !== 'success' && type !== '' && msg !='') {

      NotificationManager.error(type, msg, 3000);
    }
    setIsUpdate(false)
    setOpen(false);
  }, [msg, type, count]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (typeSourceOfItems === 'success' && typeSourceOfItems !== null  && msgSourceOfItems !='') {
      NotificationManager.success(typeSourceOfItems, msgSourceOfItems, 3000);
    } else if (typeSourceOfItems !== 'success' && typeSourceOfItems !== '' && msgSourceOfItems !='') {

      NotificationManager.error(typeSourceOfItems, msgSourceOfItems, 3000);
    }
    setIsAdding(false)
  }, [msgSourceOfItems, typeSourceOfItems]);

  // const handleDelete = (rowData) => {
  //   confirmAlert({
  //     title: 'Xác nhận !',
  //     message: 'Bạn có chắc muốn xóa ?',
  //     buttons: [
  //       {
  //         label: 'Có',
  //         onClick: () => dispatch(deleteProduct(rowData.ItemID))
  //       },
  //       {
  //         label: 'Không',
  //       }
  //     ]
  //   });
  //   //  
  // }
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      ItemName: '',
      description: '',
    },
    touched: {},
    errors: {}
  });
  errors = validate(formState.values, schema, { fullMessages: false });

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const changeSchedule = () => {    
    setIsSschedule(!isSschedule)
  }

  useEffect(() => {
    if (isSschedule === true) {
      schema.scheduleTimeFrom = {
        presence: { allowEmpty: false, message: 'Thời gian bắt đầu không được để trống !' },
      }
      schema.scheduleTimeTo = {
        presence: { allowEmpty: false, message: 'Thời gian kết thúc không được để trống !' },
      }
      schema.schedulePrice = {
        presence: { allowEmpty: false, message: 'Giá sản phẩm không được để trống !' },
      }
      schema.scheduleAmount = {
        presence: { allowEmpty: false, message: 'Số lượng không được để trống !' },
      }
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values
        },
        touched: {
          ...formState.touched,
          'schedulePrice': false,
          'scheduleAmount': false
        }
      }));
    } else {
      delete schema.scheduleTimeFrom;
      delete schema.scheduleTimeTo;
      delete schema.schedulePrice;
      delete schema.scheduleAmount;
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'scheduleDay': [],
          'scheduleTimeFrom': "11:00",
          'scheduleTimeTo': "12:00",
          'schedulePrice': "",
          'scheduleAmount': ""
        },
        touched: {
          ...formState.touched,
          'schedulePrice': false,
          'scheduleAmount': false
        }
      }));
    }

  }, [isSschedule])

  const [schedulerDay, setSchedulerDay] = React.useState(() => []);
  const handleSchedulerDay = (event, newSchedule) => {
    setSchedulerDay(newSchedule);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'scheduleDay': newSchedule
      },
    }));
  };


  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [addData, setAddData] = useState({});
  const handleEdit = (rowData) => {
    setIsSschedule(false);
    // setValues(rowData)
    setFormState(formState => ({
      ...formState,
      values: {
        ...rowData,
        scheduleTimeFrom: "12:00",
        scheduleTimeTo: "12:00",
      },
    }));
    if (rowData.scheduleDay !== null && rowData.scheduleDay !== "") {

      rowData.scheduleDay = rowData.scheduleDay.toString();

      setSchedulerDay(rowData.scheduleDay.split(','));
      // setValues({
      //   ...rowData,
      //   'scheduleDay': rowData.scheduleDay.split(',')
      // });
      setFormState(formState => ({
        ...formState,
        values: {
          ...rowData,
          'scheduleDay': rowData.scheduleDay.split(','),
          scheduleTimeFrom: rowData.scheduleTimeFrom,
          scheduleTimeTo: rowData.scheduleTimeTo,
        },
      }));
      setIsSschedule(true);
    } else {
      // setIsSschedule(false);
      setSchedulerDay([]);
    }
    setOpen(true);
  }

  const closeAdd = () => {
    setOpenAdd(false);
    setIsAdding(false);
  }

  const handleAdd = (rowData) => {
    setOpenAdd(true);
    setAddData(rowData)
    setIsAdding(true);
  }

  const handleClose = () => {
    setIsSschedule(false);
    setSchedulerDay([]);
    setFormState(formState => ({
      isValid: false,
      values: {
        ItemName: '',
        description: '',
      },
      touched: {},
      errors: {}
    }));
    setOpen(false);
    
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? (event.target.checked ? 1 : 0)
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeFile = file => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ItemImage: file
      },
      touched: {
        ...formState.touched
      }
    }));
  };
  const handleAccept = () => {

    dispatch(updateProduct(formState.values));
    setIsUpdate(true);
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

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
              title="Sản Phẩm"
              columns={columns}
              data={data}
              icons={tableIcons}
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Sửa',
                  onClick: (event, rowData) => handleEdit(rowData)
                },
                // {
                //   icon: DeleteOutline,
                //   tooltip: 'Xóa',
                //   onClick: (event, rowData) => handleDelete(rowData)
                // }
              ]}
              options={{
                actionsColumnIndex: -1,
                // exportButton: true,
                filtering: true
              }}
            />

            <Dialog
              fullWidth={true}
              maxWidth={'sm'}
              scroll={'body'}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Thông tin sản phẩm"}</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <Grid
                  container
                  spacing={3}
                >

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      helperText=""
                      label="Mô tả"
                      margin="dense"
                      name="description"
                      onChange={handleChange}
                      value={formState.values.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlank fontSize="small" />}
                          checkedIcon={<CheckBox fontSize="small" />}
                          name="schedule"
                          checked={isSschedule}
                          onChange={changeSchedule}
                        />
                      }
                      label="Đặt lịch"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    container
                  >
                    <Grid md={3} xs={3} item>
                      <TextField
                        id="time"
                        label="Thời gian từ"
                        type="time"
                        defaultValue="00:00"
                        className={classes.textField}
                        error={hasError('scheduleTimeFrom')}
                        helperText={
                          hasError('scheduleTimeFrom') ? formState.errors.scheduleTimeFrom[0] : null
                        }
                        name="scheduleTimeFrom"
                        value={formState.values.scheduleTimeFrom}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        onChange={handleChange}
                        disabled={!isSschedule}
                      /></Grid>

                    <Grid md={6} xs={6} item>

                      <Paper elevation={0} className={classes.paper}>
                        <StyledToggleButtonGroup
                          size="small"
                          value={schedulerDay} onChange={handleSchedulerDay} aria-label="text formatting"
                        >
                          <ToggleButton value="1" aria-label="Thứ 2" disabled={!isSschedule}>
                            T2
                        </ToggleButton>
                          <ToggleButton value="2" aria-label="Thứ 3" disabled={!isSschedule}>
                            T3
                        </ToggleButton>
                          <ToggleButton value="3" aria-label="Thứ 4" disabled={!isSschedule}>
                            T4
                        </ToggleButton>
                          <ToggleButton value="4" aria-label="Thứ 5" disabled={!isSschedule}>
                            T5
                        </ToggleButton>
                          <ToggleButton value="5" aria-label="Thứ 6" disabled={!isSschedule}>
                            T6
                        </ToggleButton>
                          <ToggleButton value="6" aria-label="Thứ 7" disabled={!isSschedule}>
                            T7
                        </ToggleButton>
                          <ToggleButton value="0" aria-label="Chủ nhật" disabled={!isSschedule}>
                            CN
                        </ToggleButton>
                        </StyledToggleButtonGroup>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    container
                  >
                    <Grid md={3} xs={3} item>
                      <TextField
                        id="time"
                        label="Thời gian đến"
                        type="time"
                        defaultValue="00:00"
                        className={classes.textField}
                        name="scheduleTimeTo"
                        error={hasError('scheduleTimeTo')}
                        helperText={
                          hasError('scheduleTimeTo') ? formState.errors.scheduleTimeTo[0] : null
                        }
                        value={formState.values.scheduleTimeTo}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        onChange={handleChange}
                        disabled={!isSschedule}
                      /></Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Giá sản phẩm"
                      margin="dense"
                      name="schedulePrice"
                      error={hasError('schedulePrice')}
                      helperText={
                        hasError('schedulePrice') ? formState.errors.schedulePrice[0] : null
                      }
                      onChange={handleChange}
                      disabled={!isSschedule}
                      required
                      type="number"
                      value={formState.values.schedulePrice}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Số lượng"
                      margin="dense"
                      name="scheduleAmount"
                      error={hasError('scheduleAmount')}
                      helperText={
                        hasError('scheduleAmount') ? formState.errors.scheduleAmount[0] : null
                      }
                      onChange={handleChange}
                      disabled={!isSschedule}
                      required
                      type="number"
                      value={formState.values.scheduleAmount}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  ></Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <DropzoneArea
                      onChange={handleChangeFile}
                      acceptedFiles={['image/*']}
                      filesLimit={1}
                      dropzoneText={'Ảnh sản phẩm'}
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      initialFiles={[]}
                    />
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Huỷ
          </Button>
                <Button onClick={handleAccept} color="primary" autoFocus disabled={isUpdate || !formState.isValid} >
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
            {/* Dialog add */}
            <ProductAdd open={openAdd} updateParent={closeAdd} data={addData} />
          </div>

        )}
    </div>
  );
};

export default UsersTable;
