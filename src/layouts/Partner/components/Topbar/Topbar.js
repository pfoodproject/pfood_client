import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListIcon from '@material-ui/icons/List';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux';
import { signout } from '../../../../pages/partner/Account/actions'
import { useHistory } from 'react-router'
import callApiUnauth from '../../../../utils/apis/apiUnAuth';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }, typography: {
    padding: theme.spacing(2),
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();
  console.log(history);

  // const [notifications] = useState([]);
  const dispatch = useDispatch();

  const handleSignout = () => {
    localStorage.removeItem('sessionpartner');
    dispatch(signout());
    history.push('/partner/login');
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const store = useStore().getState().partnerInfo;
  useEffect(() => {
    setValues({
      id: store.token.user.PartnerID,
      oldPass:'',
      newPass:'',
      rePass:''
    })
  }, [store]);

  const [values, setValues] = useState({});
  
  const handleChange = event => {
    event.persist();

    setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
    }));

  };

  const handleOpenChangePass = event => {
    handleClose();
    setOpenChangePass(true)
  };

  const handleCloseChangePass = event => {
    setOpenChangePass(false)
  };

  

  const handleChangePass = async () => {    
    let rs = await callApiUnauth(`partner/changepass`,'POST', values);
    if(rs.data.type === 'fail'){
      NotificationManager.error('Error', rs.data.msg, 3000);
    }else {
      NotificationManager.success('Success', rs.data.msg, 3000);
      handleCloseChangePass();
    }
  };

  const open = Boolean(anchorEl);
  const [openChangePass, setOpenChangePass] = useState(false);
  const id = open ? 'simple-popover' : undefined;
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <NotificationContainer />
      <Toolbar>
        <RouterLink to="/partner">
          <img
            alt="Logo"
            src="/images/fork.png" style={{ height: '36px', display: 'flex' }}
          />
        </RouterLink>
        <RouterLink to="/partner" style={{ textDecoration: 'none' }}>
          <p style={{ marginLeft: '10px', color: 'white', fontWeight: 500, fontFamily: 'cursive' }}>Pfood</p>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {/* <IconButton
            className={classes.signOutButton}
            onClick={handleSignout}
            color="inherit"
          >
            <InputIcon />
          </IconButton> */}
          <IconButton aria-describedby={id} variant="contained" color="inherit" onClick={handleClick}>
            <ListIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Grid container style={{ display: 'block' }}>
              <Grid item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
                <Button
                  color="secondary"
                  className={classes.signOutButton}
                  onClick={handleOpenChangePass}
                  startIcon={<VpnKeyIcon />}
                >
                  Đổi mật khẩu
                </Button>
              </Grid>
              <Grid item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
                <Button
                  className={classes.signOutButton}
                  onClick={handleSignout}
                  color="secondary"
                  startIcon={<InputIcon />}
                >
                  Đăng xuất
            </Button>
              </Grid>
            </Grid>
          </Popover>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            scroll={'body'}
            open={openChangePass}
            onClose={handleClose}
            
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title" color="primary">{"Đổi mật khẩu"}</DialogTitle>
            <DialogContent style={{overflowY:'initial'}}>
              <Grid
                container
                spacing={2}
              >
                <form
                  autoComplete="off"
                  noValidate
                >
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
                        label="Mật khẩu cũ"
                        margin="dense"
                        name="oldPass"
                        onChange={handleChange}
                        required
                        type='password'
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
                        label="Mật khẩu mới"
                        margin="dense"
                        name="newPass"
                        onChange={handleChange}
                        required
                        type='password'
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
                        label="Nhập lại mật khẩu"
                        margin="dense"
                        name="rePass"
                        onChange={handleChange}
                        required
                        type='password'
                        variant="outlined"
                      />
                    </Grid>

                  </Grid>
                  {/* <Button
                    color="primary"
                    variant="contained"
                    onClick={handleChangePass}
                  >
                    Lưu
          </Button> */}
                </form>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseChangePass} color="primary">
                Huỷ
          </Button>
              <Button onClick={handleChangePass} color="primary" autoFocus
              >
                Xác nhận
          </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
