<template>
  <companyNav/>
  <div class="bg">
      <br>
      <br>
      <el-row class="content">
      <el-col :span="3" :offset="3">
        <el-menu class="sidebar"
          default-active="/recruiter/authen"
          router=true
          active-text-color="#FFCAA6"
          background-color="#444076"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          >
          <el-menu-item index="/recruiter/company">
              <p style="margin: 0 auto;">
              <el-icon><User/></el-icon>
              <span>企业信息</span>
              </p>
          </el-menu-item>
          <el-menu-item index="/recruiter/authen">
              <p style="margin: 0 auto;">
              <el-icon><Postcard/></el-icon>
              <span>企业认证</span>
              </p>
          </el-menu-item>
          <el-menu-item index="/recruiter/draft">
              <p style="margin: 0 auto;">
              <el-icon><Document/></el-icon>
              <span>兼职草稿</span>
              </p>
          </el-menu-item>
          <el-menu-item index="/recruiter/message">
              <p style="margin: 0 auto;">
              <el-icon><BellFilled/></el-icon>
              <span>消息通知</span>
              </p>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="15" class="card">
          <el-header class="card_hd">
          <span class="word">企业认证</span>
          <el-button v-if="authen==null||authen.checkStatus=='未通过'" class="btn" color="#444076" @click="dialogFormVisible=true">申请</el-button>
          </el-header>
          <el-row justify="center">
              <el-form v-if="authen!=null" class="form"
                  label-position="top"
                  label-width="100px"
                  style="width:30vw; height:400px;"
              >
              <el-scrollbar>
                <el-form-item label="企业名称">
                      <el-input v-model="authen.companyName" disabled/>
                  </el-form-item>
                  <el-form-item label="企业类型">
                      <el-input v-model="authen.companyType" disabled/>
                  </el-form-item>
                  <el-form-item label="资质证号">
                      <el-input v-model="authen.companyId" disabled/>
                  </el-form-item>
                  <el-form-item label="证件照片">
                      <el-image style="width: 300px; height: 150px" :src="authen.certification" :fit="fit" />
                  </el-form-item>
                  <el-form-item label="审核状态">
                    <el-tag
                        v-if="authen.checkStatus == '未审核'"
                        disable-transitions
                    >未审核</el-tag>
                    <el-tag
                        v-if="authen.checkStatus == '已通过'"
                        type="success"
                        disable-transitions
                    >已通过</el-tag>
                    <el-tag
                        v-if="authen.checkStatus =='未通过'"
                        type="danger"
                        disable-transitions
                    >未通过</el-tag>
                  </el-form-item>
              </el-scrollbar>

              </el-form>
              <el-empty style="height:478px;" v-if="authen==null" description="您还未申请企业认证" />
          </el-row>
  
      </el-col>
      </el-row>
      <el-dialog v-model="dialogFormVisible" title="实名认证申请" align-center draggable>
        <el-form :model="authenApply">
          <el-form-item label="企业名称" label-width="70px">
              <el-input v-model="authenApply.companyName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="企业类型">
            <el-input v-model="authenApply.companyType" autocomplete="off"/>
        </el-form-item>
          <el-form-item label="资质证号" label-width="70px">
              <el-input v-model="authenApply.companyId" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="证件照片" label-width="70px">
            <el-image v-if="picDisplay" style="width: 300px; height: 150px"  fit="fit"/>
            <el-image v-if="!picDisplay" style="width: 300px; height: 150px" :src="picUrlReview" :fit="fit" />
          </el-form-item>
          <el-form-item label="&emsp;" label-width="70px">
            <el-upload class="upload"
                :show-file-list=false
                :name="'iFile'"
                limit=1
                accept=".jpg,.jpeg,.png,.gif"
                :http-request="upload"
                :on-remove="handleRemove"
            >
              <el-button color="#444076" class="btn" type="primary">上传证件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button  @click="apply">确认</el-button>
            <el-button  @click="dialogFormVisible=false">取消</el-button>
        </span>
        </template>
    </el-dialog>
  </div>
</template>

<script>
import companyNav from '@/components/companyNav.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import COS from "cos-js-sdk-v5"
import {ref} from "vue"

var cos = new COS({
    SecretId: "AKIDGOL8fy1oLbeU9aom8E3d2E8tOffQxWzG",
    SecretKey: "7yZw63j9KTXP6f22xoVwFLOFsIkDVgdM",
})

  export default {
  name: "jobhunterPerson",
  data () {
  return {
    picDisplay: true,
    dialogFormVisible:false,
    authen:null,
    authenApply:{
      recruiterId:1,
      companyId:null,
      certification:null,
      companyName:null,
      companyType:null,
    },
    uploadIcon:'https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/upload.png',
    picUrlReview:ref('https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/test.png'),
    picUrl:ref(''),
  }
  },
  methods: {
    cancel(){
        this.picDisplay=true;
    },
    upload(picture) {
        // 随机创建文件昵称
        var suffix = picture.file.name.substring(picture.file.name.lastIndexOf("."));
        var randomContent = Math.random().toString(36);
        var picName = randomContent + suffix;
        console.log(picName)
        cos.putObject({
            Bucket: 'jbgz-1312275634',
            Region: 'ap-shanghai', // 地区
            Key: picName, // 上传的文件名
            StorageClass: 'STANDARD',
            Body: picture.file, // 上传文件对象
        }, function (err, data) {
            console.log(err, data)
        })
        this.picUrl = 'https://jbgz-1312275634.cos.ap-shanghai.myqcloud.com/' + picName;
        console.log(this.picUrlReview)
        this.picDisplay=false;
        setTimeout(() => {
            this.picUrlReview = this.picUrl;
        },500)
    },
    handleRemove(){
        this.picDisplay=true;
    },
      apply(){
        this.authenApply.certification=this.picUrlReview;
          if(this.authenApply.companyId==null||this.authenApply.companyName==null||this.authenApply.certification==null||this.authenApply.companyType==null){
              ElMessage({
                  message: "不能为空",
                  type: 'error',
              })
              return;
          }
          this.$axios({
              method: 'put',
              url: '/api/recruiter/authentication',
              data: this.authenApply
          })
          .then(res => {
              console.log(res)
              if(res.data.code==200){
                ElMessage({
                    message: "申请提交成功",
                    type: 'success',
                })
                this.$router.go(0);
              }else{
                ElMessage({
                    message: "申请提交失败",
                    type: 'error',
                })
              }
          })
          .catch(function (error) {
              console.log(error);
              ElMessage.error('申请提交失败')
          })
          this.dialogFormVisible=false
      },
  },
  created() {
    this.authenApply.recruiterId=localStorage.getItem('userId')
    this.$axios({
        method: 'get',
        url: '/api/recruiter/getAuthentication/?recruiterId='+localStorage.getItem('userId'),
    })
    .then(res => {
      if(res.data.code==200){
        this.authen=res.data.data.companyauthen_list[0];
        console.log('我的实名申请'+this.authen);
      }
      else{
        this.authen=null
      }
    })
    .catch(function (error) {
        console.log(error);
    })
  },
  components: {
      companyNav,
  },
}
</script>

<style scoped>
.bg{
  background-color: rgba(255, 202, 166, 0.3);
  height: 90vh;
}
.content{
  height: 600px;
}
.sidebar{
  text-align: center;
  height: 600px;
}
.card{
  border: 1px solid #444076;
  background-color: #fff;
}
.card_hd{
  background-color: #0236641d;
  height: 80px;
  line-height: 80px;
  color: #444076;
  padding-left: 60px;
}
.card_hd .word{
  padding-left: 10px;
  color: #444076;
  border-left: 8px solid #FFCAA6;
  font-size: 20px;
}
.card_hd .btn{
  color: #fff;
  height: 30px;
  width: 80px;
  position: relative; 
  left: 74%;
}
.form{
  max-width: 460px;
  margin: 40px  0px;
}
.form .btn1{
  color: #fff;
  height: 30px;
  width: 80px;
}
.form .btn2{
  color: #444076;
  height: 30px;
  width: 80px;
  background-color: #fff;
}
.form .btn2:hover{
  color: #444076;
  height: 30px;
  width: 80px;
  background-color: #0236641d;
}

</style>