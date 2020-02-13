<template>
    <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
            @prev-click="next"
            @next-click="prev"
            :page-size="pageSize">
    </el-pagination>
</template>

<script>
    export default {
        name: "Page",
        data(){
            return{
                total:0,
                pageSize:5
            }
        },
        created(){
          // 获取商品总数
          req.get("/seller/selNum")
              .then(rep => {
                  this.total = rep.data.data;
              })
        },
        methods:{
            // 下一页
            next(pageNum){
                this.updatePage(pageNum);
            },
            // 上一页
            prev(pageNum){
                this.updatePage(pageNum);
            },
            // 直接点击页号
            currentChange(pageNum){
                this.updatePage(pageNum);
            },
            /**
             * 根据页号更新页面内容
             */
            updatePage(pageNum){
                req({
                    method:"get",
                    url:"seller/selByPage",
                    params: {
                        pageNum: pageNum
                    }
                }).then(rep => {
                    // 更新数据
                    this.$store.commit('updateSeller',rep.data.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>