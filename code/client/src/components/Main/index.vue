<template>
    <div>
        <Header/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script>
import Header from '../Header'
export default {
    components: {
        Header
    },
    data(){
        return {}
    }
}
</script>
<style lang="less" scoped>
    .content {
        margin-top: 60px;
        padding: 20px 200px;
    }
    @media (max-width: 700px) {
        .content {
            margin-top: 40px;
            padding: 20px 0;
        }
    }
</style>