<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="车牌号" prop="carNo">
                        <el-input v-model="formData.carNo"></el-input>
                    </el-form-item>
                    <el-form-item label="车主姓名">
                        <el-input v-model="formData.carOwnerName"></el-input>
                    </el-form-item>
                    <el-form-item label="车主手机号">
                        <el-input v-model="formData.carOwnerPhone"></el-input>
                    </el-form-item>

                    <el-form-item label="信息来源">
                        <el-input v-model="formData.infoSource"></el-input>
                    </el-form-item>
                    <el-form-item label="获取线索时间" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.acquireTime"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效线索">
                        <el-select v-model="formData.isValidClue" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户报案区域" prop="description">
                        <!--                        <el-input v-model="formData.region"></el-input>-->

                        <el-select v-model="provinceName" placeholder="请选择省">
                            <el-option
                                v-for="item in provinces"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                @click.native="getCityNames(item.value)"
                            >
                            </el-option>
                        </el-select>
                        <el-select v-model="cityName" placeholder="请选择市">
                            <el-option
                                v-for="item in cities"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                @click.native="getDistrictNames(item.value)"
                            >
                            </el-option>
                        </el-select>
                        <el-select v-model="districtName" placeholder="请选择区">
                            <el-option
                                v-for="item in districts"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                                @click.native="getStreetNames(item.value)">
                            </el-option>
                        </el-select>
                        <el-select v-model="streetName" placeholder="请选择街道" >
                            <el-option
                                v-for="item in streets"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>


                    </el-form-item>
                    <el-form-item label="客户报案时间" prop="description">
                        <el-input v-model="formData.clientReprtTime"></el-input>
                    </el-form-item>
                    <el-form-item label="自店保险客户?">
                        <el-select v-model="formData.isSubscriber" placeholder="请选择">
                            <el-option
                                v-for="item in validAttributes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="品牌" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="车型" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.model"></el-input>
                    </el-form-item>

                    <el-form-item label="备注:" aria-placeholder="格式:yyyy-mm-dd">
                        <el-input v-model="formData.remark"></el-input>
                    </el-form-item>

                    <el-form-item label="下一步处理部门">
                        <el-select v-model="nextDepartment" placeholder="下一步骤处理部门">
                            <el-option
                                v-for="item in nextProcessDepartments"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                @click.native="getNextProcessors(item.value)"
                            >
                            </el-option>
                        </el-select>
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
                        <el-button type="primary" @click="submitForm('formData')">交办</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from '@/components/headTop'
import {addProcessInfo, addClue, searchByDepartment, getDistrictNames} from '@/api/getData'
import {baseUrl, baseImgPath} from '@/config/env'

export default {
    data() {
        return {
            nextDepartment: '',
            formData: {
                id: '',
                carNo: '',
                carOwnerName: '',
                carOwnerPhone: '',
                infoSource: '', //店铺名称
                acquireTime: '',
                isValidClue: 0,
                reportRegion: '',
                isSubscriber: 0,
                brand: '',
                model: '',
                remark: '',
                nextProcessor: ''

            },
            provinceName:'',
            cityName:'',
            districtName:'',
            streetName:'',
            addProcessInfo: {
                carNo: '',
                clueCollectionerId: '',
                nowProcessorId: ''
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
            provinces: [],
            cities:[],
            districts:[],
            streets:[],
            nextProcessDepartments: [{
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
        async initData() {
            try {
                const result = await getDistrictNames({"keyWord":"中国"});
                this.provinces = [];
                console.log(result.districtNames);
                result.districtNames.forEach(item => {
                    const addnew = {
                        value: item.name,
                        label: item.name,
                    }
                    this.provinces.push(addnew);
                })
                console.log(this.provinces)

            } catch (err) {
                console.log(err);
            }

        },


        async getCityNames(keyWord) {
            try {
                const result = await getDistrictNames({"keyWord": keyWord});
                this.cities = [];

                result.districtNames.forEach(item => {
                    const addnew = {
                        value: item.name,
                        label: item.name,
                    }
                    this.cities.push(addnew);
                })

            } catch (err) {
                console.log(err);
            }
        },

        async getDistrictNames(keyWord) {
            try {
                const result = await getDistrictNames({"keyWord": keyWord});
                this.districts = [];

                result.districtNames.forEach(item => {
                    const addnew = {
                        value: item.name,
                        label: item.name,
                    }
                    this.districts.push(addnew);
                })

            } catch (err) {
                console.log(err);
            }
        },

        async getStreetNames(keyWord) {
            try {
                const result = await getDistrictNames({"keyWord": keyWord});
                this.streets = [];

                result.districtNames.forEach(item => {
                    const addnew = {
                        value: item.name,
                        label: item.name,
                    }
                    this.streets.push(addnew);
                })

            } catch (err) {
                console.log(err);
            }

        },

        async getNextProcessors(department) {
            const nextProcessors = await searchByDepartment({"department": department});
            this.nextProcessor = [];
            console.log(nextProcessors);
            nextProcessors.forEach(item => {
                const addnew = {
                    value: item.id,
                    label: item.realName,
                }
                this.nextProcessor.push(addnew);
            })
            console.log(this.nextProcessor)
        },


        submitForm(formName) {
            this.formData.reportRegion = this.provinceName+this.cityName+this.districtName+this.streetName;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    Object.assign(this.formData, {activities: this.activities}, {
                        // category: this.selectedCategory.join('/')
                    })

                    try {
                        this.addProcessInfo.carNo = this.formData.carNo;
                        this.addProcessInfo.carOwnerName = this.formData.carOwnerName;
                        this.addProcessInfo.carOwnerPhone = this.formData.carOwnerPhone;
                        this.addProcessInfo.nowProcessorId = this.formData.nextProcessor;
                        this.addProcessInfo.clueCollectionerId = sessionStorage.getItem("userId");
                        let result1 = await addProcessInfo(this.addProcessInfo);
                        if (result1.result === 'success') {
                            this.formData.id = result1.processInfo.id;
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
                        let result = await addClue(this.formData);
                        if (result.result === 'success') {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.formData = {
                                carNo: '',
                                carOwnerName: '',
                                carOwnerPhone: '',
                                infoSource: '',
                                acquireTime: '',
                                isValidClue: 0,
                                reportRegion: '',
                                isSubscriber: 0,
                                brand: '',
                                model: '',
                                remark: ''
                            };

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
            });
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
