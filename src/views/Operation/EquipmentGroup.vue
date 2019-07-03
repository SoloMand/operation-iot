<template>
<div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:menu:add" type="primary" @click="handleAdd"/>
			</el-form-item>
		</el-form>
	</div>
	<!--表格树内容栏-->
	<el-table :data="tableTreeDdata" stripe size="mini" style="width: 100%;" row-key="id"
		v-loading="loading" element-loading-text="$t('action.loading')">
		<el-table-column  
			prop="name" header-align="center" treeKey="id" width="150" label="名称">
		</el-table-column >
		<el-table-column 
			prop="parentName" header-align="center" align="center" width="120" label="上级分组">
		</el-table-column>
		<el-table-column
			prop="orderNum" header-align="center" align="center" width="100" label="排序">
		</el-table-column>
		   <el-table-column 
			prop="remark" header-align="center" align="center"  label="描述">
		</el-table-column>
		<el-table-column
			fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
		<template slot-scope="scope">
			<kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:menu:edit" @click="handleEdit(scope.row)"/>
			<kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:menu:delete" type="danger" @click="handleDelete(scope.row)"/>
		</template>
		</el-table-column>
	</el-table>
	<el-dialog :title="!dataForm.id ? '新增' : '修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()" 
			label-width="80px" :size="size" style="text-align:left;">
			<el-form-item v-if="dataForm.name !== 0" label="分组名称" prop="name">
				<el-input v-model="dataForm.name" placeholder="分组名称"></el-input>
			</el-form-item>
			<el-form-item label="上级菜单" prop="parentName">
				<popup-tree-input 
					:data="popupTreeData" :props="popupTreeProps" :prop="dataForm.parentName==null||dataForm.parentName==''?'顶级菜单':dataForm.parentName" 
					:nodeKey="''+dataForm.parent" :currentChangeHandle="handleTreeSelectChange">
				</popup-tree-input>
			</el-form-item>
			<el-form-item label="排序编号" prop="orderNum">
				<el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序编号"></el-input-number>
			</el-form-item>
			<el-form-item label="描述" prop="remark">
				<el-input type="textarea" v-model="dataForm.remark"></el-input>
			</el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button :size="size"  @click="dialogVisible = false">{{$t('action.cancel')}}</el-button>
	    <el-button :size="size"  type="primary" @click="submitForm()">{{$t('action.comfirm')}}</el-button>
	  </span>
	</el-dialog>
</div>
</template>

<script>
import KtButton from "@/views/Core/KtButton";
import TableTreeColumn from "@/views/Core/TableTreeColumn";
import PopupTreeInput from "@/components/PopupTreeInput";
import FaIconTooltip from "@/components/FaIconTooltip";
export default {
	components: {
		PopupTreeInput,
		KtButton,
		TableTreeColumn,
		FaIconTooltip
	},
	data() {
		return {
			size: "small",
			loading: false,
			filters: {
				name: ""
			},
			tableTreeDdata: [],
			dialogVisible: false,
			dataForm: {
				id: '',
				name: "",
				parent: 'root',
				parentName: "",
				orderNum: 0,
				remark: "",
			},
			dataRule: {
				name: [{ required: true, message: "分组名称不能为空", trigger: "blur" }],
			},
			popupTreeData: [],
			popupTreeProps: {
				label: "name",
				children: "children"
			}
		};
  },
  methods: {
    // 获取数据
    findTreeData: function() {
      this.loading = true;
      this.$api.equipmentgroup.loadTree().then(res => {
        this.tableTreeDdata = res.data;
        this.popupTreeData = this.getParentMenuTree(res.data);
        this.loading = false;
      });
    },
    // 获取上级菜单树
    getParentMenuTree: function(tableTreeDdata) {
		console.log(tableTreeDdata);
		let parent = {
			parent: 0,
			name: "顶级菜单",
			children: tableTreeDdata
		};
		return [parent];
    },
	handleAdd: function() {
		this.dialogVisible = true;
		this.dataForm = {
			id: '',
			name: "",
			parent: 'root',
			parentName: "",
			orderNum: 0,
			remark: "",
		};
	},
	 // 菜单树选中
	handleTreeSelectChange(data, node) {
		this.dataForm.parent = data.id;
		this.dataForm.parentName = data.name;
	},
	// 表单提交
	submitForm() {
		this.$refs["dataForm"].validate(valid => {
			if (valid) {
				this.$confirm("确认提交吗？", "提示", {}).then(() => {
					this.editLoading = true;
					let params = Object.assign({}, this.dataForm);
					this.$api.equipmentgroup.save(params).then(res => {
						this.editLoading = false;
						if (res.code == 200) {
							this.$message({ message: "操作成功", type: "success" });
							this.$refs["dataForm"].resetFields();
							this.dialogVisible = false;
						} else {
							this.$message({
								message: "操作失败, " + res.msg,
								type: "error"
							});
						}
						this.findTreeData();
					});
				})
			}
		})
	},
	// 显示编辑界面
	handleEdit: function(row) {
		this.dialogVisible = true;
		Object.assign(this.dataForm, row);
	},
	// 删除
	handleDelete(row) {
		this.$confirm("确认删除选中记录吗？", "提示", {
			type: "warning"
		}).then(() => {
			let params = this.getDeleteIds([], row);
			this.$api.equipmentgroup.batchDelete(params).then(res => {
				this.findTreeData();
				this.$message({ message: "删除成功", type: "success" });
			});
		});
	},
	// 获取删除的包含子菜单的id列表
	getDeleteIds(ids, row) {
	  ids.push({ id: row.id });
	  if (row.children != null) {
	    for (let i = 0, len = row.children.length; i < len; i++) {
	      this.getDeleteIds(ids, row.children[i]);
	    }
	  }
	  return ids;
	},


  },
  mounted() {
    this.findTreeData();
  }
};
</script>

<style scoped>
</style>