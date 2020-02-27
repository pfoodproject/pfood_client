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
  ViewColumn
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../actions';

const UsersTable = () => {
  const [columns, setColumns] = useState([
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Mô tả', field: 'description' },
  ]);


  const [data, setData] = useState([
    { ItemImage: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', ItemName: 'ok', description: 'ok', ItemID: 'items000000000000001' },
    { ItemImage: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', ItemName: 'ok1', description: 'ok1', ItemID: 'items000000000000002' },
  ]);

  const count = useSelector(state => state);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);
  useEffect(() => {
    dispatch(fetchProduct('partner0000000000001'));
  }, [dispatch]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setData(count.product.data);
    setIsLoading(false);
  }, [count]);

  const handleDelete = (rowData) =>{
    alert('Delete : ' + rowData.ItemID)
  }

  const handleEdit = (rowData) =>{
    alert('Edit : ' + rowData.ItemID)
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
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <MaterialTable
            title="Sản Phẩm"
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: Edit,
                tooltip: 'Sửa',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: DeleteOutline,
                tooltip: 'Xóa',
                onClick: (event, rowData) => handleDelete(rowData)
              }
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )}
    </div>
  );
};

export default UsersTable;
