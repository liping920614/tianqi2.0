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
                </ul>
            </div>
        </div>
    </div>
    
    <canvas id="forecasth" v-bind:width="width" height="120"></canvas>
    <canvas id="forecastl" v-bind:width="width" height="120"></canvas>
</template>
<style>

</style>
<script>
    export default {
        data:function(){
            return {
                city:null,
                imgurl:null,
                type:null,
                fl:null,
                forecast:null,
                /*
                forecast:[
                        {
                            high:"高温20℃",
                            low:"高温10℃",
                        },
                        {
                            high:"高温27℃",
                            low:"高温13℃",
                        },
                        {
                            high:"高温30℃",
                            low:"高温10℃",
                        },
                        {
                            high:"高温60℃",
                            low:"高温10℃",
                        },
                        {
                            high:"高温35℃",
                            low:"高温-30℃",
                        }
                ],*/
                width:window.document.body.clientWidth
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
                    this.imgurl=this.setImgUrl(this.type);
                    this.draw();
                   //console.log(this.type+""+this.imgurl);
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
                    case "大雨":result="../imgs/dayu.gif";break;
                    case "中雨":result="../imgs/zhongyu.gif";break;
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
                    case "沙尘暴":result="../imgs/shachenbao.gif";break;
                    case "小到中雨":result="../imgs/xiaodaozhongyu.gif";break;
                    case "中到大雨":result="../imgs/zhongyudaodayu.gif";break;
                    case "大到暴雨":result="../imgs/dayudaobaoyu.gif";break;
                    case "暴到大暴雨":result="../imgs/baoyudabaoyu.gif";break;
                    case "大暴到特大暴雨":result="../imgs/dabaoyutedabaoyu.gif";break;
                    case "小到中雪":result="../imgs/xiaoxuezhongxue.gif";break;
                    case "中到大雪":result="../imgs/zhongxuezhuandaxue.gif";break;
                    case "大到暴雪":result="../imgs/daxuedaobaoxue.gif";break;
                    case "浮尘":result="../imgs/fuchen.gif";break;
                    case "扬沙":result="../imgs/yangsha.gif";break;
                    case "强沙尘暴":result="../imgs/qiangshachengbao.gif";break;
                    case "霾":result="../imgs/mai.gif";break;
                    default :result="";break;
                   }
                return result;
            },
            draw:function(){
                console.log(document.getElementById("forecasth"));
                //console.log(this.$el.parentElement.children[6]);
               
                var c=document.getElementById("forecasth");
                var ctx=c.getContext("2d");
                var width=c.clientWidth;
                var starw=width/10;
                console.log(starw);
                ctx.clearRect(0,0,width,120);
                ctx.strokeStyle ="red";
                ctx.fillStyle = "red";
                for(var i=0;i<this.forecast.length;i++){
                    ctx.beginPath();
                    var x=starw*(1+2*i);
                    var y=-parseInt(this.forecast[i].high.slice(2))+80;
                    if(i==1){
                        ctx.fillStyle = "black";
                    }else{
                        ctx.fillStyle = "red";
                    }
                    ctx.font = "10px serif";
                    ctx.fillText(parseInt(this.forecast[i].high.slice(2))+'℃', x, y-10);
                    ctx.fillStyle = "red";
                    ctx.arc(x, y, 2, 0, Math.PI*2);
                    ctx.fill();
                    if(i<this.forecast.length-1){
                        var tox=starw*(1+2*(i+1));
                        var toy=-parseInt(this.forecast[i+1].high.slice(2))+80;
                        ctx.moveTo(x,y);
                        ctx.lineTo(tox,toy);
                        ctx.stroke();
                    }
                }
                c=document.getElementById("forecastl");
                ctx=c.getContext("2d");
                width=c.clientWidth;
                starw=width/10;
                ctx.clearRect(0,0,width,120);
                ctx.strokeStyle ="blue";
                ctx.fillStyle = "blue";
                for(var i=0;i<this.forecast.length;i++){
                    ctx.beginPath();
                    var x=starw*(1+2*i);
                    var y=-parseInt(this.forecast[i].low.slice(2))+80;
                     if(i==1){
                        ctx.fillStyle = "black";
                    }else{
                        ctx.fillStyle = "blue";
                    }
                    ctx.font = "10px serif";
                    ctx.fillText(parseInt(this.forecast[i].low.slice(2))+'℃', x, y-10);
                    ctx.fillStyle = "blue";
                    ctx.arc(x, y, 2, 0, Math.PI*2);
                    ctx.fill();
                    if(i<this.forecast.length-1){
                        var tox=starw*(1+2*(i+1));
                        var toy=-parseInt(this.forecast[i+1].low.slice(2))+80;
                        ctx.moveTo(x,y);
                        ctx.lineTo(tox,toy);
                        ctx.stroke();
                    }
                }
            }
        },
        created:function(){
            window.onresize=function(){
                location.reload();
            }
            console.log("created");
            this.getWeather();
        },
        ready:function(){
            
        },
        attached:function(){
            //this.draw();
        },
        watch:{
            '$route'(to,from){
                this.getWeather();
            }
        }
    };
</script>
<style>
    .container{
        margin-bottom:20px;
    }
    .active{
        color:black;
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
</style>