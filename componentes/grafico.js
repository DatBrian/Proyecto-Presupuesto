export default {
    all() {
        let reload = document.querySelector("#reload");

        reload.addEventListener("click", (e) => {
            location.reload();
        });

        let ingresos = parseInt(localStorage.getItem('ingresos')) || 0;
        let egresos = parseInt(localStorage.getItem('egresos')) || 0;

        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: true
        });


        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 12,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        name: "hi",
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: egresos, name: 'Egresos', itemStyle: { color: "rgb(236, 65, 102)" } },
                        { value: ingresos, name: 'Ingresos', itemStyle: { color: "rgb(0,182,260)" } },

                    ]
                }
            ]
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

    }
}


