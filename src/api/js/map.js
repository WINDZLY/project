//import '../../../node_modules/echarts/map/js/china.js'
//import '../../../node_modules/echarts/map/js/world.js'
//import echarts from 'echarts'
export default {
    showMap(mapList, text) {
        var MyChart = echarts.init(document.getElementById('map'))
        window.onresize = MyChart.resize
        var myData = mapList
        var optionMap = {
            //backgroundColor:,
            title: {
                text: text,
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            //左侧小导航图标
            visualMap: {  
                show : true,  
                x: 'left',  
                y: 'bottom',
                textStyle:{
                    // fontSize: 6
                },
                splitList: [
                    {start: 1000},{start: 500, end: 999},{start: 100, end: 499},
                    {start: 10, end: 99},{start: 1, end: 9},
                ],  
                color: ['#cc0000', '#ff4d4d', '#ff9999','#ffe5e5']
            },
            series: {
                name: text.slice(2,6),
                type: 'map',
                mapType: 'china',
                roam: true,
                label: {
                    normal: {
                        show: true,
                        //fontSize: 8
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: myData
            }
        }
        MyChart.setOption(optionMap)
    },
    showBarChart(barChartOneList, text) {
        barChartOneList.sort((a, b) => {
            return a.value - b.value
        })
        var name = []
        var value = []
        barChartOneList.forEach(element => {
            name.push(element.name)
            value.push(element.value)
        })


        var MyChart = echarts.init(document.getElementById('barChart'))
        window.onresize = MyChart.resize
        var option = {
            title: {
                //text: text,
                //subtext: '数据来自网络'
                //left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: [text]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: name
            },
            series: [
                {
                    name: text,
                    type: 'bar',
                    data: value
                }
            ]
        }

        MyChart.setOption(option)
    },
    showBarChartTwo(barChartList, id) {
        var name = []
        var ccc = [], cc = [], dc = [], cuc = []
        barChartList.forEach(element => {
            name.push(element.provinceName)
            ccc.push(element.currentConfirmedCount)
            cc.push(element.confirmedCount)
            dc.push(element.deadCount)
            cuc.push(element.curedCount)
        })
        var app = {}

        var chartDom = document.getElementById(id)
        var myChart = echarts.init(chartDom)
        window.onresize = myChart.resize
        var option

        var posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ]

        app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
            },
            verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
            },
            position: {
                options: posList.reduce(function (map, pos) {
                    map[pos] = pos;
                    return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
        }

        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }]
                });
            }
        }


        var labelOption = {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 18,
            rich: {
                name: {
                    //color: 'black',
                    fontSize: 18
                    //distance: 50,
                }
            }
        }

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['累计确诊', '现存确诊', '累计治愈', '累计死亡']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: name
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '累计确诊',
                    type: 'bar',
                    barGap: 0,
                    //color: 'rgb(174, 33, 44)',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: cc
                },
                {
                    name: '现存确诊',
                    type: 'bar',
                    //color: 'rgb(247, 76, 49)',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: ccc
                },
                {
                    name: '累计治愈',
                    type: 'bar',
                    //color: 'rgb(40, 183, 163)',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: cuc
                },
                {
                    name: '累计死亡',
                    type: 'bar',
                    //color: 'rgb(93, 112, 146)',
                    label: labelOption,
                    emphasis: {
                        focus: 'series'
                    },
                    data: dc
                }
            ]
        }

        option && myChart.setOption(option)

    },
    showLineChart(dayChanges, text, select, id) {
        var name = []
        var value = []
        this.getNameAndValue(dayChanges, select, name, value)
        var MyChart = echarts.init(document.getElementById(id))
        window.onresize = MyChart.resize
        var option = {
            title : {
                show : true,
                text : text,
                top : "30px",
                left : 'center',
                textStyle : {
                    color : 'black'
                }
            },
            tooltip : {
                show : true,
                trigger : 'axis'
            },
            dataZoom : [ { // 这个dataZoom组件，默认控制x轴。
                type : 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start : 30, // 左边在 10% 的位置。
                end : 100
            // 右边在 60% 的位置。
            }, { // 这个dataZoom组件，也控制x轴。
                type : 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                start : 0, // 左边在 10% 的位置。
                end : 0
            // 右边在 60% 的位置。
            } ],
            xAxis : {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //更改坐标轴文字颜色
                    }
                },
                data: name
            },
            yAxis : {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //更改坐标轴文字颜色
                    }
                },

            },
            series : [{
                name: '人数',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value
            }]
        }
        MyChart.setOption(option)
    },
    getNameAndValue(dayChanges, select, name, value){
        dayChanges.forEach(element => {
            name.push([element.date.slice(0,4), element.date.slice(5,7), Number(element.date.slice(8,10)) + 1 + ''].join('/'))
            if (select === 1) {
                value.push(element.confirmedCount)
            } else if (select === 2) {
                value.push(element.currentConfirmedCount)
            } else if (select === 3) {
                value.push(element.curedCount)
            } else if (select == 4) {
                value.push(element.deadCount)
            }
        })
    },
    showContinentsLineChart(dayTotalChanges, text, select) {
        var name = []
        var tmp = []
        var value1 = []
        var value2 = []
        var value3 = []
        var value4 = []
        var value5 = []
        var value6 = []
        this.getNameAndValue(dayTotalChanges.asiaDayChange, select, name, value1)
        this.getNameAndValue(dayTotalChanges.europeDayChange, select, tmp, value2)
        this.getNameAndValue(dayTotalChanges.northAmericaDayChange, select, tmp, value3)
        this.getNameAndValue(dayTotalChanges.southAmericaDayChange, select, tmp, value4)
        this.getNameAndValue(dayTotalChanges.africaDayChange, select, tmp, value5)
        this.getNameAndValue(dayTotalChanges.oceaniaDayChange, select, tmp, value6)

        var MyChart = echarts.init(document.getElementById('lineContinentsChart'))
        window.onresize = MyChart.resize
        var option = {
            title : {
                show : true,
                text : text,
                top : "30px",
                left : 'center',
                textStyle : {
                    color : 'black'
                }
            },
            tooltip : {
                show : true,
                trigger: 'axis'
            },
            legend: {
                data: ['亚洲', '欧洲', '北美洲', '南美洲', '非洲', '大洋洲']
            },
            dataZoom : [ { // 这个dataZoom组件，默认控制x轴。
                type : 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                start : 30, // 左边在 10% 的位置。
                end : 100
            // 右边在 60% 的位置。
            }, { // 这个dataZoom组件，也控制x轴。
                type : 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                start : 0, // 左边在 10% 的位置。
                end : 0
            // 右边在 60% 的位置。
            } ],
            xAxis : {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //更改坐标轴文字颜色
                    }
                },
                data: name
            },
            yAxis : {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //更改坐标轴文字颜色
                    }
                },

            },
            series : [{
                name: '亚洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value1
            },{
                name: '欧洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value2
            },{
                name: '北美洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value3
            },{
                name: '南美洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value4
            },{
                name: '非洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value5
            },{
                name: '大洋洲',//鼠标放在折线点上显示的名称
                type: "line",//折线图
                symbolSize: 6,
                data: value6
            }]
        }
        MyChart.setOption(option)
    },
    showWorldMap(mapWorldList, text) {
        var nameMap = this.getWorldName()
        var MyChart = echarts.init(document.getElementById('world'))
        window.onresize = MyChart.resize
        var option = {
            backgroundColor : '',
            title : { //地图显示标题
                show : true,
                text : text,
                top : "30px",
                left : 'center',
                textStyle : {
                    color : 'black'
                }

            },
            visualMap : { //图列显示柱
                type : 'piecewise',
                left : 30,
                realtime : false,
                calculable : true,
                // color: ['green', 'lightgreen','red'],
                pieces : [ {
                    gte : 500000,
                    label : '大于50w'
                }, // (10, Infinity]
                {
                    gte : 100000,
                    lte : 500000,
                    label : '10w~50w'
                }, // (1, 9]
                {
                    gte : 10000,
                    lte : 100000,
                    label : '1w~10w'
                }, {
                    gte : 1000,
                    lte : 10000,
                    label : '1k~1w'
                }, {
                    lte : 1000,
                    label : '小于1k'
                }, ],
                textStyle : {
                    color : 'red'
                }

            },
            toolbox : { //工具栏
                show : false,
                orient : 'vertical',
                top : 50,
                itemGap : 20,
                left : 30,
                feature : {
                    dataView : {
                        readOnly : false
                    },
                    restore : {},
                    saveAsImage : {}
                }
            },
            tooltip : { //提示框组件
                show : true,
                trigger : 'item',
                formatter : ''
            },
            series : [ {
                name : text.slice(7),
                type : 'map',
                mapType : 'world',
                roam : true,
                zoom : 1,
                mapLocation : {
                    y : 100
                },
                data : mapWorldList, //绑定数据
                nameMap : nameMap,
                symbolSize : 12,
                label : {
                    normal : {
                        show : false
                    },
                    emphasis : {
                        show : true
                    }
                },
                itemStyle : {
                    emphasis : {
                        borderColor : 'transparent',
                        borderWidth : 1
                    }
                }
            } ],
        }
        MyChart.setOption(option)
    },
    showPieChart(dayChange, text) {
        var MyChart = echarts.init(document.getElementById('pieChart'))
        window.onresize = MyChart.resize
        var name = []
        dayChange.forEach(element => {
            name.push(element.name)
        })
        var option = {
            title: {
                text: text,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: name
            },
            series: [
                {
                    name: '人数',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: dayChange,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        MyChart.setOption(option)
    },
    getWorldName() {
        // 国家名英文中文对比
        let nameComparison = {
            "Canada": "加拿大",
            "Curaçao": "库拉索岛",
            'N. Cyprus' : '北塞浦路斯',
            "Turkmenistan": "土库曼斯坦",
            "Saint Helena": "圣赫勒拿",
            "Lao PDR": "老挝",
            "Lithuania": "立陶宛",
            "Cambodia": "柬埔寨",
            "Ethiopia": "埃塞俄比亚",
            "Faeroe Is.": "法罗群岛",
            "Swaziland": "斯威士兰",
            "Palestine": "巴勒斯坦",
            "Belize": "伯利兹",
            "Argentina": "阿根廷",
            "Bolivia": "玻利维亚",
            "Cameroon": "喀麦隆",
            "Burkina Faso": "布基纳法索",
            "Aland": "奥兰群岛",
            "Bahrain": "巴林",
            "Saudi Arabia": "沙特阿拉伯",
            "Fr. Polynesia": "法属波利尼西亚",
            "Cape Verde": "佛得角",
            "W. Sahara": "西撒哈拉",
            "Slovenia": "斯洛文尼亚",
            "Guatemala": "危地马拉",
            "Guinea": "几内亚",
            "Dem. Rep. Congo": "刚果（金）",
            "Germany": "德国",
            "Spain": "西班牙",
            "Liberia": "利比里亚",
            "Netherlands": "荷兰",
            "Jamaica": "牙买加",
            "Solomon Is.": "所罗门群岛",
            "Oman": "阿曼",
            "Tanzania": "坦桑尼亚",
            "Costa Rica": "哥斯达黎加",
            "Isle of Man": "曼岛",
            "Gabon": "加蓬",
            "Niue": "纽埃",
            "Bahamas": "巴哈马",
            "New Zealand": "新西兰",
            "Yemen": "也门共和国",
            "Jersey": "泽西岛",
            "Pakistan": "巴基斯坦",
            "Albania": "阿尔巴尼亚",
            "Samoa": "萨摩亚",
            "Czech Rep.": "捷克",
            "United Arab Emirates": "阿联酋",
            "Guam": "关岛",
            "India": "印度",
            "Azerbaijan": "阿塞拜疆",
            "N. Mariana Is.": "北马里亚纳群岛",
            "Lesotho": "莱索托",
            "Kenya": "肯尼亚",
            "Belarus": "白俄罗斯",
            "Tajikistan": "塔吉克斯坦",
            "Turkey": "土耳其",
            "Afghanistan": "阿富汗",
            "Bangladesh": "孟加拉国",
            "Mauritania": "毛里塔尼亚",
            "Dem. Rep. Korea": "朝鲜",
            "Saint Lucia": "圣卢西亚",
            "Br. Indian Ocean Ter.": "英属印度洋领地",
            "Mongolia": "蒙古",
            "France": "法国",
            "Cura?ao": "库拉索岛",
            "S. Sudan": "南苏丹",
            "Rwanda": "卢旺达",
            "Slovakia": "斯洛伐克",
            "Somalia": "索马里",
            "Peru": "秘鲁",
            "Vanuatu": "瓦努阿图",
            "Norway": "挪威",
            "Malawi": "马拉维",
            "Benin": "贝宁",
            "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
            "Korea": "韩国",
            "Singapore": "新加坡",
            "Montenegro": "黑山",
            "Cayman Is.": "开曼群岛",
            "Togo": "多哥",
            "China": "中国",
            "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
            "Armenia": "亚美尼亚",
            "Falkland Is.": "福克兰群岛",
            "Ukraine": "乌克兰",
            "Ghana": "加纳",
            "Tonga": "汤加",
            "Finland": "芬兰",
            "Libya": "利比亚",
            "Dominican Rep.": "多米尼加",
            "Indonesia": "印度尼西亚",
            "Mauritius": "毛里求斯",
            "Eq. Guinea": "赤道几内亚",
            "Sweden": "瑞典",
            "Vietnam": "越南",
            "Mali": "马里",
            "Russia": "俄罗斯",
            "Bulgaria": "保加利亚",
            "United States": "美国",
            "Romania": "罗马尼亚",
            "Angola": "安哥拉",
            "Chad": "乍得",
            "South Africa": "南非",
            "Fiji": "斐济",
            "Liechtenstein": "列支敦士登",
            "Malaysia": "马来西亚",
            "Austria": "奥地利",
            "Mozambique": "莫桑比克",
            "Uganda": "乌干达",
            "Japan": "日本",
            "Niger": "尼日尔",
            "Brazil": "巴西",
            "Kuwait": "科威特",
            "Panama": "巴拿马",
            "Guyana": "圭亚那",
            "Madagascar": "马达加斯加",
            "Luxembourg": "卢森堡",
            "American Samoa": "美属萨摩亚",
            "Andorra": "安道尔",
            "Ireland": "爱尔兰",
            "Italy": "意大利",
            "Nigeria": "尼日利亚",
            "Turks and Caicos Is.": "特克斯和凯科斯群岛",
            "Ecuador": "厄瓜多尔",
            "U.S. Virgin Is.": "美属维尔京群岛",
            "Brunei": "文莱",
            "Australia": "澳大利亚",
            "Iran": "伊朗",
            "Algeria": "阿尔及利亚",
            "El Salvador": "萨尔瓦多",
            "Côte d\'Ivoire": "科特迪瓦",
            "Chile": "智利",
            "Puerto Rico": "波多黎各",
            "Belgium": "比利时",
            "Thailand": "泰国",
            "Haiti": "海地",
            "Iraq": "伊拉克",
            "S?o Tomé and Principe": "圣多美和普林西比",
            "Sierra Leone": "塞拉利昂",
            "Georgia": "格鲁吉亚",
            "Denmark": "丹麦",
            "Philippines": "菲律宾",
            "S. Geo. and S. Sandw. Is.": "南乔治亚岛和南桑威奇群岛",
            "Moldova": "摩尔多瓦",
            "Morocco": "摩洛哥",
            "Namibia": "纳米比亚",
            "Malta": "马耳他",
            "Guinea-Bissau": "几内亚比绍",
            "Kiribati": "基里巴斯",
            "Switzerland": "瑞士",
            "Grenada": "格林那达",
            "Seychelles": "塞舌尔",
            "Portugal": "葡萄牙",
            "Estonia": "爱沙尼亚",
            "Uruguay": "乌拉圭",
            "Antigua and Barb.": "安提瓜和巴布达",
            "Lebanon": "黎巴嫩",
            "Uzbekistan": "乌兹别克斯坦",
            "Tunisia": "突尼斯",
            "Djibouti": "吉布提",
            "Greenland": "格陵兰",
            "Timor-Leste": "东帝汶",
            "Dominica": "多米尼克",
            "Colombia": "哥伦比亚",
            "Burundi": "布隆迪共和国",
            "Bosnia and Herz.": "波黑",
            "Cyprus": "塞浦路斯",
            "Barbados": "巴巴多斯",
            "Qatar": "卡塔尔",
            "Palau": "帕劳",
            "Bhutan": "不丹",
            "Sudan": "苏丹",
            "Nepal": "尼泊尔",
            "Micronesia": "密克罗尼西亚",
            "Bermuda": "百慕大",
            "Suriname": "苏里南",
            "Venezuela": "委内瑞拉",
            "Israel": "以色列",
            "St. Pierre and Miquelon": "圣皮埃尔和密克隆群岛",
            "Central African Rep.": "中非共和国",
            "Iceland": "冰岛",
            "Zambia": "赞比亚共和国",
            "Senegal": "塞内加尔",
            "Papua New Guinea": "巴布亚新几内亚",
            "Trinidad and Tobago": "特立尼达和多巴哥",
            "Zimbabwe": "津巴布韦",
            "Jordan": "约旦",
            "Gambia": "冈比亚",
            "Kazakhstan": "哈萨克斯坦",
            "Poland": "波兰",
            "Eritrea": "厄立特里亚",
            "Kyrgyzstan": "吉尔吉斯斯坦",
            "Montserrat": "蒙特塞拉特",
            "New Caledonia": "新喀里多尼亚",
            "Macedonia": "北马其顿",
            "Paraguay": "巴拉圭",
            "Latvia": "拉脱维亚",
            "Hungary": "匈牙利",
            "Syria": "叙利亚",
            "Honduras": "洪都拉斯",
            "Myanmar": "缅甸",
            "Mexico": "墨西哥",
            "Egypt": "埃及",
            "Nicaragua": "尼加拉瓜",
            "Cuba": "古巴",
            "Serbia": "塞尔维亚",
            "Comoros": "科摩罗",
            "United Kingdom": "英国",
            "Fr. S. Antarctic Lands": "南极洲",
            "Congo": "刚果（布）",
            "Greece": "希腊",
            "Sri Lanka": "斯里兰卡",
            "Croatia": "克罗地亚",
            "Botswana": "博茨瓦纳",
            "Siachen Glacier": "锡亚琴冰川地区"
        }
        return nameComparison
    }
}