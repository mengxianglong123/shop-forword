<template>
    <div>
        <Header></Header>
        <Table></Table>
        <Page></Page>
        <Add></Add>
        <Update></Update>
    </div>

</template>

<script>
    import Table from './children/Table'
    import Header from './children/Header'
    import Add from './children/Add'
    import Page from './children/Page'
    import Update from './children/Update'
    export default {
        name: "Seller",
        components:{
            Table,
            Header,
            Add,
            Page,
            Update
        }
    }
</script>

<style scoped>

</style>