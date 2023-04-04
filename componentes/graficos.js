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
            useDirtyRect: false
        });

        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: "vertical",
                left: "left"
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {
                            value: egresos,
                            name: 'Egresos',
                            itemStyle: {
                                color: '#FF6767'
                            }
                        },
                        {
                            value: ingresos,
                            name: 'Ingresos',
                            itemStyle: {
                                color: '#00d2ff'
                            }
                        },

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
    }
}