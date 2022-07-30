<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>流程管理</template>
						<el-menu-item index="todoList">我的待办</el-menu-item>
                        <el-menu-item index="doingList">办理中流程</el-menu-item>
						<el-menu-item index="shopList">已办列表</el-menu-item>

					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>数据管理</template>
						<el-menu-item index="addClue">录入线索</el-menu-item>


                        <el-menu-item index="addMembers">新增员工</el-menu-item>
                        <el-menu-item index="updateMemberinfo">更新员工信息</el-menu-item>
                        <el-menu-item index="dataStatistics">报表导出</el-menu-item>
<!--                        <el-menu-item index="consultant">顾问岗</el-menu-item>-->
<!--                        <el-menu-item index="technician">车间技师岗</el-menu-item>-->

<!--                        <el-menu-item index="componenter">配件岗</el-menu-item>-->
<!--                        <el-menu-item index="treasurer">财务岗</el-menu-item>-->
<!--                        <el-menu-item index="manager">管理岗</el-menu-item>-->


					</el-submenu>


				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
