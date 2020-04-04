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
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { useSelector, useDispatch, useStore } from 'react-redux';
import { fetchProduct, deleteProduct, updateProduct } from '../../actions';
import ProductAdd from '../ProductAdd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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

const UsersTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, height:40, borderRadius: '50%' }} /> , filtering: false},
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Mô tả', field: 'description' },
    { title: 'Trạng thái', field: 'StatusName' },
    {
      title: 'Đăng bán', field: 'StatusID', render: rowData => {

        if ( rowData.StatusID === 1) {
          return (<Button variant="outlined" color="primary" disabled={isAdding} onClick={() => handleAdd(rowData)}>Đăng bán</Button>)
        }
      } , filtering: false
    },
  ];
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const firstUpdate = useRef(true);
  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    dispatch(fetchProduct(store));
  }, [dispatch, store]);
  const {data, msg, type, msgSourceOfItems, typeSourceOfItems} = useSelector(state => ({
    data: state.product.lst,
    msg: state.product.msg,
    type: state.product.type,
    msgSourceOfItems:state.sourceOfItems.msg,
    typeSourceOfItems: state.sourceOfItems.type
  }));
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
    if (type === 'success' && type !==null) {
      NotificationManager.success(type, msg, 3000);
    }else if (type !== 'success' && type !=='') {

      NotificationManager.error(type, msg, 3000);
    }
    setIsUpdate(false)
    setOpen(false);
  }, [msg, type]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }        
    if (typeSourceOfItems === 'success' && typeSourceOfItems !==null) {
      NotificationManager.success(typeSourceOfItems, msgSourceOfItems, 3000);
    }else if (typeSourceOfItems !== 'success' && typeSourceOfItems !=='') {

      NotificationManager.error(typeSourceOfItems, msgSourceOfItems, 3000);
    }
    setIsAdding(false)
  }, [msgSourceOfItems, typeSourceOfItems]);

  const handleDelete = (rowData) => {
     dispatch(deleteProduct(rowData.ItemID));
  }
  const [values, setValues] = useState({
    ItemID: '',
    ItemName: '',
    description: '',
    ItemImage: '',
    StatusID:''
  });

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [addData, setAddData] = useState({});
  const handleEdit = (rowData) => {
    setValues(rowData)
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
    setOpen(false);
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeFile = file => {
    setValues({
      ...values,
      ItemImage: file
    })
  };
  const handleAccept = () => {
    dispatch(updateProduct(values));
    setIsUpdate(true);
  };

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
      <NotificationContainer/>
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
                {
                  icon: DeleteOutline,
                  tooltip: 'Xóa',
                  onClick: (event, rowData) => handleDelete(rowData)
                }
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true,
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
                      label="Tên sản phẩm"
                      margin="dense"
                      name="ItemName"
                      onChange={handleChange}
                      required
                      value={values.ItemName}
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
                      helperText=""
                      label="Mô tả"
                      margin="dense"
                      name="description"
                      onChange={handleChange}
                      required
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
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
                <Button onClick={handleAccept} color="primary" autoFocus disabled={isUpdate}>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
             {/* Dialog add */}
              <ProductAdd open={openAdd} updateParent={closeAdd} data={addData}/>
          </div>

        )}
    </div>
  );
};

export default UsersTable;
