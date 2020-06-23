import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { updatePromotion } from '../../actions';
import callApiUnAuth from '../../../../../utils/apis/apiUnAuth';
import { useStore } from 'react-redux';
// import { DropzoneArea } from 'material-ui-dropzone'
import validate from 'validate.js';
const schema = {
  condition: {
    presence: { allowEmpty: false, message: 'Số lượng không được để trống !' }
  },
  type: {
    presence: { allowEmpty: false, message: 'Giá không được để trống !' }
  },
  StartTime: {
    presence: { allowEmpty: false, message: 'Thời gian bắt đầu không được để trống !' },
    // datetime: {
    //   earliest: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
    //   message: "Thời gian bắt đầu phải lớn hơn hiện tại !"
    // }
  },
  EndTime: {
    presence: { allowEmpty: false, message: 'Thời gian kết thúc không được để trống !' },
      equality: {
        attribute: "StartTime",
        message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu !",
        comparator: function(v1, v2) {
          return (v1 > v2)
        }
      },    
  }
};


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  dialogContent: {
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
}));
let errors = [];

const PromotionEdit = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  // const [data, setData] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [pType, setPType] = useState([]);
  const [condition, setCondition] = useState([]);
  const store = useStore().getState().partnerInfo.token.user.PartnerID;

  useEffect(() => {
    const fetchData = async (userid) => {
      const resultPromotionType = await callApiUnAuth(`partner/promotiontype`, 'GET', [])
      const resultPromotionCondition = await callApiUnAuth(`partner/promotioncondition`, 'GET', [])
      setPType(resultPromotionType.data);
      setCondition(resultPromotionCondition.data);
    };
    fetchData(store);
  }, [store]);
  
  useEffect(() => {    
    setFormState(formState => ({
      ...formState,
      values: {
        promotionid: props.data.promotionid,
        type: props.data.promotiontypeid,
        condition: props.data.promotionconditionid,
        StartTime: moment(props.data.starttime).format('YYYY-MM-DDTHH:mm'),
        EndTime: moment(props.data.endtime).format('YYYY-MM-DDTHH:mm'),
      },
      isValid: false,
      touched: {},
      errors: {}
    }))
    setOpen(props.open);
  }, [props]);
  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function (value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function (value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DDTHH:mm";
      return moment.utc(value).format(format);
    }
  });

   errors = validate(formState.values, schema, { fullMessages: false });
  useEffect(() => {
    
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleClose = () => {
    props.updateParent()
  }

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    // console.log(formState.values);
    
    dispatch(updatePromotion(formState.values))
    props.updateParent()
  }


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (

    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        scroll={'body'}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Thông tin sản phẩm"}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid
            container
            spacing={3}
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
                    disabled={props.data.status==='Đang diễn ra' ? true : false}
                    value={formState.values.condition}
                    error={hasError('condition')}
                    helperText={
                      hasError('condition') ? formState.errors.condition[0] : null
                    }
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
                    disabled={props.data.status==='Đang diễn ra' ? true : false}
                    value={formState.values.type}
                    error={hasError('type')}
                    helperText={
                      hasError('type') ? formState.errors.type[0] : null
                    }
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option></option>
                    {pType.map(option => (
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
                    disabled={props.data.status==='Đang diễn ra' ? true : false}
                    error={hasError('StartTime')}
                    helperText={
                      hasError('StartTime') ? formState.errors.StartTime[0] : null
                    }
                    value={formState.values.StartTime}
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
                    error={hasError('EndTime')}
                    helperText={
                      hasError('EndTime') ? formState.errors.EndTime[0] : null
                    }
                    value={formState.values.EndTime}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus 
          //  disabled={!formState.isValid}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PromotionEdit;
