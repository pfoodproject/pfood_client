import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ListAltIcon from '@material-ui/icons/ListAlt';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalUsers = props => {
  const { rsOrderActive, rsOrderOfYear } = props;

  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Đơn hàng hiện có
            </Typography>
            <Typography variant="h3">{rsOrderActive}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ListAltIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {/* <ArrowUpwardIcon className={classes.differenceIcon} /> */}
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {rsOrderOfYear}
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            đơn hàng trong năm
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
