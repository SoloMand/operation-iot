<template>
	
  <el-form ref="registration" :rules="fieldRules" :model="registrationForm">
		<h2 class="title" style="padding-left:22px;" >欢迎注册力控设备运维平台</h2>
    <el-row type="flex" class="row-bg" justify="center">
			<el-col :span="12">
				<el-form-item label="公司名称" prop="name">
					<el-input v-model="registrationForm.name" placeholder="公司名称"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="12">
				<el-form-item label="注册地址" prop="address">
					<el-input v-model="registrationForm.address" placeholder="注册地址"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center" >
			<el-col :span="12">
				<el-form-item label="法人" prop="legalPerson">
					<el-input v-model="registrationForm.legalPerson" placeholder="法人"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="12">
				<el-form-item label="联系方式" prop="contact">
					<el-input v-model="registrationForm.contact" placeholder="联系方式"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="12">
				<el-form-item label="营业执照注册号" prop="license">
					<el-input v-model="registrationForm.license" placeholder="营业执照注册号"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
   
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="registration" :loading="loading">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import ThemePicker from "@/components/ThemePicker"
export default {
  name: 'Registration',
  components:{
    ThemePicker
  },
  data() {
    return {
      loading: false,
      registrationForm: {
        name: '',//名称
        address: '',// 注册地址
        legalPerson:'',// 法人
        contact: '',// 联系方式
				license:''// 营业执照
      },
      fieldRules: {
        name: [
			{ required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        address: [
			{ required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
		legalPerson: [
			{ required: true, message: '请输入企业法人', trigger: 'blur' }
		],
		contact: [
			{ required: true, message: '联系方式', trigger: 'blur' }
		],
		license: [
			{ required: true, message: '营业执照注册号', trigger: 'blur' }
		]
      },
      checked: true
    }
  },
  methods: {
    registration() {
			var THIS = this;
			 this.$refs['registration'].validate((valid) => {
				 console.log(valid);
          if (valid) {
            this.loading = true
            this.$api.tenant.registration(this.registrationForm).then((res) => {
            	if(res.code==200){
            		this.$message({
            		  message: "注册信息已提交，请耐心等待审核，即将进入试用页面！",
            		  type: 'success'
            		})
            		setTimeout(function(){
            			//this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            			THIS.$router.push('/')  // 登录成功，跳转到主页
            			},2000);
            	}
            	
            }).catch((res) => {
                this.$message({
                message: res.message,
                type: 'error'
                })
            });
          } else {
            //console.log('error submit!!');
            return false;
          }
        });

    },
  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  }
}
</script>

<style lang="scss" scoped>
 
</style>