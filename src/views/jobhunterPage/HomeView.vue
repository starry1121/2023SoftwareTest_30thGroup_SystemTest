<template>
  <div class="head">
    <Nav/>
    <div class="head_bg">
      <div class="btn">
        <router-link to="/jobhunter/job"><el-button style="height:40px;width:150px;font-size: 18px;margin-right: 20vw;margin-top: 50px;" color="#7A74C2" type="primary" round>寻找兼职</el-button></router-link>
        &emsp;&emsp;
      </div>
      <img class="logo" src="../../assets/logo2.svg" alt="logo">
    </div>
  </div>
  <div class="job">
    <div class="job_hd">
      <img class="img" src="../../assets/title.png" alt="title">
    </div>
    <div class="job_bd">
      <el-row justify="space-evenly">
        <el-col
          v-for="item in jobList.slice(0,6)"
          :key="item.job_id"
          :span="7"
        >
        <el-card class="jobList">
          <div class="content" style="padding: 14px">
            <el-scrollbar height="112px">
              <h2 class="work_name">{{ item.workName }}</h2>
              <p class="work-date">{{ item.startTime }}至{{ item.endTime }}&emsp;&emsp;&emsp;&emsp;{{ item.salary }}/天</p>
              <p class="work_place">{{ item.workPlace }}</p>
            </el-scrollbar>
            <h5 class="job_type">{{item.jobType}}</h5>
          </div>
          <div class="review" @click="jobDetail(item.jobId)">
            查看详情
          </div>
        </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="notice">
    <div class="notice_hd">
      <img class="img" src="../../assets/title2.png" alt="title">
    </div>
    <div class="notice_bd">
      <el-row :gutter="20">
        <el-col :span="3"></el-col>
        <el-col
          v-for="item in noticeList.slice((page-1) * limit, page * limit)"
          :key="item.job_id"
          :span="6"
        >
        <el-card class="noticeList">
          <div style="padding: 10px">
            <el-image style="width: 300px; height: 240px" :src="item.imgURL" fit="fit" alt="公告img"/>
            <h2 class="noticeTitle">{{ item.title }}</h2>
            <p class="announceTime">{{ item.announceTime}}</p>
            <el-button color="#7A74C2" class="btn" type="primary"  @click="item.drawer = true">查看详情</el-button>
            <!-- <p class="noticeContent">{{ item.content }}</p> -->
          </div>
        </el-card>
        <el-drawer class="drawer"
          :append-to-body="true"
          size="31%"
          :lock-scroll="true"
          :close-on-click-modal="true"
          v-model="item.drawer" 
          :title="item.title" 
          :with-header="true"
        >
          <div class="drawer">
            <span class="announceTime">{{ item.announceTime }}</span>
            <el-image style="width: 400px; height: 300px" :src="item.imgURL" fit="fit" alt="公告img"/>
            <p v-html="item.content"></p>
          </div>
        </el-drawer>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <div class="pagination">
            <div class="pagination_style">&emsp;</div>
            <el-pagination
              :current-page="page"
              :page-size="limit"
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-row>
      </div>
    </div>
  </div>
  <div style="height: 70px;background-color: #444076;text-align: center;">
    <img style="height: 65px;" alt="logo" src="../../assets/logo.png">
  </div>
  <el-backtop :bottom="100">
    <div style="height: 100%;width: 100%;background-color: #444076;text-align: center;line-height: 45px;color: #FFCAA6;vertical-align: middle;border-radius: 10px;">
      <el-icon><ArrowUpBold /></el-icon>
    </div>
  </el-backtop>
</template>

<script>
// @ is an alias to /src
import { ArrowUpBold } from "@element-plus/icons-vue";
import Nav from '@/components/Nav.vue'

export default {
  name: 'HomeView',
  components: {
    Nav,
    ArrowUpBold,
  },
  data () {
  return {
    page: 1,
    limit: 3,
    total: 6,
    jobList:[{}],
    noticeList: [{}]
  }
  },
  methods: {
    jobDetail(value) {
      console.log("查看详情");
      localStorage.setItem('jobDetailId',value);
      this.$router.push('/jobhunter/jobDetail');
    },
    handleCurrentChange(val){
      this.page=val
    },
  },
  created() {
    //兼职列表
    this.$axios({
      method: 'get',
      url: '/api/job/getJobList?jobId=-1',
    })
    .then(res => {
      console.log(res);
      this.jobList=res.data.data.job_list
      console.log(this.jobList)
    })
    .catch(function (error) {
      console.log(error);
    })
    this.$axios({
        method: 'get',
        url: '/api/admin/getNoticeList/?status=已发布',
    })
    .then(res => {
        if(res.data.code==200){
            this.noticeList=res.data.data.notice_list;
            this.total=this.noticeList.length;
            console.log('公告列表'+this.noticeList);
        }
        else{
            this.pubnotList=null
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  },
}
</script>

<style scoped>
  .head{
    background-image: url("../../assets/bg.png");
    height: 762px;
    background-size:cover;
    background-position:center center;
  }
  .head_bg{
    text-align: center;
    padding-top: 70px;
  }
  .head_bg .logo{
    display: inline;
    width: 600px;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    vertical-align: middle;
  }
  .head_bg .logo:hover{
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
  .head_bg .btn{
    /* position: relative;
    bottom: 36vh;
    left: 6vw; */
    display: inline;
    vertical-align: middle;
    padding-right: 250px;
  }
  .job{
    width: 100%;
    height: auto;
    background-color: rgba(255, 202, 166, 0.3);
    padding-top: 50px;
  }
  .job_hd{
    height: 50px;
    text-align: center;
    margin-bottom: 30px;
  }
  .job_hd .img{
    width: 180px;
  }
  .job_bd{
    margin: 0 auto;
  }
  .jobList{
    text-align: center;
    margin-bottom: 50px;
    border-radius: 20px;
    height: 229px;
  }

  .jobList .content{
    width: auto;
  }


  .jobList .btn{
    font-weight: 600;
    margin-top: 20px;
    color: #fff;
    height: 30px;
    width: 120px;
  }
  .work_name{
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    color: #444076;
    overflow: hidden;
  }
  .work-date{
    height: 50px;
    line-height: 50px;
    color: rgb(122, 116, 194);
  }
  .work_place{
    color: rgba(51, 51, 51, 0.6);
  }
  .job_type{
    margin: 20px auto;
    width: 120px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    background-color: #7A74C2;
    color:#fff;
    border-radius: 5px;
  }
  .review {
    color: #fff;
    background-color: #7A74C2;
    font-weight: 600;
    position: relative;
    top: -78px;
    height: 80px;
    line-height: 80px;
    margin: 0px -20px;
    opacity: 0;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
  }

  .jobList:hover .review{
    opacity: 1;
    cursor: pointer;
  }
  .notice{
    width: 100%;
    height: auto;
    background-color: rgba(122, 116, 194, 0.2);
    padding-top: 50px;
  }
  .notice_hd{
    height: 50px;
    text-align: center;
    margin-bottom: 30px;
  }
  .notice_hd .img{
    width: 180px;
  }
  .noticeList{
    text-align: center;
    margin-bottom: 50px;
    border-radius: 20px;
    height: 410px;
  }

  .noticeList .noticeTitle{
    color: #444076;
    font-size: 22px;
    height: 40px;
    line-height: 40px;
  }
  .announceTime{
    color: #7A74C2;
    height: 30px;
    line-height: 30px;
  }
  .noticeList .btn{
    color: #fff;
    font-weight: 600;
    margin-top: 4px;
  }
  .drawer{
    text-align: center;
  }
  .pagination{
    --el-color-primary: #7A74C2;
    display: block;
    margin: 0px auto;
    margin-bottom: 50px;
  }
  .el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #7A74C2;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #7A74C2;
  }
</style>
