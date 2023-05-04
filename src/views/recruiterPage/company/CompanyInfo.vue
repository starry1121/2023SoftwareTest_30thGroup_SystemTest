<template>
    <companyNav/> 
    <div class="bg">
        <br>
        <br>
        <el-row class="content">
        <el-col :span="3" :offset="3">
            <el-menu class="sidebar"
            default-active="/recruiter/company"
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
            <span class="word">企业信息</span>
            <el-button class="btn" color="#444076" @click="edit">编辑</el-button>
            </el-header>
            <el-row>
            <el-col class="userPhoto" :span="8">
                <el-avatar v-if="picDisplay" :size="100" fit="cover" :src="userInfo.headportrait" />
                <el-avatar v-if="!picDisplay" :size="100" fit="cover" :src="picUrlReview" />
                <div class="home">
                    <el-upload class="upload"
                        :show-file-list=false
                        :name="'iFile'"
                        limit=1
                        accept=".jpg,.jpeg,.png,.gif"
                        :http-request="upload"
                        :on-remove="handleRemove"
                    >
                        <el-button v-if="picDisplay" color="#444076" class="btn" type="primary">上传头像</el-button>
                    </el-upload>
                    <el-button v-if="!picDisplay" type="success" circle  @click="submit"><el-icon><Select /></el-icon></el-button>
                    <el-button v-if="!picDisplay" type="danger" circle  @click="cancel"><el-icon><CloseBold /></el-icon></el-button>
                </div>
                <el-button color="#444076" class="btn" type="primary" @click="display=true">修改密码</el-button>
            </el-col>
            <el-col :span="14">
                <el-scrollbar max-height="500px">
                <el-form v-if="!display" class="form"
                    label-position="top"
                    label-width="100px"
                >
                    <el-form-item label="UID">
                        <el-input v-model="recruiterId" disabled/>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userInfo.email" disabled/>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.nickname" :disabled="input_show"/>
                    </el-form-item>
                    <el-form-item label="企业名称">
                        <el-input v-model="userInfo.companyName" :disabled="input_show"/>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="userInfo.contactMethod" :disabled="input_show"/>
                    </el-form-item>
                    <el-form-item label="企业简介">
                        <el-input v-model="userInfo.introduction" type="textarea" :rows="2" :disabled="input_show"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="btn_show" class="btn1" type="primary" color="#444076" @click="onSubmit">保存</el-button>
                        <el-button v-if="btn_show" :v-show="btn_show" class="btn2" color="#444076" @click="cancelEdit">取消</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="display" class="form"
                    label-position="top"
                    label-width="100px"
                    style="margin-top:63px;"
                >
                    <el-form-item label="邮箱&emsp;" :label-width="formLabelWidth">
                        <el-input v-model="findPWD.email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item class="input" label="验证码">
                        <el-input
                            v-model="confirmCaptcha"
                            class="input-with-select"
                            @change="isCaptcha"
                        >
                            <template #append>
                                <el-button type="primary" color="#444076" @click="getfindPWDCaptcha">获取验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input v-model="findPWD.password" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item>
                    <el-button class="btn1" type="primary" color="#444076" @click="findPassword">确认</el-button>
                    <el-button  class="btn2" color="#444076" @click="display=false">取消</el-button>
                    </el-form-item>
                </el-form>
                </el-scrollbar>
    
            </el-col>
            </el-row>
    
        </el-col>
        </el-row>
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
        display: false,
        input_show : true,
        btn_show : false,
        captcha:null,
        confirmCaptcha:null,
        recruiterId:null,
        findPWD:{
            email:null,
            password:null,
        },
        userInfo:{},
        userInfoEdit:{},
        uploadIcon:'https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/upload.png',
        picUrlReview:ref('https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/test.png'),
        picUrl:ref(''),
    }
    },
    methods: {
        submit()
        {
            console.log('图片存储位置',this.picUrl)
            //注意：
            //此处要用axios请求将picUrl传到后端存入数据库（可随表单其他内容一起上传，以业务逻辑为准）
            this.picDisplay=true;
            this.userInfoEdit.nickname=this.userInfo.nickname,
            this.userInfoEdit.contactMethod=this.userInfo.contactMethod,
            this.userInfoEdit.introduction=this.userInfo.introduction,
            this.userInfoEdit.companyName=this.userInfo.companyName
            this.userInfoEdit.headportrait=this.picUrl,
            this.$axios({
                method: 'put',
                url: '/api/recruiter/personInfo/set',
                data : this.userInfoEdit
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "上传成功",
                        type: 'success',
                    })
                    this.$router.go(0)
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage({
                    message: "上传失败",
                    type: 'error',
                })
            })
        },
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
        edit(){
            this.input_show=false
            this.btn_show=true
        },
        cancelEdit(){
            this.userInfo.nickname=this.userInfoEdit.nickname
            this.userInfo.contactMethod=this.userInfoEdit.contactMethod
            this.userInfo.introduction=this.userInfoEdit.introduction
            this.userInfo.headportrait=this.userInfoEdit.headportrait
            this.input_show=true
            this.btn_show=false
        },
        onSubmit(){
            this.userInfoEdit.nickname=this.userInfo.nickname,
            this.userInfoEdit.contactMethod=this.userInfo.contactMethod,
            this.userInfoEdit.introduction=this.userInfo.introduction,
            this.userInfoEdit.headportrait=this.userInfo.headportrait
            this.$axios({
                method: 'put',
                url: '/api/recruiter/personInfo/set',
                data : this.userInfoEdit
            })
            .then(res => {
                if(res.data.code==200){
                    ElMessage({
                        message: "修改成功",
                        type: 'success',
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage({
                    message: "修改失败",
                    type: 'error',
                })
            })
            this.input_show=true
            this.btn_show=false
        },
        getfindPWDCaptcha(){
            if(this.findPWD.email==null||this.findPWD.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/register/email',
                data:{
                    email:this.findPWD.email
                },
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: '验证码已发送至您的邮箱！',
                        type: 'success',
                    })
                    this.captcha=res.data.data.captcha
                }else{
                    ElMessage.error('获取验证码失败！')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('获取验证码失败！')
            })
        },
        isCaptcha(){//验证码是否正确，传captcha
            if(this.captcha!=this.confirmCaptcha){
                ElMessage({
                    message: "验证码不正确！",
                    type: 'error',
                })
            }
        },
        findPassword(){
            if(this.findPWD.email==null||this.findPWD.email==''){
                ElMessage({
                    message: "请检查邮箱！",
                    type: 'error',
                })
                return;
            }
            if(this.confirmCaptcha==null||this.confirmCaptcha==''){
                ElMessage({
                    message: "验证码不正确！",
                    type: 'error',
                })
                return;
            }
            if(this.findPWD.password==null||this.findPWD.password==''){
                ElMessage({
                    message: "请填写密码！",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/findPassword',
                data: this.findPWD
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    ElMessage({
                        message: '成功修改密码！',
                        type: 'success',
                    })
                    setTimeout(() => console.log(1), 2000)
                    this.$router.go(0)
                }else{
                    ElMessage.error('修改密码失败！')
                }
            })
            .catch(function (error) {
                console.log(error);
                ElMessage.error('修改密码失败！')
            })
        }
    },
    created() {
        this.recruiterId=localStorage.getItem('userId')
        this.$axios({
            method: 'get',
            url: '/api/recruiter/personInfo/get?recruiterId='+localStorage.getItem('userId'),
        })
        .then(res => {
            console.log('用户信息1'+res.data.data);
            this.userInfo=res.data.data.company_list[0];
            console.log('用户信息2'+this.userInfo);
            this.userInfoEdit.recruiterId=localStorage.getItem('userId'),
            this.userInfoEdit.nickname=this.userInfo.nickname,
            this.userInfoEdit.headportrait=this.userInfo.headportrait,
            this.userInfoEdit.contactMethod=this.userInfo.contactMethod,
            this.userInfoEdit.introduction=this.userInfo.introduction,
            this.userInfoEdit.companyName=this.userInfo.companyName
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
.userPhoto{
    text-align: center;
    margin: 40px  0px;
}
.userPhotoUrl{
    width: 80px;
}
.userPhoto .btn{
    margin-top: 20px;
    color: #fff;
    height: 30px;
    width: 100px;
}

</style>