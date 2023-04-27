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
          <el-button v-if="authen==null" class="btn" color="#444076" @click="dialogFormVisible=true">申请</el-button>
          </el-header>
          <el-row justify="center">
          <!-- <el-col class="userPhoto" :span="8">
              <el-avatar :size="100" fit="cover" :src="userInfo.headportrait" />
              <el-upload>
              <el-button color="#444076" class="btn" type="primary">修改头像</el-button>
              </el-upload>
              <el-button color="#444076" class="btn" type="primary" @click="display=true">修改密码</el-button>
          </el-col> -->
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
                    <el-tag>{{ authen.checkStatus }}</el-tag>
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
            <el-image style="width: 300px; height: 150px" :src="authenApply.certification" :fit="fit" />
          </el-form-item>
          <el-form-item label="&emsp;" label-width="70px">
            <el-upload>
              <el-button color="#444076" class="btn" type="primary" @click="authenApply.certification='http://dummyimage.com/400x400'">上传证件</el-button>
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

  export default {
  name: "jobhunterPerson",
  data () {
  return {
    dialogFormVisible:false,
    // authen:{
    //   applyId:1,
    //   companyName:"四川爱慕聚优网络技术有限公司",
    //   recruiterId:1,
    //   applyTime:"2019-06-05 13:53:42",
    //   companyType:'公办',
    //   companyId:"620403111122223333",
    //   certification:"http://dummyimage.com/400x400",
    //   checkStatus:"未审核",
    //   checkTime:null,
    //   result:null
    // },
    authen:null,
    authenApply:{
      recruiterId:1,
      companyId:null,
      certification:null,
      companyName:null,
      companyType:null,
    }
  }
  },
  methods: {
      apply(){
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
      // this.$axios({
      //     method: 'get',
      //     url: ''+localStorage.getItem('userId'),
      // })
      // .then(res => {
        // if(resizeBy.data.code==200){
        //     console.log(res.data.data);
        //     this.authen=res.data.data.personauthen_list[0];
        // }
        // else{
        //   this.authen=null
        // }
      // })
      // .catch(function (error) {
      //     console.log(error);
      // })
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