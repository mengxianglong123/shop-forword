<template>
    <div class="welcome">
        <h2 style="text-align: center">网站数据概览</h2>
        <transition name="el-zoom-in-center">
            <div style="width: 100%;height: 100%;background: white;padding: 25px;" class="charts">
                <div id="chart-visit" style="width: 50%;height: 45%;" class="chart"></div>
                <div id="chart-time" style="width: 50%;height: 45%;" class="chart"></div>
                <div id="chart-buy" style="width: 50%;height: 45%;" class="chart"></div>
                <div id="chart-reg" style="width: 50%;height: 45%;" class="chart"></div>
            </div>
        </transition>
    </div>

</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "Welcome",
        data(){
            return {

            }
        },
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-visit'));
            myChart.setOption({
                color: ['#3398DB'],
                title:{
                  text:"最近七天访问量"
                },

                xAxis: [
                    {
                        type: 'category',
                        data: ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            });

            /**
             * 时间
             */
            this.time();
            /**
             * 购买量
             */
            this.buy();

            this.reg();
        },
        methods:{
            /**
             * 访问时间
             */
            time(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('chart-time'));
                myChart.setOption({
                    color: ['#3398DB'],
                    title:{
                        text:"最近七天访问时间"
                    },
                    xAxis: {
                        type: 'category',
                        data: ['0:00-5:00', '5:00-7:00', '7:00-9:00', '9:00-12:00', '13:00-18:00', '18:00-23:00', '23:00-0:00']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                });
            },

            buy(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('chart-buy'));
                myChart.setOption({
                    color: ['#3398DB','#67C23A','#E6A23C','#456C6C','#329FFF'],
                    title:{
                        text:"最近七天访问来源"
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 10,
                        left: 'center',
                        data: ['西凉', '益州', '兖州', '荆州', '幽州']/*显示条*/
                    },
                    series: [
                        {
                            name: '直接访问',
                            type: 'pie',
                            barWidth: '60%',
                            data:[
                                {value:335, name:'湖南'},
                                {value:310, name:'湖北'},
                                {value:234, name:'河北'},
                                {value:135, name:'河南'},
                                {value:1548, name:'北京'}
                            ]
                        }
                    ]
                });
            },

            reg(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('chart-reg'));
                myChart.setOption({
                    color: ['#3398DB'],
                    title:{
                        text:"最近七天注册量"
                    },

                    xAxis: [
                        {
                            type: 'category',
                            data: ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [105, 252, 200, 334, 700, 330, 220]
                        }
                    ]
                });
            }

        }
    }
</script>

<style scoped>
    .welcome{
        width: 100%;
        height: 100%;
        /*background: white;*/
        margin-top: -25px;
    }
    .charts{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .chart{
        display: inline-block;
    }
</style>