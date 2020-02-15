import React, { Component } from 'react';
import { checkLogin } from './actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  

  render() {
    
    return (
        <div>
            <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={5}
              data={data}
              defaultPageSize={5}
              columns={[{
                header: 'Name',
                accessor: 'name' // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
              }, {
                header: 'Age',
                accessor: 'age',
              }, {
                id: 'friendName', // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
                header: 'Friend Name',
                accessor: d => d.friend.name // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
              }, {
                header: props => <span>Friend Age</span>, // Tùy biến component Header
                accessor: 'friend.age' // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
              }]}
            />
        </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    state
  }
}


export default withRouter(connect(mapStateToProps)(LoginPage));
