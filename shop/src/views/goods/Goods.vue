<template>
    <div class="goods">
        <!--顶部搜索-->
        <Header></Header>
        <!--表格-->
        <Table></Table>
        <!--分页-->
        <Page></Page>
        <!--添加内容对话框-->
        <Add></Add>
        <!--更新内容对话框-->
        <Update></Update>
    </div>
</template>

<script>
    import Table from './children/Table'
    import Page from './children/Page'
    import Header from "./children/Header";
    import Add from './children/Add'
    import Update from './children/Update'
    export default {
        name: "Goods",
        components:{
            Update,
            Add,
            Header,
            Table,
            Page
        },
        data() {
            return {

            }
        },

        methods: {


        }
    }
</script>

<style scoped>

</style>