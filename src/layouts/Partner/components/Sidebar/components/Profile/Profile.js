import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import callApiUnAuth from '../../../../../../utils/apis/apiUnAuth';
import { useStore, useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [user, setUser] = useState({
    PartnerName: 'Anonymous',
    CityName: 'Locate',
    PartnerImage: '/images/avatars/avatar_11.png',
  });
  // useEffect(() => {
  //   const partner = JSON.parse(localStorage.getItem('regPartner'));
  //   const fetchData = async () => callApiUnAuth(`partner/${partner.user.CustomerID}`, 'GET', {})
  //     .then(res => setUser(res.data[0]));
  //     fetchData();
  // }, []);
  const firstUpdate = useRef(true);
  const store = useStore().partnerInfo;
  useEffect(() => {
    setUser({
      PartnerName: store.token.user.PartnerName,
      CityName: store.token.user.CityName,
      PartnerImage: store.token.user.PartnerImage,
    })
  }, [store]);

  // const store2 = useSelector(state => state).partnerInfo;
 
  // useEffect(() => {

  //   setUser({
  //     PartnerName: store2 ? store2.token.user.PartnerName : 'Anonymous',
  //     CityName: store2 ? store2.token.user.CityName : 'Locate',
  //     PartnerImage: store2 ? store2.token.user.PartnerImage : '/images/avatars/avatar_11.png',
  //   })
  // }, [store2]);
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.PartnerImage}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.PartnerName}
      </Typography>
      <Typography variant="body2">{user.CityName}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
