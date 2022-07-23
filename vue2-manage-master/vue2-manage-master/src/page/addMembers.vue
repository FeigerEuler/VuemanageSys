<template>


    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">

                    <el-form-item label="员工姓名" prop="realName">
                        <el-input v-model="formData.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号" prop="phoneNo">
                        <el-input  v-model="formData.phoneNo"></el-input>
                    </el-form-item>

                    <el-form-item label="登陆名" prop="userName">
                        <el-input v-model="formData.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="登陆密码" prop="pwd">
                        <el-input v-model="formData.pwd"></el-input>
                    </el-form-item>

                    <el-form-item label="所属角色" prop="department">
                        <el-select v-model="formData.department" placeholder="请选择所属角色" >
                            <el-option
                                v-for="item in departments"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData[0].id')">创建用户</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import headTop from '@/components/headTop'
import {addMembers} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'

export default {
    name: "technician",
    data() {
        return {
            detailVisible:false,

            formData: {
                id:'',
                userName:'',
                pwd:'',
                realName: '',
                phoneNo: '',
                department: ''

            },

            rules: {
                realName: [
                    {required: true, message: '此项不能为空！!', trigger: 'blur'},
                ],
                userName: [
                    {required: true, message: '此项不能为空！!', trigger: 'blur'},
                ],
                pwd: [
                    {required: true, message: '此项不能为空！!', trigger: 'blur'},
                ],
                phoneNo: [
                    {required: true, message: '此项不能为空！!', trigger: 'blur'},
                ],
                department: [
                    {required: true, message: '此项不能为空！!', trigger: 'blur'},
                ]
            },

            baseUrl,
            baseImgPath,


            departments: [
                {
                    value: 1,
                    label: '线索录入岗'
                },{
                value: 2,
                label: '外拓岗'
            }, {
                value: 3,
                label: '服务顾问岗'
            }, {
                value: 4,
                label: '车间技师岗'
            }, {
                value: 5,
                label: '配件岗'
            }, {
                value: 6,
                label: '财务岗'
            },],

        }
    },
    components: {
        headTop,
    },
    mounted() {
        this.initData();

    },
    methods: {
        init(){



        },
         async initData() {

        },



        async submitForm(formName) {

                try {
                    let result = await addMembers(this.formData);
                    if (result.result === 'success') {
                        this.$message({
                            type: 'success',
                            message: '创建成功'
                        });

                    } else {
                        this.$message({
                            type: 'error',
                            message: result.message
                        });
                    }
                    console.log(result)
                } catch (err) {
                    console.log(err)
                }


        },
    }
}
</script>

<style lang="less">
@import '../style/mixin';

.button_submit {
    text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}
</style>
