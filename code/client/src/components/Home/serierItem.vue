<template>
    <div class="serierItem" @click="toDetail">
        <p>
            <i class="blog-iconmulu"></i>
            <span>{{name}}</span>
        </p>
        <img v-if="!!imgUrl" :src="imgUrl" alt="" />
        <div>
            <p>{{description}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: ['name','imgUrl','description','id'],
    data() {
        return {}
    },
    methods: {
        toDetail() {
            this.$router.push({
                path: '/detail',
                query: {
                    serierItem: this.name
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .serierItem {
        padding: 20px 10px;
        cursor: pointer;
        background-color: #f6f6f6;
        transition: all .5s;
        >p {
            font-size: 16px;
            line-height: 24px;
            i {
                color: #f56f56;
            }
            span {
                margin-left: 10px;
            }
        }
        img {
            margin-top: 20px;
            width: 100%;
            height: 160px;
        }
        >div {
            padding: 20px 0 0 0;
            p {
                line-height: 18px;
            }
        }
    }
    .serierItem:hover {
        transform: scale(1.1);
        border-radius: 10px;
        box-shadow: 0 0 10px 2px #1d5da1;
    }
</style>