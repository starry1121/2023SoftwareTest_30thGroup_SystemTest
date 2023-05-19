<template>
    <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';
window._AMapSecurityConfig = {
    securityJsCode: '9bbdc1aedc4bc7c91db0e39562efd6d7',
};
export default {
    // props: {
    //     centerData: {
    //     type: Array,
    //   }
    // },
    setup() {
        const map = shallowRef(null);
        return {
            map,
        }
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "3b18d1d8f26cacd8a95fd234077c2891",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.map = new AMap.Map("container", {  //设置地图容器id
                    viewMode: "2D",    //是否为3D地图模式
                    zoom: 15,           //初始化地图级别
                    center:[31.233462,121.492156], //初始化地图中心点位置
                });
            }).catch(e => {
                console.log(e);
            })
        },
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap();
    },

}

</script>

<style scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 420px;
}
</style>