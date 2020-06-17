import React, { useState, useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, FormControlLabel, Checkbox, Paper, Radio, RadioGroup } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
// import { importProduct } from '../../actions';
import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { addProduct } from '../../actions'
import validate from 'validate.js';
import * as XLSX from 'xlsx';
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

let schema = {
  ItemName: {
    presence: { allowEmpty: false, message: 'Tên sản phẩm không được để trống !' },
    length: {
      maximum: 64
    }
  },
  defaultprice: {
    presence: { allowEmpty: false, message: 'Giá mặc định không được để trống !' },
    length: {
      maximum: 64
    }
  },
  img: {
    presence: { allowEmpty: false, message: 'Giá mặc định không được để trống !' },
    length: {
      maximum: 64
    }
  }
};
let errors = []
const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
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
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSschedule, setIsSschedule] = useState(false);
  const [productOldNew, setProductOldNew] = useState('old');
  const [productByCate, setProductByCate] = useState({});
  const store = useStore().getState().partnerInfo;
  const { data } = useSelector(state => ({
    data: state.product.lst
  }));
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      PartnerID: store.token.user.PartnerID,
      ItemName: '',
      description: '',
      defaultprice: null,
      category: 'category000000000001'
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`category`, 'GET', {})
      setCategory(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      setIsLoading(false);
    }
  }, [category]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await callApiUnauthWithHeader(`partner/itemsbycategory/${formState.values.category}`, 'GET', {})
      setProductByCate(result.data);
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          productId: result.data[0].itemid,
          ItemName: result.data[0].itemname
        }
      }));
    };
    fetchData();
  }, [formState.values.category]);

  const handleClose = () => {
    setSchedulerDay([]);
    setFormState(formState => ({
      ...formState,
      values: {
        PartnerID: store.token.user.PartnerID,
        productId: '',
        ItemName: '',
        defaultprice: null,
        description: '',
        category: 'category000000000001',
        scheduleDay: [],
        scheduleTimeFrom: "12:00",
        scheduleTimeTo: "12:00",
        schedulePrice: null,
        scheduleAmount: null
      },
      touched: {}
    }));


    setIsSschedule(false)
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

  const handleChangeOldNew = event => {
    event.persist();
    setProductOldNew(event.target.value)
    if (event.target.value === 'new') {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          productId: '',
          ItemName: ''
        }
      }));
    } else {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          productId: productByCate[0].itemid,
          ItemName: productByCate[0].itemname
        }
      }));
    }
  };

  const dispatch = useDispatch();
  const handleChangeFile = file => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        img: file
      },
      touched: {
        ...formState.touched
      }
    }));
  };
  const handleAccept = () => {
    console.log(formState);

    dispatch(addProduct(formState.values));
    setOpen(false);
  };

  // const handleChangeFileImport = file => {
  //   dispatch(importProduct({ PartnerID: store.token.user.PartnerID, file: file.target.files[0] }))

  // };

  const changeSchedule = () => {
    setIsSschedule(!isSschedule)
  }

  const handleExport = () => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }, { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }, { s: { r: 1, c: 2 }, e: { r: 1, c: 4 } }, { s: { r: 1, c: 6 }, e: { r: 1, c: 10 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, { s: { r: 2, c: 2 }, e: { r: 2, c: 4 } }, { s: { r: 2, c: 6 }, e: { r: 2, c: 10 } },
      { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } }, { s: { r: 4, c: 2 }, e: { r: 4, c: 3 } },
    ];
    ws["!merges"] = merge;

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
  }
  useEffect(() => {
    if (isSschedule === true) {
      setSchedulerDay([]);
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
          ...formState.values,
          'scheduleDay': [],
          'scheduleTimeFrom': "12:00",
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

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {isLoading ? (
        <React.Fragment></React.Fragment>
      ) : (
          <div className={classes.row}>
            <span className={classes.spacer} />
            {/* <Link
          to={'/write.xlsx'}
          download
          target="_blank"
          className={`MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-importButton-221`}
        >
          Tải mẫu import
        </Link>
        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
           onChange={handleChangeFileImport}
          type="file"
     
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" className={classes.importButton}  >
            Import
          </Button>
        </label> */}
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              THÊM SẢN PHẨM
        </Button>
            <Button variant="contained" component="span" className={classes.importButton} onClick={handleExport} >
              Export
          </Button>
            <Dialog
              fullWidth={true}
              maxWidth={'sm'}
              scroll={'paper'}
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
                      className={classes.textField}
                      fullWidth
                      label="Loại"
                      margin="dense"
                      name="category"
                      onChange={handleChange}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      value={formState.values.category || ''}
                      variant="outlined"
                    >
                      {category.map(option => (
                        <option
                          key={option.CategoryID}
                          value={option.CategoryID}
                        >
                          {option.CategoryName}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <RadioGroup row aria-label="position" name="changenametype" onChange={handleChangeOldNew} defaultValue="old">
                      <FormControlLabel value="old" control={<Radio color="primary" />} label="Sản phẩm có sẵn" />
                      <FormControlLabel value="new" control={<Radio color="primary" />} label="Sản phẩm mới" />
                    </RadioGroup>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    {productOldNew === 'old' && productByCate.length ? (
                      <TextField
                        className={classes.textField}
                        fullWidth
                        label="Sản phẩm"
                        margin="dense"
                        name="productId"
                        onChange={handleChange}
                        required
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={formState.values.productId || ''}
                        variant="outlined"
                      >
                        {productByCate.map(option => (
                          <option
                            key={option.itemid}
                            value={option.itemid}
                          >
                            {option.itemname}
                          </option>
                        ))}
                      </TextField>
                    ) : (
                        <TextField
                          fullWidth
                          label="Tên sản phẩm"
                          error={hasError('ItemName')}
                          helperText={
                            hasError('ItemName') ? formState.errors.ItemName[0] : null
                          }
                          margin="dense"
                          name="ItemName"
                          onChange={handleChange}
                          required
                          value={formState.values.ItemName}
                          variant="outlined"
                        />

                      )}
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
                      value={formState.values.description}
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
                      label="Giá mặc định"
                      margin="dense"
                      name="defaultprice"
                      error={hasError('defaultprice')}
                      helperText={
                        hasError('defaultprice') ? formState.errors.defaultprice[0] : null
                      }
                      onChange={handleChange}
                      required
                      type="number"
                      value={formState.values.defaultprice}
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
                        required
                        className={classes.textField}
                        name="scheduleTimeFrom"
                        error={hasError('scheduleTimeFrom')}
                        helperText={
                          hasError('scheduleTimeFrom') ? formState.errors.scheduleTimeFrom[0] : null
                        }
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
                        required
                        error={hasError('scheduleTimeTo')}
                        helperText={
                          hasError('scheduleTimeTo') ? formState.errors.scheduleTimeTo[0] : null
                        }
                        name="scheduleTimeTo"
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
                <Button onClick={handleAccept} color="primary" autoFocus
                  disabled={!formState.isValid}
                >
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
