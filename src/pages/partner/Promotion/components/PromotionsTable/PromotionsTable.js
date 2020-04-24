import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

import { useStore } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';

import * as moment from 'moment';

const PromotionsTable = () => {
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Loại khuyến mãi', field: 'promotiontypename' },
    { title: 'Điều kiện khuyến mãi', field: 'conditionname' },
    { title: 'Thời gian bắt đầu', field: 'starttime', render: rowData => moment(rowData.starttime).format('hh:mm:ss DD-MM-YYYY') },
    { title: 'Thời gian kết thúc', field: 'endtime', render: rowData => moment(rowData.endtime).format('hh:mm:ss DD-MM-YYYY') },
    { title: 'Trạng thái', field: 'status' },
  ];


  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);
  const [item, setItem] = useState([]);

  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    const fetchData = async (userid) => {
      const resultItem = await callApiUnAuth(`partner/promotion/${userid}`, 'GET', [])
      console.log(resultItem);

      setItem(resultItem.data);
    };
    fetchData(store);
  }, [store]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [item]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <div>
      <NotificationContainer />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <div>
            <MaterialTable
              title="Đơn hàng"
              columns={columns}
              data={item}
              icons={tableIcons}
              options={{
                actionsColumnIndex: -1,
                // exportButton: true,
                filtering: true
              }}
            />
          </div>
        )}
    </div>
  )
};

export default PromotionsTable;
