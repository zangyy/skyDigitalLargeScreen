import axios from "axios";
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// axios拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (!localStorage.accessToken) {
      window.location.href='/login'
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
const getBuildingsData = (params:object)=> {
  return axios({
    url: '/LargeScreenDisplay/SingleBuilding/GetBuildingsDataByPid',
    method: 'get',
    params
  })
}

const getBuildingBlock = (params:object)=> {
  return axios({
    url: '/LargeScreenDisplay/Parcel/GetBuildingsBeamColumnsSchedule',
    method: 'get',
    params
  })
}
const getBlockPlan = (params:object)=> {
  return axios({
    url: '/LargeScreenDisplay/Parcel/GetProjectPlanNumber',
    method: 'get',
    params
  })
}
const getImg = (params:object)=> {
  return axios({
    url: '/LargeScreenDisplay/Parcel/GetLargeScreenPhoto',
    method: 'get',
    params
  })
}
export {
  getBuildingsData,
  getBuildingBlock,
  getBlockPlan,
  getImg
}