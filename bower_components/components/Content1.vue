<template>
    <div>{{city}}</div>
    <h3>今日天气</h3>
    <div><img :src="imgurl"><span>{{type}}</span></div>
    <div><span>{{fl}}</span></div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="30" width="{{width}}">
        <!--<text v-for="ele in forecast" v-bind:x="$index<2?-30*(1-$index)+'%':30*($index-1)+'%'"  v-bind:y="10+'%'" v-bind:class="$index==1?'active':'noactive'">{{ele.date}}</text>-->
        <text x='20' y='20'>
            <tspan  v-for="ele in forecast" v-bind:class="$index==1?'active':'noactive'" font-weight="bold" v-bind:fill="$index==1?'red':'black'"  height="30" width="{{width/forecast.length}}"> {{ele.date}}</tspan>
        </text>
    </svg>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
         <image v-for="ele in forecast" xlink:href="{{setImgUrl(ele.type)}}"  v-bind:x="$index<2?-35*(1-$index)+'%':35*($index-1)+'%'"  v-bind:y="10+'%'" height="30px" width="30px"/>
    </svg>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <text width="{{width}}" height="50">
            <tspan  v-for="ele in forecast" v-bind:class="$index==1?'active':'noactive'" font-weight="bold" v-bind:fill="$index==1?'red':'black'" v-bind:y="parseInt(ele.high.slice(2))+'px'"> {{parseInt(ele.high.slice(2))+'℃'}}</tspan>
        </text>
    </svg>
</template>
<script>
    export default {
        data:function(){
            return {
                city:null,
                imgurl:null,
                type:null,
                fl:null,
                forecast:null,
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
                   // console.log(this.type+""+this.imgurl);
                },function(){
                    console.log('调用失败');
                });
            },
            setImgUrl:function(value){
                var result;
                switch(value){
                    //图片资源来源http://www.tianqi.com/
                    case "晴":result="../imgs/qing.png";break;
                    case "多云":result="../imgs/duoyun.png";break;
                    case "阴":result="../imgs/leizhenyu.png";break;
                    case "雷阵雨":result="../imgs/xiaoyu.png";break;
                    case "阵雨":result="../imgs/ying.png";break;
                    case "小雨":result="../imgs/zhenyu.png";break;
                    default :result="";break;
                   }
                return result;
            },
            draw:function(){
                console.log(this.width);
                //console.log(this.$el.parentElement.children[6]);
                /*
                var c=document.getElementById("forecast");
                var ctx=c.getContext("2d");
                var width=c.clientWidth;
                var height=c.clientheight;
                console.log(width);
                for(var i=0;i<this.forecast.length;i++){
                    ctx.moveTo(0,0);
                    ctx.lineTo(200,100);
                    ctx.stroke();
                }*/
                
            }
        },
        created:function(){
            this.getWeather();
            this.draw();
        },
    };
</script>
<style>
    text{
        font-size:14px;
    }
    .active{
        color:yellow;
        font-weight:bolder;
    }
    .noactive{
        color:blue;
    }
    svg{
        display:block;
    }
</style>