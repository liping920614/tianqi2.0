<template>
    <div class="container">
        <h3 class="center">{{city}}</h3>
        <h4>今日天气</h4>
        <div class="center specia"><img :src="imgurl"><span>{{type}}</span></div>
        <div class="center"><span>{{fl}}</span></div>
        <div class="center"><span>{{fx}}</span></div>
        <div class="center"><span>{{high}}</span></div>
        <div class="center"><span>{{low}}</span></div>
        <h4>近5日天气</h4>
        <div class="center">
            <div v-for="ele in forecast" class="forecast">
                <ul v-bind:class="$index==1?'active':'noactive'">
                    <li>{{ele.date.slice(0,parseInt(ele.date).toString().length+1)}}</li>
                    <li>{{ele.date.slice(parseInt(ele.date).toString().length+1)}}</li>
                    <li><img v-bind:src="setImgUrl(ele.type)" v-bind:alt="ele.type"></li>
                    <li>{{parseInt(ele.low.slice(2))+'℃ ↑'}}</li>
                    <li>{{parseInt(ele.high.slice(2))+'℃  ↓'}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                city:null,
                imgurl:null,
                type:null,
                fl:null,
                fx:null,
                forecast:null,
                high:null,
                low:null
            }
        },
        methods:{
            getWeather:function(){
           
                this.$http.jsonp('http://wthrcdn.etouch.cn/weather_mini?',{
                    city:this.$route.params.id?this.$route.params.id:"深圳"
                },{
                    jsonp:"callback"
                }).then(function(res){
                    //console.log(res.data);
                    this.forecast=res.data.data.forecast;
                    this.city=res.data.data.city;
                    this.type=res.data.data.yesterday.type;
                    this.fl=res.data.data.yesterday.fl;
                    this.fx=res.data.data.yesterday.fx;
                    this.imgurl=this.setImgUrl(this.type);
                    this.high=res.data.data.yesterday.high;
                    this.low=res.data.data.yesterday.low;
                   // console.log(this.type+""+this.imgurl);
                },function(){
                    console.log('调用失败');
                });
            },
            setImgUrl:function(value){
                var result;
                switch(value){
                    //图片资源来源http://www.tianqi.com/
                    case "晴":result="../imgs/qing.gif";break;
                    case "多云":result="../imgs/duoyun.gif";break;
                    case "阴":result="../imgs/ying.gif";break;
                    case "阵雨":result="../imgs/zhenyu.gif";break;
                    case "雷阵雨":result="../imgs/leizhenyu.gif";break;
                    case "雷阵雨伴有冰雹":result="../imgs/leizhenyubanbin.gif";break;
                    case "雨夹雪":result="../imgs/yujiaxue.gif";break;
                    case "小雨":result="../imgs/xiaoyu.gif";break;
                    case "中雨":result="../imgs/zhongyu.gif";break;
                    case "大雨":result="../imgs/dayu.gif";break;
                    case "暴雨":result="../imgs/baoyu.gif";break;
                    case "大暴雨":result="../imgs/dabaoyu.gif";break;
                    case "特大暴雨":result="../imgs/tedabaoyu.gif";break;
                    case "阵雪":result="../imgs/zhenxue.gif";break;
                    case "小雪":result="../imgs/xiaoxue.gif";break;
                    case "中雪":result="../imgs/zhongxue.gif";break;
                    case "大雪":result="../imgs/daxue.gif";break;
                    case "暴雪":result="../imgs/baoxue.gif";break;
                    case "雾":result="../imgs/wu.gif";break;
                    case "冻雨":result="../imgs/dongyu.gif";break;
                    case "沙尘暴":result="../imgs/ying.png";break;
                    case "小雨到中雨":result="../imgs/xiaodaozhongyu.gif";break;
                    case "中雨到大雨":result="../imgs/zhongyudaodayu.gif";break;
                    case "大雨到暴雨":result="../imgs/dayudaobaoyu.gif";break;
                    case "暴雨到大暴雨":result="../imgs/baoyudabaoyu.gif";break;
                    case "大暴雨到特大暴雨":result="../imgs/dabaoyutedabaoyu.gif";break;
                    case "小雪到中雪":result="../imgs/xiaoxuezhongxue.gif";break;
                    case "中雪到大雪":result="../imgs/zhongxuezhuandaxue.gif";break;
                    case "大雪到暴雪":result="../imgs/daxuedaobaoxue.gif";break;
                    case "浮尘":result="../imgs/fuchen.gif";break;
                    case "扬沙":result="../imgs/yangsha.gif";break;
                     case "沙尘暴":result="../imgs/shachenbao.gif";break;
                    case "强沙尘暴":result="../imgs/qiangshachengbao.gif";break;
                    case "霾":result="../imgs/mai.gif";break;
                    default :result="";break;
                   }
                return result;
            }
        },
        created:function(){
            this.getWeather();
        },
        watch:{
            '$route'(to,from){
                this.getWeather();
            }
        }
    };
</script>
<style>
    .active{
        color:red;
        font-weight:bolder;
    }
    .noactive{
        color:blue;
    }
    ul,li,div{
        padding:0px;
        margin:0px;
    }
    li{
        list-style:none;
    }
    .forecast ul{
        float:left;
        width:20%;
    }
    ul li{
        text-align:center;
    }
    .center{
        text-align:center;
        margin-top:10px;
    }
    .specia{
        position:relative;
    }
    .specia span{
        display:inline-block;
        position:absolute;
        bottom:0px;
    }
</style>