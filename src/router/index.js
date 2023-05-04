import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'

import adminNotice from '../views/adminPage/Notice.vue'
import adminPersonAuthentication from '../views/adminPage/PersonAuthentication.vue'
import adminCompanyAuthentication from '../views/adminPage/CompanyAuthentication.vue'
import adminOrder from '../views/adminPage/Order.vue'
import adminJob from '../views/adminPage/Job.vue'
import adminJobReport from '../views/adminPage/JobReport.vue'
import adminJobType from '../views/adminPage/JobType.vue'
import adminNotification from '../views/adminPage/Notification.vue'

import jobhunterHomeView from '../views/jobhunterPage/HomeView.vue'
import jobhunterJob from '../views/jobhunterPage/Job.vue'
import jobhunterJobDetail from '../views/jobhunterPage/JobDetail.vue'
import jobhunterInfo from '../views/jobhunterPage/person/PersonInfo.vue'
import jobhunterAuthen from '../views/jobhunterPage/person/Authen.vue'
import jobhunterFavorites from '../views/jobhunterPage/person/Favorites.vue'
import jobhunterOrder from '../views/jobhunterPage/person/Order.vue'
import jobhunterMessage from '../views/jobhunterPage/person/Message.vue'
import Conversations from '../components/Conversations.vue'
import PrivateChat from '../components/PrivateChat.vue'

import recruiterHomeView from '../views/recruiterPage/HomeView.vue'
import recruiterUpJob from '../views/recruiterPage/UpJob.vue'
import recruiterJobManage from '../views/recruiterPage/JobManage.vue'
import recruiterJobDetail from '../views/recruiterPage/JobDetail.vue'
import recruiterInfo from '../views/recruiterPage/company/CompanyInfo.vue'
import recruiterAuthen from '../views/recruiterPage/company/Authen.vue'
import recruiterDraft from '../views/recruiterPage/company/Draft.vue'
import recruiterMessage from '../views/recruiterPage/company/Message.vue'

const routes = [
  {
    path: '/jobhunter',
    name: 'jobhunterHomeView',
    component: jobhunterHomeView
  },
  {
    path: '/jobhunter/job',
    name: 'jobhunterJob',
    component: jobhunterJob
  },
  {
    path: '/jobhunter/jobDetail',
    name: 'jobhunterJobDetail',
    component: jobhunterJobDetail
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/notice',
    name: 'adminNotice',
    component: adminNotice
  },
  {
    path: '/admin/personAuthentication',
    name: 'adminPersonAuthentication',
    component: adminPersonAuthentication
  },
  {
    path: '/admin/companyAuthentication',
    name: 'adminCompanyAuthentication',
    component: adminCompanyAuthentication
  },
  {
    path: '/admin/order',
    name: 'adminOrder',
    component: adminOrder
  },
  {
    path: '/admin/job',
    name: 'adminJob',
    component: adminJob
  },
  {
    path: '/admin/jobReport',
    name: 'adminJobReport',
    component: adminJobReport
  },
  {
    path: '/admin/jobType',
    name: 'adminJobType',
    component: adminJobType
  },
  {
    path: '/admin/notification',
    name: 'adminNotification',
    component: adminNotification
  },
  {
    path: '/jobhunter/person',
    name: 'jobhunterInfo',
    component: jobhunterInfo
  },
  {
    path: '/jobhunter/authen',
    name: 'jobhunterAuthen',
    component: jobhunterAuthen
  },
  {
    path: '/jobhunter/favorites',
    name: 'jobhunterFavorites',
    component: jobhunterFavorites
  },
  {
    path: '/jobhunter/order',
    name: 'jobhunterOrder',
    component: jobhunterOrder
  },
  {
    path: '/jobhunter/message',
    name: 'jobhunterMessage',
    component: jobhunterMessage,
    redirect: '/jobhunter/message/conversations',
    children: [
        {
            path: 'conversations',
            component: Conversations,
            children: [
                {
                    path: 'privatechat/:id',
                    component: PrivateChat,
                },
            ],
        },
    ],
  },
  {
    path: '/recruiter',
    name: 'recruiterHomeView',
    component: recruiterHomeView
  },
  {
    path: '/recruiter/company',
    name: 'recruiterInfo',
    component: recruiterInfo
  },
  {
    path: '/recruiter/authen',
    name: 'recruiterAuthen',
    component: recruiterAuthen
  },
  {
    path: '/recruiter/draft',
    name: 'recruiterDraft',
    component: recruiterDraft
  },
  {
    path: '/recruiter/message',
    name: 'recruiterMessage',
    component: recruiterMessage,
    redirect: '/recruiter/message/conversations',
    children: [
        {
            path: 'conversations',
            component: Conversations,
            children: [
                {
                    path: 'privatechat/:id',
                    component: PrivateChat,
                },
            ],
        },
    ],
  },
  {
    path: '/recruiter/upJob',
    name: 'recruiterUpJob',
    component: recruiterUpJob
  },
  {
    path: '/recruiter/jobManage',
    name: 'recruiterJobManage',
    component: recruiterJobManage
  },
  {
    path: '/recruiter/jobDetail',
    name: 'recruiterJobDetail',
    component: recruiterJobDetail
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
