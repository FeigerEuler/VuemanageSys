<template>
    <el-dialog title="外拓岗" :visible.sync="detailVisible" width="35%">

    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="流程单号" prop="carNo">
                        <el-input :disabled="true" v-model="formData.id"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="carNo">
                        <el-input :disabled=true v-model="formData.carNo"></el-input>
                    </el-form-item>
                    <el-form-item label="首次联系时间">
                        <el-input v-model="formData.firstContactTime"></el-input>
                    </el-form-item>


                    <el-form-item label="是否到达现场">
                        <el-select v-model="formData.isOnSite" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="到达现场时间">
                        <el-input v-model="formData.infoSource"></el-input>
                    </el-form-item>

                    <el-form-item label="是否有效线索">
                        <el-select v-model="formData.isValid" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="是否首个到达现场">
                        <el-select v-model="formData.isValidClue" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="车辆是否到店?">
                        <el-select v-model="formData.haveCarArrived" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="营销费用" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.marketingFee"></el-input>
                    </el-form-item>


                    <el-form-item label="备注:" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.remark"></el-input>
                    </el-form-item>

                    <el-form-item label="下一步办理人">
                        <el-select v-model="formData.nextProcessor" placeholder="请选择">
                            <el-option
                                v-for="item in nextProcessor"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData[0].id')">交办</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
    </el-dialog>
</template>

<script>
import headTop from '@/components/headTop'
import {updateProcessInfo, searchByDepartment} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'

export default {
    name: "extend",
    data() {
        return {
            detailVisible:false,
            city: {},
            formData: {
                id:'',
                carNo:'',
                firstContactTime: '',
                isOnSite: '', //店铺名称
                isValid: '',
                isValidClue: 0,
                haveCarArrived: '',
                marketingFee: 0,
                nextProcessor: ''

            },
            processInfo: {
                id: '',
                extenerId: '',
                nowProcessorId:''
            },
            rules: {
                carNo: [
                    {required: true, message: '请输入车牌号!', trigger: 'blur'},
                ]
            },

            activityValue: '满减优惠',
            activities: [{
                icon_name: '减',
                name: '满减优惠',
                description: '满30减5，满60减8',
            }],
            baseUrl,
            baseImgPath,
            nextProcessor: [],
            selectedCategory: ['快餐便当', '简餐'],
            validAttributes: [{
                value: 0,
                label: '否'
            }, {
                value: 1,
                label: '是'
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
            this.detailVisible=true;
        },
        async initData() {

            try {
                const nextProcessors = await searchByDepartment({"department":"3"});
                console.log(nextProcessors);
                nextProcessors.forEach(item => {
                    const addnew = {
                        value: item.id,
                        label: item.realName,
                    }
                    this.nextProcessor.push(addnew);
                })
                console.log(this.nextProcessor)

            } catch (err) {
                console.log(err);
            }
        },
        async querySearchAsync(queryString, cb) {
            if (queryString) {
                try {
                    const cityList = await searchplace(this.city.id, queryString);
                    if (cityList instanceof Array) {
                        cityList.map(item => {
                            item.value = item.address;
                            return item;
                        })
                        cb(cityList)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        addressSelect(address) {
            this.formData.latitude = address.latitude;
            this.formData.longitude = address.longitude;
            console.log(this.formData.latitude, this.formData.longitude)
        },


        async submitForm(formName) {

            if (1) {
                Object.assign(this.formData, {activities: this.activities}, {
                    category: this.selectedCategory.join('/')
                })

                try {
                    this.processInfo.id = this.formData.id;
                    this.processInfo.nowProcessorId = this.formData.nextProcessor;
                    this.processInfo.extenerId = sessionStorage.getItem("userId");
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
                    let result = await updateProcessInfo(this.formData);
                    if (result.result === 'success') {
                        this.$message({
                            type: 'success',
                            message: '交办成功'
                        });
                        this.formData = {
                            carNo: '',
                            infoSource: '', //店铺名称
                            acquireTime: '',
                            isValidClue: 0,
                            reportRegion: '',
                            isSubscriber: 0,
                            brand: '',
                            model: '',
                            remark: ''
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
