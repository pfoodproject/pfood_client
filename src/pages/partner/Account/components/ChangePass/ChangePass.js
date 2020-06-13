import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Button,
  Grid,
  TextField
  // LinearProgress
} from '@material-ui/core';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import callApiUnauth from '../../../../../utils/apis/apiUnAuth';
const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const ChangePass = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const [values, setValues] = useState({});

  const store = useStore().getState().partnerInfo;
  useEffect(() => {
    setValues({
      id: store.token.user.PartnerID,
      oldPass:'',
      newPass:'',
      rePass:''
    })
  }, [store]);
  
  const handleChange = event => {
    event.persist();

    setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
    }));

  };

  const handleChangePass = async () => {    
    let rs = await callApiUnauth(`partner/changepass`,'POST', values);
    if(rs.data.type === 'fail'){
      NotificationManager.error('Error', rs.data.msg, 3000);
    }else {
      NotificationManager.success('Success', rs.data.msg, 3000);
    }
  };
  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <NotificationContainer />
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              Đổi Mật Khẩu
            </Typography>

          </div>
        </div>
        <form
        autoComplete="off"
        noValidate
      >
        <Divider />
        <CardContent>
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
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleChangePass}
          >
            Lưu
          </Button>
        </CardActions>
      </form>
      </CardContent>
      <Divider />
    </Card>
  );
};

ChangePass.propTypes = {
  className: PropTypes.string
};

export default ChangePass;
