//封装axios
function axios({url,method,params,data}){
  let queryStr = '';
  Object.keys(params).forEach(key =>{
    queryStr += `${key}=${params[key]}&`
  })
  if (queryStr){
    queryStr = queryStr.substring(0,queryStr,length-1)
    url += '?' + queryStr
  }
  data = JSON.stringify(data);

  return new Promise((resolve,reject)=>{
    const xhr = XMLHttpRequest();
    xhr.open(method,url,true)
    if(method ==='POST' || method==='PUT' || method==='DELETE'){
      xhr.send(data)
    } else {
      xhr.send()
    }
    xhr.onreadystatechange = () =>{
      const {readyState, status, statusText} = xhr
      if (readyState !==4 ) return
      if (status >= 200 && status <=299){
        const response = {
          data:JSON.parse(xhr.response),
          status,
          statusText
        }
        resolve(response)
      } else{
        reject(new Error('request error status is'+ status))
      }
    }
    axios.get = function(url,config){
      return axios(Object.assign({url},config))
    }
    axios.post = function(url,data,config){
      return axios(Object, assign({url, data},config))
    }
  })
}

//使用axios.defaults.baseURL
axios.defaults.baseURL ='http://localhost:3000'
function testGet(){
  //axios.get('/posts',{}).then()
  axios({
    method: 'GET',
    // url:'http://localhost:3000/posts',
    url:'/posts',
    params:{
      id:2
    }
  }).then(
    response =>{
      console.log(response.data,response.status,response.statusText)
    },
    error =>{
      alert(error.message)
    }
  )
}

function testPost(){
  // axios({
  //   method:'POST',
  //   url:'/posts',
  //   data:{
  //     title:'first',
  //     author:'andy',
  //   }
  // })
  axios.post('/posts',{"title":'first',"author":'andy'}).then(
    response =>{
      console.log(response.data,response.status,response.statusText)
    },
    error =>{
      alert(error.message)
    }
  )
}

function testPut(){
  axios({
    method:'PUT',
    url:'/posts/2',
    data:{
      title:'second put',
      author:'andy',
    }
  }).then(response=>{
    console.log(response.data,response.status,response.statusText)
  },
  error => alert(err.message)
  )
}
function testDelete () {
  axios({ // 配置对象: 属性名是一些特定名称
    method: 'DELETE',
    url: '/posts/2'
  }).then(
    response => {
      console.log(response.data, response.status, response.statusText)
    },
    error => {
      alert(error.message)
    }
  )
}

//if there are more than one localhost, we use "const instance = axios.create()"

axios.defaults.baseURL = 'http:localhost:3000';
axios({
  url:'/posts' // request for 3000
})

const instance = axios.create({
  baseURL:'http://localhost:4000',
  timeout:1000,
})
instance.get('/posts')// request for 4000

//拦截器
axios.interceptors.request.use(
  config => {
    console.log('request 1');
    return config
  },
  error => {
    console.log('request error 1');
    return Promise.reject(error)
  }
)
//响应器
axios.interceptors.response.use(
  response => {
    console.log('response 1');
    return response
  },
  error => {
    console.log('response error');
    return Promise.reject(error)
  }
)
axios.defaults.baseURL('http:localhost:3000')
axios.get('/posts').then(
  response => console.log('data',response.data)
).catch(error => console.log('error',error.message))

//取消请求
let cannel
function getProducts(){
  axios({
    url:'http://localhost:4000/posts',
    cancelToken:new axios.CancelToken((c) =>{
      cancel = c
    })
  }).then(
    response =>{
      cancel = null
      console.log('requies 1 is success',reponse.data)
    },
    error => {
      cancel = null
      console.log('this is fail',error.message,error)
    }
  )
}
function cancelReq(){
  if(typeof cancel =='function'){
    cancel('cancel require')
  } else{
    console.log('not cancel')
  }
}

//封装axios基本操作

// 1). 统一进行请求配置
// 2). 请求过程中loading提示
// 3). 请求体参数以urlencoded形式传递
// 4). 请求成功的value不再是response, 而是response.data
// 5). 请求失败统一进行提示处理, 每个请求不需要单独处理

const instance = axios.create({
  baseURl = 'http://localhost:4000',
  timeout:15000
})
//添加拦截器
instance.interceptors.request.use((config)=>{
  NProgress.start()

  if(config.data instanceof Object){
    config.data = Qs.stringify(config.data)
  }
  return config
})
//添加响应式拦截器
instance.interceptors.response.use(
  response =>{
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    alert('the response is fail',error.message)
    return new Promise(()=>{})
  }
)

//调用上面封装的axios
function getPosts(){
  instance.get('/posts').then(
    value => console.table(result.data),
    error => alert(error.message)
  )
}
// function addPost(){
//   instance.post('/pists1').then(
//     value => console.table(result.data),
//     reason =>alert(reason.message)
//   )
// }
async function addPost(){
  const value = await instance.post('/post1',{title:'newTitle',author:'newAuthor'})
  console.table(value.data)
}