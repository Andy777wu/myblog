<template>
    <el-dialog
    :title="currentId?'编辑': '新增'"
    :visible.sync="show"
    :before-close='cancel'
    width="40%"
    center>
        <el-form :model="form">
            <el-form-item label="菜单名" :label-width="formLabelWidth">
                <el-input v-model="form.serier" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="子菜单名" :label-width="formLabelWidth">
                <el-input v-model="form.serierItem" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
                <div class="upload">
                    <i class="el-icon-plus"></i>
                    <i v-if="form.imgSrc" class="el-icon-error" @click="delImage"></i>
                    <img v-if="form.imgSrc" :src="form.imgSrc" alt="">
                    <input id="inputName" type="file" @change="previewFiles" accept=".jpg, .jpeg, .png" />
                </div>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
                <el-input type='textarea' v-model="form.intro" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">{{currentId?'提交': '保存'}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {axiosGet,axiosPost} from '../../../utils/request.js'
import arrayBufferToBase64 from '../../../utils/getImageUrl'
export default {
    props: ['showAddOrEdit','currentId'],
    data(){
        return {
            show: false,
            formLabelWidth: '80px',
            form: {
                serier: '',
                serierItem: '',
                imgSrc: '',
                intro: ''
            }
        }
    },
    watch:{
        showAddOrEdit(){
            this.show = this.showAddOrEdit
            this.show&&this.currentId&&this.getDetail()
        }
    },
    mounted() {
    },
    methods:{
        getDetail(){
            let url = `/api/serier/detail?_id=${this.currentId}`
            axiosGet(url).then((res)=>{
                // console.log(res);
                if(res.data.code === 200){
                    let data = res.data.data
                    data.imgSrc = arrayBufferToBase64(data.imgSrc.data.data)
                    this.form = data
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        // 二进制转化为base64
        // arrayBufferToBase64(buffer) {
        //     var binary = '';
        //     var bytes = [].slice.call(new Uint8Array(buffer));
        //     bytes.forEach((b) => binary += String.fromCharCode(b));
        //     return window.btoa(binary);
        // },
        cancel(){
            this.$emit('back',false)
            this.clearFormData()
        },
        // 清空表单内的数据
        clearFormData(){
            this.form = {
                serier: '',
                serierItem: '',
                imgSrc: '',
                intro: ''
            }
            document.getElementById('inputName').value = ''
        },
        previewFiles(e){
            let _this = this
            let file = e.target.files
            if(file.length === 0) return
            let reader = new FileReader()
            reader.readAsDataURL(file[0])
            reader.onload = function(){
                _this.form.imgSrc = this.result
            }
        },
        delImage(){
            this.form.imgSrc = ''
            document.getElementById('inputName').value = ''
        },
        submit(){
            let params = this.form
            if(this.currentId){
                Object.assign(params,{
                    _id: this.currentId
                })
            }
            let url = '/api/serier/addOrEditSerier'
            axiosPost(url,params).then(res=>{
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: '提交成功'
                    })
                    this.$emit('back',true)
                    this.clearFormData()
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                }
                
            })

        },
    }
}
</script>
<style lang="less" scoped>
    .upload {
        width: 200px;
        height: 80px;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 6px;
        text-align: center;
        line-height: 80px;
        cursor: pointer;
        &:hover {
            border-color: rgb(0, 153, 255);
            i {
                color: rgb(0, 153, 255);
            }
        }
        i {
            font-size: 30px;
            color: #ccc;
            z-index: -2;
        }
        .el-icon-error {
            font-size: 20px;
            position: absolute;
            right: -10px;
            top: -10px;
            z-index: 2;
        }
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 6px;
        }
        input {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            left: 0;
            top: 0;
            cursor: pointer;
        }
    }
</style>