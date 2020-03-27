import axios from 'axios';
import * as Config from '../../constants/Config';


export default function callApiAuthWithHeader(endpoint, method = 'GET', header) {
  let token = JSON.parse(localStorage.getItem("session")).token;
  if (header != null) {
    header.authorization = `Bearer ${token}`;
  } else {
    header = { 'authorization': `Bearer ${token}` };
  }
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    headers: header
  }).catch(err => {
  });
}

export function callApiAuthWithBody(endpoint, method = 'GET', body) {
  let token = JSON.parse(localStorage.getItem("session")).token;
  let uc = JSON.parse(localStorage.getItem("session")).uid;
  body.uc = uc;  
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: { 'authorization': `Bearer ${token}` }
  }).catch(err => {
  });
}

export function imagesUpload(img) {
  let formData = new FormData();
  formData.append('image', img);
  return axios({
    method: 'POST',
    url: `https://api.imgur.com/3/image`,
    headers: { 'Authorization': `Bearer 691dd8ff949e07fd029571d0ce325ea44a504174` },
    data: formData
  }).catch(err => {
    console.log(err.response);
  });
}

export function importProduct(endpoint, method = 'GET', obj) {
  let formData = new FormData();  
  formData.append('file', obj.file);
  formData.append('PartnerID', obj.PartnerID);
  console.log(formData);
  
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: formData
  }).catch(err => {
    console.log(err.response);
  });
}