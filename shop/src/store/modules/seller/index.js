/**
 * 商家模块状态
 * @author 孟祥龙
 */
const seller = {
    state: {
        tableData: null, // 数据内容
        addDialog:false, // 控制添加弹窗
        editDialog:false, // 控制编辑弹窗
        editId:"",//需要更新商品的id
    },
    mutations: {
        /**
         * 更新表格数据
         * @param state
         * @param payload
         */
        updateSeller(state, payload) {
            state.tableData = payload
        },
        /**
         * 控制添加对话框
         * @param state
         * @param paylod
         */
        changeAddSellerDialog(state,paylod){
            state.addDialog = paylod;
        },
        /**
         * 控制编辑对话框
         * @param state
         * @param paylod
         */
        changeEditSellerDialog(state,paylod){
            state.editDialog = paylod;
        },
        /**
         * 传递需要更新的商家的id
         * @param state
         * @param paylod
         */
        changeEditSellerId(state,paylod){
            state.editId = paylod;
        }
    },
    getters: {

    },
    actions: {

    }
}
export default seller