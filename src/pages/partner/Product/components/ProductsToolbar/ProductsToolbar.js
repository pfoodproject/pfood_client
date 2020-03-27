import React, { useState} from 'react';
import {  useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import {addProduct, importProduct} from '../../actions';
import {Link} from 'react-router-dom';
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
  dialogContent:{
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const firstUpdate = useRef(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const store = useStore().getState().partnerInfo;
  const [values, setValues] = useState({
    PartnerID: store.token.user.PartnerID,
    ItemName: '',
    description: '',
  });

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
  const handleAccept= ()=> {
    dispatch(addProduct(values));
    setOpen(false);
  };

  const handleChangeFileImport = file => {
    dispatch(importProduct({PartnerID:store.token.user.PartnerID, file:file.target.files[0]}))
    
  };
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Link
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
        </label>
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
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
