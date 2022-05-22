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
                    property="registe_time"
                    label="流程单号"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="username"
                    label="车牌号"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="city"
                    label="交办时间">
                </el-table-column>
            </el-table>
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

export default {
    data() {
        return {
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
                    tableData.username = item.carNo;
                    tableData.registe_time = item.id;
                    tableData.city = item.createTime;
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

        }
    },
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}
</style>
