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
import { Grid, TextField, Button } from '@material-ui/core';
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const ItemsTable = () => {
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'ItemName' },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);
  const store = useStore().getState().partnerInfo.token.user.PartnerID;
  useEffect(() => {
    const fetchData = async (userid) => {
      const resultItem = await callApiUnAuth(`partner/promotionproductadd/${userid}`, 'GET', [])
      const resultPromotionType = await callApiUnAuth(`partner/promotiontype`, 'GET', [])
      const resultPromotionCondition = await callApiUnAuth(`partner/promotioncondition`, 'GET', [])
      setItem(resultItem.data);
      setType(resultPromotionType.data);
      setCondition(resultPromotionCondition.data);
    };
    fetchData(store);
  }, [store]);

  const [item, setItem] = useState([]);
  const [type, setType] = useState([]);
  const [condition, setCondition] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState({
    item: [],
    type: null,
    condition: null,
    StartTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
    EndTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
  });
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsLoading(false);
  }, [item]);

  const handleChange = event => {

    setData(oldData => ({
      ...oldData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    const rs = await callApiUnAuth(`partner/promotion`, 'POST', data);
    if(rs.data.type=='success'){
      const resultItem = await callApiUnAuth(`partner/promotionproductadd/${store}`, 'GET', [])
      setItem(resultItem.data);
      NotificationManager.success(rs.data.type, rs.data.msg, 3000);
    } else {
      NotificationManager.success('fail', 'Ko thành công', 3000);
    }
    
    setIsCreating(false);
  }

  const itemchecked = (rows) => {
    setData(oldData => ({
      ...oldData,
      item: rows.map(e => e.ItemID)
    }));
    
  }
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
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={8}
              xs={8}>
              <MaterialTable
                title="Sản Phẩm"
                columns={columns}
                data={item}
                icons={tableIcons}
                options={{
                  selection: true
                }}
                onSelectionChange={(rows) =>itemchecked(rows)}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={4}>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  item
                  md={12}
                  xs={12}>
                  <TextField
                    fullWidth
                    label="Điều kiện áp dụng"
                    margin="dense"
                    name="condition"
                    onChange={handleChange}
                    required
                    select

                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option></option>
                    {condition.map(option => (
                      <option
                        key={option.conditionid}
                        value={option.conditionid}
                      >
                        {option.conditionname}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}>
                  <TextField
                    fullWidth
                    label="Chính sách khuyến mãi"
                    margin="dense"
                    name="type"
                    onChange={handleChange}
                    required
                    select

                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option></option>
                    {type.map(option => (
                      <option
                        key={option.promotiontypeid}
                        value={option.promotiontypeid}
                      >
                        {option.promotiontypename}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Thời gian bắt đầu"
                    margin="dense"
                    name="StartTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.StartTime}
                    onChange={handleChange}
                    required
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
                    label="Thời gian kết thúc"
                    margin="dense"
                    name="EndTime"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={data.EndTime}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus disabled={isCreating}>
                   Tạo khuyến mãi
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        )}
    </div>
  );
};

export default ItemsTable;
