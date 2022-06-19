<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    property="id"
                    label="流程单号"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="carNo"
                    label="车牌号"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="createTime"
                    label="交办时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="handleClick2(tableData[scope.$index])">立即处理</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <button @click="handleClick2('父组件')">立即处理</button>
            <!-- 3.在页面中使用dialog-component组件-->
            <!-- 4.设置v-if语句，通过动态改变Visiable值用来控制弹窗是否弹出-->
            <!-- 5.设置ref属性，相当于唯一标识dialog-component组件-->
            <dialog-component v-if="Visible" ref="extend"></dialog-component>
            <dialog-component1 v-if="Visible1" ref="consultant"></dialog-component1>
            <dialog-component2 v-if="Visible2" ref="technician"></dialog-component2>
            <dialog-component4 v-if="Visible4" ref="treasurer"></dialog-component4>
            <dialog-component3 v-if="Visible3" ref="component"></dialog-component3>
            <dialog-component5 v-if="Visible5" ref="manager"></dialog-component5>
               <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {getToDoList, getUserCount} from '@/api/getData'
import dialogComponent from "./extend"
import dialogComponent1 from "./consultant"
import dialogComponent2 from "./technician"
import dialogComponent3 from "./componenter"
import dialogComponent4 from "./treasurer"
import dialogComponent5 from "./manager"


export default {

    data() {
        return {
            Visible:false,
            Visible1:false,
            Visible2:false,
            Visible3:false,
            Visible4:false,
            Visible5:false,
            Visible6:false,



            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            todoListData: [],
        }
    },
    components: {
        headTop,
        dialogComponent,
        dialogComponent1,
        dialogComponent2,
        dialogComponent3,
        dialogComponent4,
        dialogComponent5,



    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            try {
                const queryResult = await getToDoList({"nowProcessorId": +sessionStorage.getItem('userId')});
                const todoListData = queryResult.processInfos
                console.log(todoListData)
                this.tableData = [];
                todoListData.forEach(item => {
                    const tableData = {};
                    tableData.carNo = item.carNo;
                    tableData.id = item.id;
                    tableData.createTime = item.createTime;
                    this.tableData.push(tableData);
                })

            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getUsers()
        },
        async getUsers() {
            const Users = await getToDoList('{"nowProcessorId":' + sessionStorage.getItem('userId') + '}');

        },

        async handleClick2(data) {
            if(sessionStorage.getItem('department')==='2'){
                await this.extend(data);
            }else if(sessionStorage.getItem('department')==='3'){
                console.log('服务顾问岗')
                await this.consultant(data);
            }else if(sessionStorage.getItem('department')==='4'){
                await this.technician(data);
            }else if(sessionStorage.getItem('department')==='5'){
                await this.component(data);
            }else if(sessionStorage.getItem('department')==='6'){
                await this.treasurer(data);
            }
            else if(sessionStorage.getItem('department')==='7'){
                await this.manager(data);
            }

            console.log('2222222');
        },
         async extend(data) {

             this.Visible = true;
             await this.$nextTick(async () => {
                 //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                 //init调用的是dialog-component组件里面的init方法
                 //data是传递给弹窗页面的值
                 await this.$refs.extend.init(data);

             })

         },
        async consultant(data) {
            this.Visible1 = true;
            await this.$nextTick(async () => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                await this.$refs.consultant.init(data);

            })
        },
        async treasurer(data) {
            this.Visible4 = true;
            await this.$nextTick(async () => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                await this.$refs.treasurer.init(data);
            })
        },
        async technician(data) {
            this.Visible2 = true;
            await this.$nextTick(async () => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                await this.$refs.technician.init(data);

            })
        },async component(data) {
            this.Visible3 = true;
          this.$nextTick(() => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                this.$refs.component.init(data);

            })
        },
        async manager(data) {
            this.Visible5 = true;
            await this.$nextTick(async () => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                await this.$refs.manager.init(data);

            })
        },

        handleEdit(data){
            this.Visible=true;
            this.$nextTick(()=>{
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                this.$refs.extend.init(data);
            })
        },



    },
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}
</style>
