<template>
    <div class="mymapbox">
        <div>
            <el-input v-model="keyword" placeholder="请输入关键词查询" id="input_id">
                <template #append>
                    <el-button @click="searchTheKeyword(keyword)">搜索</el-button>
                </template>
            </el-input>
        </div>

        <div id="container">
        </div>
        <div id="panel"></div>

        <!-- <div id="panel"></div> -->
        <div>
            选择的地址为：{{ mylocation }}
        </div>
        <!-- <el-input v-model="mylocation" disabled /> -->
    </div>
</template>

<script >

import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
window._AMapSecurityConfig = {
    securityJsCode: '9bbdc1aedc4bc7c91db0e39562efd6d7',
};

export default {
    setup() {
        const map = shallowRef(null);
        var autoComplete, placeSearch;
        return {
            map,
            autoComplete,
            placeSearch,
        }
    },
    data() {
        return {
            keyword: '',
            mylocation: '',
        }
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "3b18d1d8f26cacd8a95fd234077c2891",  // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                //plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.map = new AMap.Map("container", {  //设置地图容器id
                    viewMode: "2D",    //是否为3D地图模式
                    zoom: 15,           //初始化地图级别
                    center: [121.21416, 31.286012], //初始化地图中心点位置
                    //resizeEnable: true
                });
                let that = this;
                AMap.plugin(['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geolocation',], function () {
                    var autoOptions = {
                        //city 限定城市，默认全国
                        city: '北京',
                        // input 为绑定输入提示功能的input的DOM ID
                        input: 'input_id',
                    };
                    // 实例化AutoComplete
                    that.autoComplete = new AMap.AutoComplete(autoOptions);
                    //以上为autoComplete

                    that.placeSearch = new AMap.PlaceSearch({
                        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                        //city: '010',
                        map: that.map,// 展现结果的地图实例
                        pageSize: 5, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        city: "010", // 兴趣点城市
                        citylimit: false,  //是否强制限制在设置的城市内搜索
                        //map: map, // 展现结果的地图实例
                        panel: "panel", // 结果列表将在此容器中进行展示。
                        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    });

                    // that.placeSearch.search(that.keyword, function (status, result) {
                    //     // 查询成功时，result即对应匹配的POI信息
                    //     console.log(result);
                    // });
                    // that.autocomplete.on('select', function (e) {
                    //     //TODO 针对选中的poi实现自己的功能
                    //     that.placeSearch.search(e.poi.name)
                    // })




                    // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search

                    // 根据关键字进行搜索
                    // that.autoComplete.search('同济大学', function (status, result) {
                    //     // 搜索成功时，result即是对应的匹配数据
                    //     console.log('搜索结果是：by郭静静', result);
                    // })
                    // var autoOptions = {
                    //     /// 城市，默认全国 
                    //     //city: "北京",
                    //     input: 'input_id'
                    // };
                    that.map.addControl(new AMap.Geolocation());
                    // // 实例化AutoComplete
                    // that.autoComplete = new AMap.AutoComplete(autoOptions);
                    // that.placeSearch = new AMap.PlaceSearch({
                    //     city: '北京', // 兴趣点城市
                    //     map: that.map,// 展现结果的地图实例
                    //     //panel: "panel",
                    //     //autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    // })
                    // that.placeSearch.search('北京大学', function (status, result) {
                    //     // 查询成功时，result即对应匹配的POI信息
                    //     status;
                    //     console.log("rusult为",result);
                    // });
                    // that.autoComplete.on('select', function (e) {
                    //     //TODO 针对选中的poi实现自己的功能
                    //     console.log(e.poi);
                    //     // this.placeSearch.setCity(e.poi.adcode);
                    //     that.placeSearch.search(e.poi.name);
                    // })
                    // AMap.event.addListener(this.autoComplete,'selsct',function(e){
                    //     console.log(e.poi.location)

                    // })
                    // 根据关键字进行搜索
                    // autoComplete.search(this.keyword, function (status, result) {
                    //     // 搜索成功时，result即是对应的匹配数据
                    //     console.log(result);
                    // })
                });
                this.placeSearch.on('selectChanged', this.handelplaceSearch);

            }).catch(e => {
                console.log(e);//加载错误提示
            });

        },
        searchTheKeyword(keyword) {
            this.placeSearch.search(keyword);
        },
        handelplaceSearch(e) {
            console.log("所选地点啊啊啊");
            console.log(e);
            this.mylocation = e.selected.data.address+e.selected.data.name;
        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap();
    }
}
</script>

<style scoped>
#container {
    /* position: relative; */
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 420px;
    /* z-index:3; */
}

#panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 32px;
    right: 5px;
    width: 280px;
}
.mymapbox{
    position:relative;
}
</style>
