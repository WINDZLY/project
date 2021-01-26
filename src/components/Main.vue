<template>
    <div>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
       <h3>中国疫情</h3>
       <p class="txt">数据来源:中国及各地卫建委每日发布</p>
       <p class="txt">数据非实时刷新，可能有误差，仅供参考，更新于 {{timer | formatTimer}}</p>

       <div class="flexbox">
           <span class="item">
               <div class="red bold">{{chinaNow.currentConfirmedCount}}</div>
               <div class="txt bold">现存确诊</div>
           </span>
           <span class="item">
               <div class="lightRed bold">{{chinaNow.confirmedCount}}</div>
               <div class="txt bold">累计确诊</div>
           </span>
           
       </div>
       <div class="flexbox">
           <span class="item">
               <div class="green bold">{{chinaNow.curedCount}}</div>
               <div class="txt bold">累计治愈</div>
           </span>
           <span class="item">
               <div class="gray bold">{{chinaNow.deadCount}}</div>
               <div class="txt bold">累计死亡</div>
           </span>
       </div>


       <div>
           <div>
               <h3>国内疫情地图</h3>
            </div>
            
            <div>
                <el-radio-group v-model="chinaRadioOne" @change="selectChinaRadioOne()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                </el-radio-group>
            </div>
       </div>

       <div id = "map" style="width: 100%; height: 400px"></div>
       
       <div>
           <div>
               <h3>国内疫情柱状图</h3>
           </div>
           <div>
                <el-radio-group v-model="chinaRadioTwo" @change="selectChinaRadioTwo()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                    <el-radio-button label="累计治愈"></el-radio-button>
                    <el-radio-button label="累计死亡"></el-radio-button>
                </el-radio-group>
            </div>
       </div>
       <div id = "barChart" style="width: 100%; height: 650px"></div>


        <div>
            <div>
               <h3>国内疫情趋势</h3>
           </div>
           <div>
                <el-radio-group v-model="chinaRadioThree" @change="selectChinaRadioThree()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                    <el-radio-button label="累计治愈"></el-radio-button>
                    <el-radio-button label="累计死亡"></el-radio-button>
                </el-radio-group>
            </div>
       </div>
       <div id = "lineChart" style="width: 100%; height: 650px"></div>

       <div class="textData">
           <span class="span">地区</span>
           <span class="span" style="color: rgb(247, 76, 49)">现存确诊</span>
           <span class="span lightRed">确诊</span>
           <span class="span gray">死亡</span>
           <span class="span green">治愈</span>
       </div>

       <div v-for="item in newListData">
            <div class="data" @click="showCities($event, item)">
                <span class="span">{{item.provinceShortName}}</span>
                <span class="span gray">{{item.currentConfirmedCount}}</span>
                <span class="span gray">{{item.confirmedCount}}</span>
                <span class="span gray">{{item.deadCount}}</span>
                <span class="span gray">{{item.curedCount}}
                    <i class="fa fa-caret-down" v-if = "!item.expand" />
                    <i  class="fa fa-caret-up" v-if = "item.expand"/>
                </span>
            </div>
            <div class="cities">
                <div class="data" style="background-color: white;" v-for="city in item.cities">
                    <span class="span gray">{{city.cityName}}</span>
                    <span class="span gray">{{item.flag_ccc == 0 ? city.currentConfirmedCount : '--'}}</span>
                    <span class="span gray">{{item.flag_cc == 0 ? city.confirmedCount : '--'}}</span>
                    <span class="span gray">{{item.flag_dc == 0 ? city.deadCount : '--'}}</span>
                    <span class="span gray">{{item.flag_cuc == 0 ? city.curedCount : '--'}}</span>
                </div>
                <div>
                    <span  v-if="item.flag_ccc || item.flag_cc ||
                    item.flag_dc || item.flag_cuc">数据为"--"是因为卫健委还没有明确分区归属</span>
                </div>
            </div>
       </div>

       <div class = "morecountry" @click="showMoreOrLessOne(msgOne)">
           <span class="gray">{{msgOne.msg}}</span>
       </div>
       
       <h3>全球疫情</h3>
       <p class="txt">数据来源:国内权威媒体，海外各地卫生部门官方网站和主流媒体</p>
       <p class="txt">数据非实时刷新，可能有误差，仅供参考，更新于 {{timer | formatTimer}}</p>

       <div class="flexbox">
           <div class="item">
               <div class="red bold">{{worldNow.currentConfirmedCount}}</div>
               <div class="txt bold">现存确诊</div>
           </div>
           <div class="item">
               <div class="lightRed bold">{{worldNow.confirmedCount}}</div>
               <div class="txt bold">累计确诊</div>
           </div>
       </div>

       <div class="flexbox">
           <div class="item">
               <div class="green bold">{{worldNow.curedCount}}</div>
               <div class="txt bold">累计治愈</div>
           </div>
           <div class="item">
               <div class="gray bold">{{worldNow.deadCount}}</div>
               <div class="txt bold">累计死亡</div>
           </div>
       </div>

        <div>
            <div>
               <h3>全球疫情地图</h3>
            </div>
            
            <div>
                <el-radio-group v-model="worldRadioOne" @change="selectWorldRadioOne()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                </el-radio-group>
            </div>
       </div>

       <div id="world" style="width: 100%; height: 650px"></div>

        <div>
            <div>
               <h3>全球疫情趋势</h3>
           </div>
           <div>
                <el-radio-group v-model="worldRadioTwo" @change="selectWorldRadioTwo()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                    <el-radio-button label="累计治愈"></el-radio-button>
                    <el-radio-button label="累计死亡"></el-radio-button>
                </el-radio-group>
            </div>
       </div>
       <div id = "lineWorldChart" style="width: 100%; height: 650px"></div>

       
        <div>
            <h3>全球疫情最严重的前六国家</h3>
        </div>
       <div id = "barWorldCountryChart" style="width: 100%; height: 650px"></div>

       
       
       <div class="textData">
           <span class="span">地区</span>
           <span class="span" style="color: rgb(247, 76, 49)">现存确诊</span>
           <span class="span lightRed">确诊</span>
           <span class="span gray">死亡</span>
           <span class="span green">治愈</span>
       </div>

       <div v-for="item in countries">
            <div class="data" >
                <span class="span">{{item.provinceName}}</span>
                <span class="span gray">{{item.currentConfirmedCount}}</span>
                <span class="span gray">{{item.confirmedCount}}</span>
                <span class="span gray">{{item.deadCount}}</span>
                <span class="span gray">{{item.curedCount}}</span>
            </div>
       </div>
       <div class = "morecountry" @click="showMoreOrLessTwo(msgTwo)">
           <span class="gray">{{msgTwo.msg}}</span>
       </div>


       <div>
           <div>
               <h3>各大洲疫情饼状图</h3>
           </div>
           <div>
                <el-radio-group v-model="continentsRadioOne" @change="selectContinentsRadioOne()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                    <el-radio-button label="累计治愈"></el-radio-button>
                    <el-radio-button label="累计死亡"></el-radio-button>
                </el-radio-group>
            </div>
       </div>
       <div id = "pieChart" style="width: 100%; height: 500px"></div>

       <div>
            <div>
               <h3>各大洲疫情趋势</h3>
           </div>
           <div>
                <el-radio-group v-model="continentsRadioTwo" @change="selectContinentsRadioTwo()">
                    <el-radio-button label="现存确诊"></el-radio-button>
                    <el-radio-button label="累计确诊"></el-radio-button>
                    <el-radio-button label="累计治愈"></el-radio-button>
                    <el-radio-button label="累计死亡"></el-radio-button>
                </el-radio-group>
            </div>
       </div>
       <div id = "lineContinentsChart" style="width: 100%; height: 650px"></div>
      
    </div>
</template>

<script>
//import echarts from 'echarts'
//import '../../node_modules/echarts/map/js/china.js'
//import '../../node_modules/echarts/map/js/world.js'
import myMap from '../api/js/map'
export default {
    name: 'Main',
    data () {
        return {
            chinaRadioOne: '累计确诊',
            chinaRadioTwo: '累计确诊',
            chinaRadioThree: '累计确诊',
            worldRadioOne: '累计确诊',
            worldRadioTwo: '累计确诊',
            worldRadioThree: '累计确诊',
            continentsRadioOne: '累计确诊',
            continentsRadioTwo: '累计确诊',
            baseURL: process.env.BASE_API,
            msgOne: {
                msg: '查看更多地区',
                flag: 0,
            },
            msgTwo: {
                msg: '查看更多地区',
                flag: 0,
            },
            expand: 0,
            newListData: [], //中国疫情数据
            tmpListData: [], //中国疫情临时数据
            chinaNow: {}, //中国疫情总数据
            worldNow: {},//世界疫情总数据
            tmpCountries: [],//世界疫情临时数据
            countries: [], //世界疫情数据
            timer: '', // 日期
            mapChinaNowList: [],//中国疫情现存确诊总数据
            mapChinaTotalList: [],//中国疫情累计确诊总数据
            mapChinaDeadList: [], //中国累计死亡
            mapChinaCuredList: [], //中国累计治愈
            dayChinaChanges: [],//中国疫情每日变化
            mapWorldNowList: [],//世界国家疫情现存确诊总数据
            mapWorldTotalList: [],//世界国家疫情累计确诊总数据
            mapWorldDeadList: [], //世界国家累计死亡
            mapWorldCuredList: [], //世界国家累计治愈
            dayWorldChanges: [], //世界每日数据
            dayTotalContinents: {},// 各大洲每日总数据
            dayContinents: [],//各大洲每日数据
            dayChangeOneInContinents: {
                //大洲总确诊
                mapContinentsTotalList: [],
                //大洲现存确诊
                mapContinentsNowList: [],
                //大洲累计死亡
                mapContinentsDeadList: [],
                // 大洲累计治愈
                mapContinentsCuredList: []
            } //个大洲切换每日（现存，累计，……）数据总集合
        }
    },
    filters: {
        formatTimer: function(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d;
        }
    },
    created () {
        this.getWorldData()
        this.getChinaData()
        this.getDayDataInChina()
        this.getDayDataInContinents()
        this.getDayDataInWorld()
        
    },
    mounted() {
        
    },
    methods: {
        showMoreOrLessOne(theMsg) {
            if (theMsg.flag == 0) {
                theMsg.msg = "收起更多地区"
                this.newListData = this.tmpListData
            } else {
                theMsg.msg = "查看更多地区"
                this.newListData = this.newListData.slice(0,6)
            }
            theMsg.flag = !theMsg.flag
        },
        showMoreOrLessTwo(theMsg) {
            if (theMsg.flag == 0) {
                theMsg.msg = "收起更多地区"
                this.countries = this.tmpCountries
            } else {
                theMsg.msg = "查看更多地区"
                this.countries = this.tmpCountries.slice(0,6)
            }
            theMsg.flag = !theMsg.flag
        },
        showCities(e, item) {
            let row = e.currentTarget
            let cities = row.nextElementSibling
            if (cities.style.display == "block") {
                cities.style.display = "none"
            } else {
                cities.style.display = "block"
            }
            this.$set(item, "expand", !item.expand)
        },
        getWorldData() {
            // 获取世界疫情的数据
            this.$axios.get(`${this.baseURL}/getDataByWorld`)
            .then(response => {
                var ccc = 0, cc = 0, dc = 0, cuc = 0
                this.tmpCountries = response.data.data.countries
                this.tmpCountries.forEach(element => {
                    if (element.provinceName === '中国') {
                        this.chinaNow = element
                    }
                    ccc += element.currentConfirmedCount
                    cc += element.confirmedCount
                    dc += element.deadCount
                    cuc += element.curedCount
                    var objTotal = {}
                    objTotal.name = element.provinceName
                    objTotal.value = element.confirmedCount
                    //世界国家累计确诊
                    this.mapWorldTotalList.push(objTotal)
                    //深复制一个数据
                    var objNow = JSON.parse(JSON.stringify(objTotal))
                    //世界国家现存确诊
                    objNow.value = element.currentConfirmedCount
                    this.mapWorldNowList.push(objNow)
                    //世界国家累计死亡
                    var objDead = JSON.parse(JSON.stringify(objTotal))
                    objDead.value = element.deadCount
                    this.mapWorldDeadList.push(objDead)
                    // 世界国家累计治愈
                    var objCured = JSON.parse(JSON.stringify(objDead))
                    objCured.value = element.curedCount
                    this.mapWorldCuredList.push(objCured)
                })
                this.worldNow.currentConfirmedCount = ccc
                this.worldNow.confirmedCount = cc
                this.worldNow.deadCount = dc
                this.worldNow.curedCount = cuc
                // 展示世界国家数据
                this.countries = response.data.data.countries.slice(0,6)
                this.showWorldMap(this.mapWorldTotalList, '全球疫情地图-累计确诊数')
                this.showBarChartTwo(this.countries.slice(0,6), 'barWorldCountryChart')
            })
            .catch(respose => {
            })
        },
        getChinaData() {
            this.$axios.get(`${this.baseURL}/getDataByChina`)
            .then(response => {
                // 临时数据保存
                this.tmpListData = response.data.data.provinces
                for (var i = 0; i < this.tmpListData.length; i ++) {
                    this.timer = this.tmpListData[i].date
                    // 标志数据是否混乱
                    this.tmpListData[i].flag_ccc = 0
                    this.tmpListData[i].flag_cc = 0
                    this.tmpListData[i].flag_dc = 0
                    this.tmpListData[i].flag_cuc = 0
                    var objTotal = {}
                    objTotal.name = this.tmpListData[i].provinceShortName
                    objTotal.value = this.tmpListData[i].confirmedCount
                    //中国累计确诊
                    this.mapChinaTotalList.push(objTotal)
                    //深复制一个数据
                    var objNow = JSON.parse(JSON.stringify(objTotal))
                    //中国现存确诊
                    objNow.value = this.tmpListData[i].currentConfirmedCount
                    this.mapChinaNowList.push(objNow)
                    //中国累计死亡
                    var objDead = JSON.parse(JSON.stringify(objTotal))
                    objDead.value = this.tmpListData[i].deadCount
                    this.mapChinaDeadList.push(objDead)
                    // 中国累计治愈
                    var objCured = JSON.parse(JSON.stringify(objDead))
                    objCured.value = this.tmpListData[i].curedCount
                    this.mapChinaCuredList.push(objCured)
                    
                    for (var j = 0; j < this.tmpListData[i].cities.length; j ++) {
                        if (this.tmpListData[i].cities[j].currentConfirmedCount < 0) this.tmpListData[i].flag_ccc = 1
                        if (this.tmpListData[i].cities[j].confirmedCount < 0) this.tmpListData[i].flag_cc = 1
                        if (this.tmpListData[i].cities[j].deadCount < 0) this.tmpListData[i].flag_dc = 1
                        if (this.tmpListData[i].cities[j].curedCount < 0) this.tmpListData[i].flag_cuc = 1
                    }
                }
                //展示数据
                this.newListData = this.tmpListData.slice(0,6)
                this.showMap(this.mapChinaTotalList, '中国累计确诊疫情地图')
                this.showBarChart(this.mapChinaTotalList, '累计确诊')
                
            })
            .catch(response => {
            })
        },
        getDayDataInChina() {
            this.$axios.get(`${this.baseURL}/getDayDataInChina`)
            .then(response => {
                this.dayChinaChanges = response.data.data.dayChinaChanges
                this.showLineChart(this.dayChinaChanges, '中国累计确诊曲线', 1, 'lineChart')
            })
            .catch(response => {
            })
        },
        getDayDataInWorld() {
            this.$axios.get(`${this.baseURL}/getDayDataInWorld`)
            .then(response => {
                this.dayWorldChanges = response.data.data.dayWorldChanges
                this.showLineChart(this.dayWorldChanges, '全球累计确诊曲线', 1, 'lineWorldChart')
            })
            .catch(response => {
            })
        },
        getDayDataInContinents() {
            this.$axios.get(`${this.baseURL}/getDayDataInContinents`)
            .then(response => {
                this.dayTotalContinents =  response.data.data.dayContinents.dayContinents
                var len = this.dayTotalContinents.asiaDayChange.length
                this.dayContinents.push(this.dayTotalContinents.asiaDayChange[len - 1])
                this.dayContinents.push(this.dayTotalContinents.europeDayChange[len - 1])
                this.dayContinents.push(this.dayTotalContinents.northAmericaDayChange[len - 1])
                this.dayContinents.push(this.dayTotalContinents.southAmericaDayChange[len - 1])
                this.dayContinents.push(this.dayTotalContinents.africaDayChange[len - 1])
                this.dayContinents.push(this.dayTotalContinents.oceaniaDayChange[len - 1])
                
                this.dayContinents.forEach(element => {
                    var objTotal = {}
                    objTotal.name = element.areaName
                    objTotal.value = element.confirmedCount
                    //大洲累计确诊
                    this.dayChangeOneInContinents.mapContinentsTotalList.push(objTotal)
                    //深复制一个数据
                    var objNow = JSON.parse(JSON.stringify(objTotal))
                    //大洲现存确诊
                    objNow.value = element.currentConfirmedCount
                    this.dayChangeOneInContinents.mapContinentsNowList.push(objNow)
                    //大洲累计死亡
                    var objDead = JSON.parse(JSON.stringify(objTotal))
                    objDead.value = element.deadCount
                    this.dayChangeOneInContinents.mapContinentsDeadList.push(objDead)
                    // 大洲累计治愈
                    var objCured = JSON.parse(JSON.stringify(objDead))
                    objCured.value = element.curedCount
                    this.dayChangeOneInContinents.mapContinentsCuredList.push(objCured)
                })
                this.showPieChart(this.dayChangeOneInContinents.mapContinentsTotalList, '各大洲累计确诊')
                this.showContinentsLineChart(this.dayTotalContinents, '各大洲累计确诊曲线', 1)
            })
            .catch(response => {
            })
        },
        showMap(mapList, text) {
           myMap.showMap(mapList, text)
        },
        showBarChart(barChartOneList, text) {
            myMap.showBarChart(barChartOneList, text)
        },
        showLineChart(dayChanges, text, select, id) {
            myMap.showLineChart(dayChanges, text, select, id)
        },
        showWorldMap(mapWorldList, text) {
            myMap.showWorldMap(mapWorldList, text)
        },
        showPieChart(dayChange, text) {
            myMap.showPieChart(dayChange, text)
        },
        showContinentsLineChart(dayTotalContinents, text, select) {
            myMap.showContinentsLineChart(this.dayTotalContinents, text, select)
        },
        showBarChartTwo(barChartList, text, id) {
            myMap.showBarChartTwo(barChartList, 'barWorldCountryChart')
        },
        selectChinaRadioOne() {
            if (this.chinaRadioOne === '现存确诊') {
                this.showMap(this.mapChinaNowList, '中国现存确诊疫情地图')
            } else if (this.chinaRadioOne === '累计确诊') { 
                this.showMap(this.mapChinaTotalList, '中国累计确诊疫情地图')
            }
        },
        selectChinaRadioTwo() {
            if (this.chinaRadioTwo === '现存确诊') {
                this.showBarChart(this.mapChinaNowList, '现存确诊')
            } else if (this.chinaRadioTwo === '累计确诊') { 
                this.showBarChart(this.mapChinaTotalList, '累计确诊')
            } else if (this.chinaRadioTwo === '累计治愈') {
                this.showBarChart(this.mapChinaCuredList, '累计治愈')
            } else if (this.chinaRadioTwo === '累计死亡') {
                this.showBarChart(this.mapChinaDeadList, '累计死亡')
            }
        },
        selectChinaRadioThree() {
            if (this.chinaRadioThree === '现存确诊') {
                this.showLineChart(this.dayChinaChanges, '现存确诊', 2, 'lineChart')
            } else if (this.chinaRadioThree === '累计确诊') { 
                this.showLineChart(this.dayChinaChanges, '累计确诊', 1, 'lineChart')
            } else if (this.chinaRadioThree === '累计治愈') {
                this.showLineChart(this.dayChinaChanges, '累计治愈', 3, 'lineChart')
            } else if (this.chinaRadioThree === '累计死亡') {
                this.showLineChart(this.dayChinaChanges, '累计死亡', 4, 'lineChart')
            }
        },
        selectWorldRadioOne() {
            if (this.worldRadioOne === '现存确诊') {
                this.showWorldMap(this.mapWorldNowList, '全球疫情地图-现存确诊数')
            } else if (this.worldRadioOne === '累计确诊') { 
                this.showWorldMap(this.mapWorldTotalList, '全球疫情地图-累计确诊数')
            }
        },
        selectWorldRadioTwo() {
            if (this.worldRadioTwo === '现存确诊') {
                this.showLineChart(this.dayWorldChanges, '全球现存确诊曲线', 2, 'lineWorldChart')
            } else if (this.worldRadioTwo === '累计确诊') { 
                this.showLineChart(this.dayWorldChanges, '全球累计确诊曲线', 1, 'lineWorldChart')
            } else if (this.worldRadioTwo === '累计治愈') {
                this.showLineChart(this.dayWorldChanges, '全球累计治愈曲线', 3, 'lineWorldChart')
            } else if (this.worldRadioTwo === '累计死亡') {
                this.showLineChart(this.dayWorldChanges, '全球累计死亡曲线', 4, 'lineWorldChart')
            }
        },
        selectContinentsRadioOne() {
            if (this.continentsRadioOne === '现存确诊') {
                this.showPieChart(this.dayChangeOneInContinents.mapContinentsNowList, '各大洲现存确诊', 2)
            } else if (this.continentsRadioOne === '累计确诊') { 
                this.showPieChart(this.dayChangeOneInContinents.mapContinentsTotalList, '各大洲累计确诊', 1)
            } else if (this.continentsRadioOne === '累计治愈') {
                this.showPieChart(this.dayChangeOneInContinents.mapContinentsCuredList, '各大洲累计治愈', 3)
            } else if (this.continentsRadioOne === '累计死亡') {
                this.showPieChart(this.dayChangeOneInContinents.mapContinentsDeadList, '各大洲累计死亡', 4)
            }
        },
        selectContinentsRadioTwo() {
            if (this.continentsRadioTwo === '现存确诊') {
                this.showContinentsLineChart(this.dayTotalContinents, '各大洲现存确诊曲线', 2)
            } else if (this.continentsRadioTwo === '累计确诊') { 
                this.showContinentsLineChart(this.dayTotalContinents, '各大洲累计确诊曲线', 1)
            } else if (this.continentsRadioTwo === '累计治愈') {
                this.showContinentsLineChart(this.dayTotalContinents, '各大洲累计治愈曲线', 3)
            } else if (this.continentsRadioTwo === '累计死亡') {
                this.showContinentsLineChart(this.dayTotalContinents, '各大洲累计死亡曲线', 4)
            }
        },
    
    }
}
</script>

<style scoped>
    @import "../api/css/myStyle.css";
</style>
© 2021 GitHub, Inc.