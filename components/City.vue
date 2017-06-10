<template>
    <div class="container">
        <label for="name">请选择省份：</label>
        <select class="form-control"  @change="changeprovince();" id="provinceselect"  v-model="current">
            <option v-for="ele in provinceList" v-bind:value="$index">{{ele.Name}}</option>
        </select>
    </div>
  
    <div class="container">
        <label for="name">城市列表：</label>
        <ul class="list-group">
            <li class="list-group-item" v-for="ele in cityList"><a v-link="{path:'/home/content/'+ele.Name}">{{ele.Name}}</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
               provinceList:[],
               cityList:[],
               current:null
            }
        },
        methods:{
           changeprovince:function(){
               //console.log(this);
               //console.log("xxxxxxx");
               this.cityList=province.provincesList[this.current].Citys
           }
        },
        created:function(){
            //console.log(this.$route.params.id);
            this.current=this.$route.params.id;
            this.provinceList=province.provincesList;
            this.cityList=province.provincesList[this.current].Citys;
            //console.log(this.current);
        },
    };
</script>