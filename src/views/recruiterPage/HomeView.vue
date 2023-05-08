<template>
  <div class="head">
    <RecruiterNav/>
    <div class="head_bg">
      <div class="btn">
        <router-link to="/recruiter/upJob"><el-button style="height:40px;width:150px;font-size: 18px;background: #fff;margin-right: 20vw;color: #7A74C2;margin-top: 50px;" color="#444076" type="primary" round>发布兼职</el-button></router-link>
        &emsp;&emsp;
      </div>
      <img class="logo" src="../../assets/logo2.svg" alt="logo">
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
            <p class="announceTime">{{ item.announceTime }}</p>
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
import RecruiterNav from '@/components/RecruiterNav.vue'

export default {
  name: 'HomeView',
  components: {
    RecruiterNav,
    ArrowUpBold,
  },
  data () {
  return {
    page: 1,
    limit: 3,
    total: 6,
    noticeList: [{}]
  }
  },
  methods: {
    handleCurrentChange(val){
      this.page=val
    },
  },
  created() {
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

  .noticeList .noticeImg{
    width: 16vw;
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
