import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect:'/front/index'
  },
  {
    path: '/front/index',
    name: 'frontIndex',
    component: ()=>import('../views/front/IndexView')
  },
  {
    path: '/front/register',
    name: 'frontRegister',
    component:()=>import('../views/front/registerView')
  },
  {
    path: '/front/wsgh',
    name: 'frontWsgh',
    component:()=>import('../views/front/wsghView')
  },
  {
    path: '/front/login',
    name: 'frontLogin',
    component:()=>import('../views/front/loginView')
  },
  {
    path: '/front/ghcx',
    name: 'frontGhcx',
    component:()=>import('../views/front/ghcxView')
  },
  {
    path: '/admin',
    redirect: '/admin/index'
  },
  {
    path: '/admin/index',
    name: 'adminIndex',
    component:()=>import('../views/admin/indexView')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component:()=>import('../views/admin/adminLoginView')
  },
  {
    path:'/doctor/login',
    name:'doctorLogin',
    component:()=>import('../views/admin/doctorLoginView')
    },
  {
    path: '/doctor/index',
    name: 'doctorIndex',
    component:()=>import('../views/admin/doctorView')
  },
  {
    path: '/doctor/info',
    component:()=>import('../views/admin/DoctorInfoView')
  },
  {
    path: '/doctor/patient',
    component:()=>import('../views/admin/patientView')
  },
  {
    path: '/doctor/inrecord',
    component:()=>import('../views/admin/insertrecord')
  },
  {
    path: '/doctor/updaterecord',
    component:()=>import('../views/admin/updaterecord')
  },
  {
    path: '/doctor/updaterecor',
    component:()=>import('../views/admin/updaterecor')
  },
  {
    path:'/admin/login',
    name:'adminLogin',
    component:()=>import('../views/admin/adminLoginView')
  },
  {
    path: '/admins/index',
    name: 'adminsIndex',
    component:()=>import('../views/admin/adminView')
  },
  {
    path: '/admins/adddoctor',
    component:()=>import('../views/admin/adddoctor')
  },
  {
    path: '/admins/showdoctor',
    component:()=>import('../views/admin/showdoctor')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
// const whiteList=['/','/front/index','/front/register','/front/wsgh','/front/ghcx','/admin/','/admin/login','/admin/index',
//   '/admins/index','/admins/adddoctor','/doctor/login'
// ,'/admins/showdoctor']
// router.beforeEach(
//     (to, from, next) => {
//       if (whiteList.includes(to.path)){
//         next();
//       }else {
//         let token = localStorage.getItem("token");
//         if (token!=null){
//           axios({
//             url:'http://localhost:9090/doctor/checkToken',
//             method:'get',
//             headers:{
//               token:token
//             }
//           }).then(result => {
//             console.log(result.data);
//             if (result.data.code==='200'){
//               next();
//             }
//             if (result.data.code==='400'){
//               alert("登录信息失效，请重新登录");
//               window.location.reload();
//               localStorage.removeItem("token");
//             }
//           })
//         }else {
//           next("/doctor/login")
//         }
//       }
//     })
export default router
