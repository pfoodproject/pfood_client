import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StatusBullet } from '../../../../../components';
var CurrencyFormat = require('react-currency-format');
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  4: 'success',
  1: 'info',
  3: 'danger'
};

const LatestOrders = props => {
  const { rsLatestOrder } = props;

  const classes = useStyles();

  const [orders] = useState(rsLatestOrder);

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader
        // action={
        //   <Button
        //     color="primary"
        //     size="small"
        //     variant="outlined"
        //   >
        //     New entry
        //   </Button>
        // }
        title="Đơn hàng gần nhất"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Ngày đặt
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Giá trị đơn hàng</TableCell>
                  <TableCell>Trang thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.orderid}
                  >
                    <TableCell>{order.orderid}</TableCell>
                    <TableCell>{order.CustomerName}</TableCell>
                    <TableCell>
                      {moment(order.adddate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <CurrencyFormat value={order.total} displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={value =>  value } />
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.StatusID]}
                          size="sm"
                        />
                        {order.StatusName}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
