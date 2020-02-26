import React, { useState, useEffect, useRef } from 'react';
import { useStore, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { SearchInput } from '../../../../../components/index';
import { DropzoneArea } from 'material-ui-dropzone'
import {addProduct} from '../../actions';
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
  const firstUpdate = useRef(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = useState({
    PartnerID: 'partner0000000000001',
    ItemName: '',
    description: '',
    ItemImage: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
   
  // },[file])

  const handleChangeFile = file => {
    setValues({
      ...values,
      ItemImage:file[0].name
    })
  };
  const store = useStore();
  const handleAccept= ()=> {
    console.log(values);
    dispatch(addProduct(values));
  };
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
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
            {/* <DialogContentText> */}
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
            {/* </DialogContentText> */}
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
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
