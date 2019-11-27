<template>
    <div class="main">
        <aside class="clearfix">
            <p class="title">文章系列</p>
            <hr>
            <serierItem
            v-for="(item,i) in seriers" 
            :key="i"
            :name="item.serierItem"
            :imgUrl="item.imgSrc"
            :description="item.intro"
            :id="item._id"
            ></serierItem>
        </aside>
        <div class="clearfix">
            <div class="new">
                <p class="title">最新发表</p>
                <hr>
                <articleItem
                v-for="(item,i) in newArticles" 
                :key="i"
                :title="item.title"
                :createdAt="item.createdAt"
                :summarize="item.summarize"
                :serierLabel="item.serier"
                :readNums="item.readNum"
                :commentNums="item.commentNum"
                :id="item._id"
                ></articleItem>
            </div>
            <div class="hot">
                <p class="title">热门文章</p>
                <hr>
                <articleItem
                v-for="(item,i) in hotArticles" 
                :key="i"
                :title="item.title"
                :createdAt="item.createdAt"
                :summarize="item.summarize"
                :serierLabel="item.serier"
                :readNums="item.readNum"
                :commentNums="item.commentNum"
                :id="item._id"
                ></articleItem>
            </div>
        </div>
    </div>
</template>
<script>
import serierItem from './serierItem'
import articleItem from './articleItem'
import {axiosGet} from '../../utils/request'
import arrayBufferToBase64 from '../../utils/getImageUrl'
import moment from 'moment'
export default {
  name: 'HelloWorld',
  components: {
    serierItem,
    articleItem
  },
  data () {
    return {
      seriers: [
        {
          id:1,
          serierItem: 'javascript',
          imgSrc: 'https://cdn.timsrc.com/JavaScript%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B-1557797820558',
          intro: '异步是JavaScript中最令人困惑的语言特性之一，清晰的认识JavaScript异步结构，可以帮助我们减少对JavaScript这门语言的困惑。本书旨在介绍JavaScript中的异步编程，并提供一些必要的技巧来编写整洁、可维护的异步代码。'
        }
      ],
      newArticles: [
        {
          id:1,
          title: 'title1',
          createdAt: '2019-09-25',
          summarize:'已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：  1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数)',
          serierLabel: 'javascript',
          readNums: 122,
          commentNums: 10
        }
      ],
      hotArticles: [
         {
          id:1,
          title: 'title1',
          createdAt: '2019-09-25',
          summarize:'已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：  1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数)',
          serierLabel: 'javascript',
          readNums: 122,
          commentNums: 10
        },
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
     init(){
          this.getSerierOptions()
          this.getHotArticles()
          this.getLastestArticles()
      },
       // 获取热门
      getHotArticles(){
          let url = `/api/home/hot_articles`
          axiosGet(url).then(res=>{
              if(res.data.code === 200){
                  let datalist = res.data.data
                  datalist.forEach(item=>{
                      item.createdAt = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
                  })
                  this.hotArticles = datalist
              }else if(res.data.code === 500){
                  this.$message({
                      type: 'error',
                      message: res.data.message
                  });
              }
          })
        },
        // 获取最新
        getLastestArticles(){
            let url = `/api/home/lastest_articles`
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    let datalist = res.data.data
                    datalist.forEach(item=>{
                        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
                    })
                    this.newArticles = datalist
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        getSerierOptions(){
            let url = '/api/home/serier_list'
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    let datalist = res.data.data
                    datalist.forEach(item=>{
                        item.imgSrc = arrayBufferToBase64(item.imgSrc.data.data);
                    })
                    this.seriers = datalist
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
  },
}
</script>
<style lang="less" scoped>
.main {
    p.title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      padding-left: 10px;
    }
    hr {
      border: 1px solid #f56f56;
    }
    aside {
      float: left;
      width: 300px;
      margin-right: 20px;
      padding: 20px 0;
    }
    >div {
      float: left;
      width: calc(100% - 320px);
      .new,.hot {
        padding: 20px 0;
        
      }
    }    
}
</style>