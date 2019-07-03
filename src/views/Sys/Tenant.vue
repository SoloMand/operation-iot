<template>
  <div class="page-container">
	  <kt-table permsEdit="sys:tenant:check" 
	  	 :data="pageResult" :columns="filterColumns" @handleEdit="handleEdit"
	  	 @findPage="findPage"
	  	>
	  </kt-table>
	  <el-dialog title="租户数据源" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
	  	<el-form :model="dataForm" label-width="120px"  ref="dataForm" :size="size"
	  		label-position="right">
	  		<el-form-item label="ID" prop="id" v-if="false">
	  			<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
	  		</el-form-item>
	  		<el-form-item label="用户名" prop="name">
	  			<el-input v-model="dataForm.name" auto-complete="off"></el-input>
	  		</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input v-model="dataForm.address" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="法人" prop="legalPerson">
				<el-input v-model="dataForm.legalPerson" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="contact">
				<el-input v-model="dataForm.contact" auto-complete="off"></el-input>
			</el-form-item>
			
			
	  		
	  		
	  	</el-form>
	  	<div slot="footer" class="dialog-footer" v-if="!showDataSource">
	  		<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
	  		<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
	  	</div>
		<div v-if="showDataSource">
			
			<span>url : </span>{{dataSource.url}}</br>
			<span>驱动包 : </span>{{dataSource.driverClass}}</br>
		</div>
	  </el-dialog>
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput"
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
import { format } from "@/utils/datetime"
export default {
	components:{
		PopupTreeInput,
		KtTable,
		KtButton,
		TableColumnFilterDialog
	},
	data() {
		return {
			size: 'small',
			filters: {
				name: ''
			},
			columns: [],
			filterColumns: [],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},
			
			operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataForm:{
				id:'',
				name:'',
				address:'',
				legalPerson:'',
				contact:'',
				license:'',
				status:'',
				/* url:'',
				userName:'',
				password:'',
				driverClass:'' */
			},
			showDataSource:false,
			dataSource:{
				url:'',
				userName:'',
				password:'',
				driverClass:''
			}
		}
	},
	methods: {
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.params = [{name:'name', value:this.filters.name}]
			this.$api.tenant.query(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		handleEdit: function(params){
			this.showDataSource = false
			this.dataSource = {}
			this.dataForm = Object.assign({}, params.row)
			this.$api.tenant.loadDataSource({'ID':this.dataForm.id}).then((res) => {
				if(res.data){
					//租户数据源存在
					this.showDataSource = true
					this.dataSource = res.data
				}else{
					//租户数据源不存在 显示租户信息即可
					
				}
				this.dialogVisible = true
			})
			
		},
		//确认
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						this.$api.tenant.check(params).then((res) => {
							this.editLoading = false
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
								this.dialogVisible = false
								this.$refs['dataForm'].resetFields()
							} else {
								this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}
							this.findPage(null)
						})
					})
				}
			})
		},
		initColumns: function () {
					this.columns = [
						//{prop:"id", label:"ID", minWidth:50},
						{prop:"name", label:"企业名称", minWidth:120},
						{prop:"address", label:"注册地址", minWidth:120},
						{prop:"legalPerson", label:"法人", minWidth:120},
						{prop:"contact", label:"联系方式", minWidth:100},
						{prop:"license", label:"营业执照", minWidth:120},
						{prop:"status", label:"状态", minWidth:100}
						//{prop:"tenantId", label:"租户ID", minWidth:70},
						// {prop:"createBy", label:"创建人", minWidth:120},
						// {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
						// {prop:"lastUpdateBy", label:"更新人", minWidth:100},
						// {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
					]
					this.filterColumns = JSON.parse(JSON.stringify(this.columns));
		      	}
	},
	mounted() {
		this.initColumns()
	}
}
</script>

<style scoped>

</style>