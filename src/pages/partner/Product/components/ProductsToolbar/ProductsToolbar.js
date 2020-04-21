import React, { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, FormControlLabel, Checkbox, Paper } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import { importProduct } from '../../actions';
import { callApiUnauthWithHeader } from '../../../../../utils/apis/apiUnAuth';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { addProduct } from '../../actions' 
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
  },paper: {
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

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const firstUpdate = useRef(true);
  const [schedulerDay, setSchedulerDay] = React.useState(() => []);
  const handleSchedulerDay = (event, newSchedule) => {
    console.log(newSchedule);
    
    setSchedulerDay(newSchedule);
    setValues({
      ...values,
      'scheduleDay': newSchedule
    });
  };
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSschedule, setIsSschedule] = useState(false);
  const store = useStore().getState().partnerInfo;
  const [values, setValues] = useState({
    PartnerID: store.token.user.PartnerID,
    ItemName: '',
    description: '',
    category: ''
  });
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
    setSchedulerDay([]);
    setValues({
      PartnerID: store.token.user.PartnerID,
      ItemName: '',
      description: '',
      category: '',
      scheduleDay: [],
      scheduleTimeFrom: "12:00",
      scheduleTimeTo: "12:00",
      schedulePrice: null
    })
    setIsSschedule(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const dispatch = useDispatch();
  const handleChangeFile = file => {
    setValues({
      ...values,
      img: file
    })
  };
  const handleAccept = () => {
    console.log(values);

     dispatch(addProduct(values));
    setOpen(false);
  };

  const handleChangeFileImport = file => {
    dispatch(importProduct({ PartnerID: store.token.user.PartnerID, file: file.target.files[0] }))

  };

  const changeSchedule = () => {
    setIsSschedule(!isSschedule)
    if (isSschedule === true) {
      setSchedulerDay([]);
      setValues({
        ...values,
        'scheduleDay': [],
        'scheduleTimeFrom': "12:00",
        'scheduleTimeTo': "12:00",
        'schedulePrice': null
      });
    }
  }

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
                      value={values.category || ''}
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
                        name="scheduleTimeFrom"
                        value={values.scheduleTimeFrom}
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
                        value={values.scheduleTimeTo}
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
                      helperText=""
                      label="Giá sản phẩm"
                      margin="dense"
                      name="schedulePrice"
                      onChange={handleChange}
                      disabled={!isSschedule}
                      required
                      type="number"
                      value={values.schedulePrice}
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
                <Button onClick={handleAccept} color="primary" autoFocus>
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
