<template>
 	<baidu-map class="map-box" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-marker v-for="item in data" :position="item.position">
			
		</bm-marker>
		<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="offset">
			<el-card shadow="always">
			  <el-input placeholder="Please input" v-model="input"/>
			  <el-scrollbar wrap-class="scrollbar-wrapper">
				  <el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					@select="handleSelect">
						<el-menu-item v-for="(item,key) in data" :index="key">
							<i class="el-icon-setting"></i>
							<span>{{item.name}}</span>
						</el-menu-item>
				  </el-menu>
			  </el-scrollbar>
			</el-card>
		</bm-control>
	</baidu-map>

    <!--   <el-scrollbar wrap-class="scrollbar-wrapper">
            <p v-for="(item, index) in 200" :key="index">{{index}} 这里是一些文本。</p>
        </el-scrollbar>
 -->
</template>

<script>
import ListControl from '../../components/map/control/ListControl.vue'
export default {
	name:"",
	components:{
		ListControl
	},
	data(){
		return{
			center:{lng:116.3964, lat:39.9093},
			zoom:9,
			scrollWheelZoom:true,
			input:"",
			offset:{
				width:5,
				height:5
			},
			loading:true,
			show:false,
			data:[
				{
					id:1,
					name:"监测站A",
					position:{
						lng: 116.104,
						lat: 39.915,
					}
				},
				{
					id:2,
					name:"监测站B",
					position:{
						lng: 116.204,
						lat: 39.915,
					}
				},
				{
					id:3,
					name:"监测站C",
					position:{
						lng: 116.304,
						lat: 39.915,
					}
				},
				{
					id:4,
					name:"监测站D",
					position:{
						lng: 116.404,
						lat: 39.915,
					}
				},
				{
					id:5,
					name:"监测站E",
					position:{
						lng: 116.504,
						lat: 39.915,
						}
				},
				{
					id:6,
					name:"监测站F",
					position:{
						lng: 116.604,
						lat: 39.915,
					}
				},
				{
					id:7,
					name:"监测站G",
					position:{
						lng: 116.704,
						lat: 39.915,
					}
				},
				{
					id:8,
					name:"监测站H",
					position:{
						lng: 116.804,
						lat: 39.915,
					}
				},
				{
					id:9,
					name:"监测站I",
					position:{
						lng: 116.904,
						lat: 39.915,
					},
				},
				{
					id:5,
					name:"监测站E",
					position:{
						lng: 116.904,
						lat: 39.815,
						}
				},
				{
					id:6,
					name:"监测站F",
					position:{
						lng: 116.904,
						lat: 39.715,
					}
				},
				{
					id:7,
					name:"监测站G",
					position:{
						lng: 116.904,
						lat: 39.615,
					}
				},
				{
					id:8,
					name:"监测站H",
					position:{
						lng: 116.904,
						lat: 39.515,
					}
				},
				{
					id:9,
					name:"监测站I",
					position:{
						lng: 116.904,
						lat: 39.415,
					},
				},
				{
					id:5,
					name:"监测站E",
					position:{
						lng: 116.904,
						lat: 39.315,
						}
				},
				{
					id:6,
					name:"监测站F",
					position:{
						lng: 116.904,
						lat: 39.215,
					}
				},
				{
					id:7,
					name:"监测站G",
					position:{
						lng: 116.904,
						lat: 39.115,
					}
				},
				{
					id:8,
					name:"监测站H",
					position:{
						lng: 116.804,
						lat: 39.115,
					}
				},
				{
					id:9,
					name:"监测站I",
					position:{
						lng: 116.704,
						lat: 39.115,
					},
				}
			]
		}
	},
	mounted(){
		let _this = this;
		//console.log(map)
	},
	methods:{
		Select : function(row,column,event){
			this.Location(row)
		},
		Location : function(marker){
			this.center = marker.position
			//console.log(this.center)
		},
		handleSelect : function(key,keypath){
			this.Location(this.data[key])
		}
	}
}
</script>

<style  lang="scss" scoped>
.map-box {
	width: 100%;
	height: 100%
}
.anchorBL{
    display:none;
}
</style>
