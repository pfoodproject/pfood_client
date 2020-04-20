import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux';
import {signout} from '../../../../pages/partner/Account/actions'
import { useHistory } from 'react-router'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  
  const classes = useStyles();
  let history = useHistory();
  console.log(history);
  
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  
  const handleSignout = () => {
    localStorage.removeItem('sessionpartner');
    dispatch(signout());
    history.push('/partner/login');
  }
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/partner">
          <img
            alt="Logo"
            src="/images/fork.png" style={{height:'36px', display:'flex'}}
          />
        </RouterLink>
        <RouterLink to="/partner" style={{textDecoration:'none'}}>
          <p style={{marginLeft:'10px', color:'white',fontWeight: 500, fontFamily: 'cursive'}}>Pfood</p>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            onClick={handleSignout}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
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
