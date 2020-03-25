import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { addSourceOfItems } from '../SourceOfItems/actions';
import { DropzoneArea } from 'material-ui-dropzone'
import validate from 'validate.js';
const schema = {
  Summary: {
    presence: { allowEmpty: false, message: 'Số lượng không được để trống !' },
    length: {
      maximum: 10,
      message: ' Độ dài không hợp lệ !'
    },
    
  },
  username: {
    presence: { allowEmpty: false, message: 'Tên đăng nhập không được để trống !' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'Mật khẩu không được để trống !' },
    length: {
      maximum: 128
    }
  }
};


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

const ProductAdd = props => {
  const classes = useStyles();
    const [open, setOpen] = useState(props.open);
    const [data, setData] = useState({});
    const [formState, setFormState] = useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });

    useEffect(() => {   
      setFormState(formState => ({
        ...formState,
        values: {
          ItemID: props.data.ItemID,
          Summary:0,
          Price:1000,
          StartTime:moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
          EndTime:moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
          Description:'',
          Image:''
        }
      }))
      setOpen(props.open);      
    }, [props]);

  useEffect(() => {
    const errors = validate(formState.values, schema, {fullMessages :false});    
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleClose = ()=>{
    props.updateParent()
  }

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(addSourceOfItems(data))
    props.updateParent()
  }
  const handleChangeFile = file => {
    setData({
      ...data,
      Image: file
    })
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    
    <div>
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
                      error={hasError('Summary')}
                      helperText={
                        hasError('Summary') ? formState.errors.Summary[0] : null
                      }
                      helperText=""
                      label="Số lượng"
                      margin="dense"
                      name="Summary"
                      onChange={handleChange}
                      type="number"
                      required
                      value={formState.values.Summary}
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
                      error={hasError('price')}
                      helperText={
                        hasError('price') ? formState.errors.Price[0] : null
                      }
                      helperText=""
                      label="Giá"
                      margin="dense"
                      name="Price"
                      type="number"
                      onChange={handleChange}
                      required
                      value={data.Price}
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
                      label="Thời gian mở bán"
                      margin="dense"
                      name="StartTime"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      required
                      value={data.StartTime}
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
                      label="Thời gian kết thúc"
                      margin="dense"
                      name="EndTime"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                      required
                      value={data.EndTime}
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
                      name="Description"
                      onChange={handleChange}
                      required
                      value={data.Description}
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
                <Button onClick={handleSubmit} color="primary" autoFocus>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
};

export default ProductAdd;
