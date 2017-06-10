<template>
    <div class="mynav nav nav-pills">
        <div class="myleft"><a v-link="{path:'/home/content/'+this.city}" class="btn btn-primary">首页</a></div>
        <div  class="mycenter"><h3><span>天气查询App</span><h3></div>
        <div class="myright"><a v-link="{path:'/home/province/0'}" class="btn btn-primary">查询</a></div>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                city:null,
            }
        },
        methods:{
            getCity:function(){
           
                this.$http.jsonp('http://api.58.com/moji/weathernew/352/?',{
                },{
                    jsonp:"api_callback"
                }).then(function(res){
                    this.city=res.data.city.nm;
                    console.log(this.city);
                },function(){
                    console.log('调用失败');
                });
            }
        },
        created:function(){
            this.getCity();
        }
    };
</script>

<style>
    .mynav{
        position:relative;
        background-color:black;
        color:white;
    }
   .myleft{
      position:absolute;
      left:20px;
      top:20px;
   }
   .mycenter{
       text-align:center;
   }
   .mycenter span{
      
   }
   .myright{
       position:absolute;
       right:20px;
       top:20px;
   }
</style>
-->