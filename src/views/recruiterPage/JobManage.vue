<template>
    <RecruiterNav/>
    <div class="body">
      <div class="search">
          <input v-model="search" class="text" type="text" placeholder="请输入关键词" name="search">
          <input class="button" type="button" value="搜索">
      </div>
      <el-row justify="center" style="margin-top: 10px;">
        <span class="title">兼职状态</span>
        <el-space class="select" :size="35">
          <div v-for="item in jobType" :key="item">
            <el-button v-if="currentType==item" class="type" type="info" text @click="selectType(item)">{{ item }}</el-button>
            <el-button v-if="!(currentType==item)" class="item" type="info" text @click="selectType(item)">{{ item }}</el-button>
          </div>
        </el-space>
      </el-row>
      <el-row  justify="center"
        class="job"
        v-for="item in searchResult.slice((page-1) * limit, page * limit)"
        :key="item.jobId"
      >
        <el-card class="jobList" v-if="item.jobState==currentType">
          <el-row class="item">
            <el-col :span="18" class="content">
              <h2 class="work_name">{{ item.workName }}</h2>
              <p class="work_date">{{ item.startTime }}-{{ item.endTime }}</p>
              <p class="work_place">{{ item.workPlace }}</p>
              <p class="job_type">{{item.jobType}}</p>
            </el-col>
            <el-col :span="3" style="display:flex;">
              <p class="salary">{{ item.salary }}元/天</p>
            </el-col>
            <el-col :span="3" style="display:flex;">
              <el-button v-if="item.jobState=='未发布'" color="#7A74C2" class="btn" type="primary"   @click="this.$router.push('/recruiter/draft')">去草稿箱</el-button>
              <el-button v-if="item.jobState=='已通过'||item.jobState=='已完成'||item.jobState=='已结束'" color="#7A74C2" class="btn" type="primary"   @click="jobDetail(item.jobId)">查看详情</el-button>
              <el-button v-if="item.jobState=='未审核'" color="#7A74C2" class="btn" type="primary" disabled>审核中</el-button>
              <el-button v-if="item.jobState=='未通过'||item.jobState=='已冻结'" color="#7A74C2" class="btn" type="primary"   @click="this.$router.push('/recruiter/message')">查看反馈</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
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
      <el-backtop :bottom="80">
        <div style="height: 100%;width: 100%;background-color: #444076;text-align: center;line-height: 45px;color: #FFCAA6;vertical-align: middle;border-radius: 10px;">
          <el-icon><ArrowUpBold /></el-icon>
        </div>
      </el-backtop>
    </div>
</template>
<script>
// @ is an alias to /src
import RecruiterNav from '@/components/RecruiterNav.vue'

export default {
name: 'findJob',
components: {
    RecruiterNav
},
data(){
    return{
        search:"",
        page: 1,
        limit: 6,
        total: 6,
    // jobList: [{
    //     job_id: '1',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场推广',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号广东广州番禺广州市番禺区东艺路139号广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '2',
    //     job_state:'正在工作',
    //     recuriter_id: '1',
    //     work_name: '上海市宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'上海市嘉定区曹安公路4800号',
    //     salary:'800.00'
    // }, {
    //     job_id: '3',
    //     job_state:'已完成',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '4',
    //     job_state:'其他',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '5',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '6',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '7',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '8',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '9',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '10',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '11',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }, {
    //     job_id: '12',
    //     job_state:'正在招聘',
    //     recuriter_id: '1',
    //     work_name: '广州番禺宜家家居长短期兼职',
    //     work_details: '',
    //     start_time: '2020.02.22',
    //     end_time: '2020.02.25',
    //     job_type: '市场服务',
    //     work_place:'广东广州番禺广州市番禺区东艺路139号',
    //     salary:'800.00'
    // }],
        jobList:[{}],
        currentList:[{}],
        jobType:["未发布","未审核","已通过","未通过","已冻结","已结束","已完成"],
        currentType:"未发布",
    }
},
computed:{
    searchResult(){
        if(this.search){
            return this.currentList.filter((value)=>{
            return value.workName.includes(this.search);
        });
        }else{
            return this.currentList;
        }
    }
},
created() {
    this.$axios({
      method: 'get',
      url: '/api/job/getAllJobList?recruiterId='+localStorage.getItem('userId'),
    })
    .then(res => {
      console.log(res);
      this.jobList=res.data.data.job_list
      this.currentList= this.jobList.filter((value)=>{
          return value.jobState.includes('未发布');
      });
      this.total=this.currentList.length
    })
    .catch(function (error) {
      console.log(error);
    })
},
methods: {
    handleCurrentChange(val){
    this.page=val
    },
    jobDetail(value) {
    console.log("查看详情");
    localStorage.setItem('jobDetailId',value);
    this.$router.push('/recruiter/jobDetail');
    },
    selectType(value){
      this.currentType=value;
      this.currentList= this.jobList.filter((val)=>{
          return val.jobState.includes(value);
      });
      this.total=this.currentList.length
    },
}
}
</script>

<style scoped>
.body{
    width: 100%;
    min-height: 90vh;
    background-color: rgba(255, 202, 166, 0.3);
    text-align: center;
}
.search{
    padding-top: 30px;
}
.search .text{
    line-height: 22px;
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 3px 16px;
    border-radius: 20px 0px 0px 20px;
    width: 50%;
    border: 4px solid #7A74C2;
}
.search .text:focus{
    outline: none;
}
.search .button{
    color: #fff;
    width: 60px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    border: none;
    background-color: #7A74C2;
    border-radius: 0px 20px 20px 0px;
    font-weight: 600;
}
.search .button:hover{
    cursor: pointer;
}
.select{
    width:49vw;
    background-color: #fff;
    border: 1px solid #7A74C2;
    border-radius: 5px;
    color: #a7a6ab;
    font-size: 15px;
    padding-left: 16px;
}
.select .item:focus{
    color: #7A74C2;
}
.select .item:hover{
    color: #7A74C2;
}
.select .type{
    color: #7A74C2;
}
.title{
    border-radius: 20px;
    width: 5vw;
    background-color: #7A74C2;
    height: auto;
    line-height: 4vh;
    color: #fff;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
}


.job{
    text-align: left;
}
.job .jobList{
    width: 56%;
    border-radius: 20px;
    transition: all .2s linear;
    margin: 10px 0px;
}
.job .jobList:hover{
    box-shadow: 0px 2px 8px #7A74C2;
}
.job .content{
    padding: 0px 15px;
}
.item{
    vertical-align: middle;
}
.item .work_name{
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    color: #444076;
    overflow: hidden;
}
.item .work_date{
    height: 30px;
    line-height: 30px;
    color: rgb(122, 116, 194);
}
.item .work_place{
    display: inline-block;
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow:ellipsis;
    font-size: 14px;
    color: rgba(51, 51, 51, 0.6);
    height: 30px;
    line-height: 30px;
}
.item .job_type{
    text-align: center;
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #444076;
    background-color: #FFCAA6;
    border-radius: 10px;
    font-size: 14px;
}
.item .salary{
    align-self:center;
    color: #fbb485;
    font-weight: 600;
}
.item .btn{
    color: #fff;
    font-weight: 600;
    margin-top: 4px;
    align-self:center;
}

.pagination{
    --el-color-primary: #444076;
    display: block;
    margin: 0px auto;
    margin-bottom: 50px;
}
.el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #444076;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #444076;
}
</style>