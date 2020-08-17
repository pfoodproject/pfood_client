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
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { fetchSourceOfItems } from './actions';
import moment from 'moment';

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
    overflowX: 'hidden'
  }, paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
  },
  textField: {
    width: '100%'
  }
}));

const ItemsTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, height: 40, borderRadius: '50%' }} />, filtering: false },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Mô tả', field: 'Description', filtering: false },
    { title: 'Số lượng', field: 'Summary', filtering: false },
    { title: 'Giá', field: 'Price', filtering: false },
    { title: 'Thời gian mở bán', field: 'StartTime', render: rowData => moment(rowData.StartTime).utcOffset(rowData.StartTime).format('DD-MM-YYYY hh:mm'), filtering: false },
    { title: 'Thời gian kết thúc', field: 'EndTime', render: rowData => moment(rowData.EndTime).utcOffset(rowData.EndTime).format('DD-MM-YYYY hh:mm'), filtering: false },
    { title: 'Lượt xem', field: 'view', filtering: false },
  ];
  // const [data, setData] = useState([]);
  // const count = useSelector(state => state);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    starttime: null,
    endtime: null
  });
  const firstUpdate = useRef(true);
  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    dispatch(fetchSourceOfItems({partnerId: store}));
  }, [dispatch, store]);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   setData(count.sourceOfItems.data);
  //   setIsLoading(false);
  // }, [count]);

  const { data } = useSelector(state => ({
    data: state.sourceOfItems.lst,
  }));

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [data]);

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleAccept = () => {
    // console.log(formState);
    dispatch(fetchSourceOfItems({partnerId: store, starttime: values.starttime, endtime: values.endtime}));
    // dispatch(addProduct(formState.values));
    // setOpen(false);
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
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item container
                lg={6}
                md={6}
                xl={6}
                xs={6}
                spacing={3}
              >
                <Grid item
                  lg={6}
                  md={6}
                  xl={6}
                  xs={6}
                >
                  <TextField
                    id="time"
                    label="Thời gian từ"
                    type="datetime-local"
                    required
                    className={classes.textField}
                    name="starttime"
                    value={values.starttime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item
                  lg={6}
                  md={6}
                  xl={6}
                  xs={6}
                >
                  <TextField
                    id="time"
                    label="Thời gian đến"
                    type="datetime-local"
                    defaultValue="00:00"
                    required
                    className={classes.textField}
                    name="endtime"
                    value={values.endtime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item
                lg={6}
                md={6}
                xl={6}
                xs={6}
                style={{ margin: 'auto' }}
              >
                <Button onClick={handleAccept} color="primary"
                  variant="contained"
                //  disabled={isUpdate || !formState.isValid} 
                >
                  Tìm kiếm
          </Button>
              </Grid>
            </Grid>
            <div>
              <MaterialTable
                title="Sản Phẩm"
                columns={columns}
                data={data}
                icons={tableIcons}
                options={{
                  filtering: true
                }}
              />
            </div>
          </React.Fragment>

        )}
    </div>
  );
};

export default ItemsTable;
