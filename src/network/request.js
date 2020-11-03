import axios from 'axios'
// config, success, failure
export function request(config) {
  const axiosa = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //请求拦截
  // axiosa.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // }, err => {
  //   console.log(err);
  // })
  //响应式拦截
  axiosa.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  return axiosa(config)
}

