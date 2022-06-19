<template>
    <el-dialog title="管理岗" :visible.sync="detailVisible" width="35%">

    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item  label="流程单号" prop="carNo">
                        <el-input :disabled="true" v-model="formData.id"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="carNo">
                        <el-input :disabled="true" v-model="formData.carNo"></el-input>
                    </el-form-item>
                    <el-form-item label="车主姓名" >
                        <el-input :disabled="true" v-model="formData.carOwnerName"></el-input>
                    </el-form-item>
                    <el-form-item label="车主手机号">
                        <el-input :disabled="true" v-model="formData.carOwnerPhone"></el-input>
                    </el-form-item>


                    <el-form-item label="营销费用">
                        <el-input v-model="formData.marketingFee"></el-input>
                    </el-form-item>

                    <el-form-item label="是否办结">
                        <el-select v-model="formData.status" placeholder="暂不办结">
                            <el-option
                                v-for="item in isDone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData[0].id')">确认提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
    </el-dialog>
</template>

<script>
import headTop from '@/components/headTop'
import {updateProcessInfo, searchByDepartment,addTechnicianInfo} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'
import {addManagerInfo} from "../api/getData";

export default {
    name: "manager",
    data() {
        return {
            detailVisible:false,
            city: {},
            formData: {
                id:'',
                carNo:'',
                marketingFee:'',
                nextProcessor:'',
                carOwnerPhone:'',
                carOwnerName:'',
                status:'doing',
            },
            processInfo: {
                id: '',
                managerId: '',
                status:''

            },
            rules: {
                carNo: [
                    {required: true, message: '请输入车牌号!', trigger: 'blur'},
                ]
            },

            baseUrl,
            baseImgPath,
            nextProcessor: [],

            validAttributes: [{
                value: 0,
                label: '否'
            }, {
                value: 1,
                label: '是'
            },],
            isDone: [{
                value: 'done',
                label: '办结'
            }, {
                value: 'doing',
                label: '暂不办结'
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
        init(data){


            console.log(data.carNo)

            this.formData.id=data.id;
            this.formData.carNo=data.carNo;
            this.formData.carOwnerName = data.carOwnerName;
            this.formData.carOwnerPhone =  data.carOwnerPhone;
            this.formData.marketingFee = data.marketingFee;
            this.detailVisible=true;
        },
        async initData() {

        },



        async submitForm(formName) {

            if (1) {
                Object.assign(this.formData, {activities: this.activities}, {
                //    category: this.selectedCategory.join('/')
                })

                try {
                    this.processInfo.id = this.formData.id;
                    this.processInfo.status = this.formData.status;
                    this.processInfo.technicianId = sessionStorage.getItem("userId");
                    let result1 = await updateProcessInfo(this.processInfo);
                    if (result1.result === 'success') {
                        message: "交办成功!"
                    } else {
                        this.$message({
                            type: 'error',
                            message: "请稍后再试!"
                        });
                    }

                } catch (err) {
                    console.log(err)
                }

                try {
                    let result = await addManagerInfo(this.formData);
                    if (result.result === 'success') {
                        this.$message({
                            type: 'success',
                            message: '交办成功'
                        });
                        this.formData = {
                            carNo: '',
                            id:''
                        };
                        this.detailVisible=false
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
            } else {
                this.$notify.error({
                    title: '错误',
                    message: '请检查输入是否正确',
                    offset: 100
                });
                return false;
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
