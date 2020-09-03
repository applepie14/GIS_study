/**
 * 
 */
(function ($) {
	$('#switch1').change(function(){
		if($(this).is(":checked")){
			vector.setVisible(true);
		}else{
			vector.setVisible(false);
		}
	});
	
	
	
}(jQuery));
// End ready

const format = new ol.format.GeoJSON();
const url_mapbox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXBwbGVtb29uMTQiLCJhIjoiY2thaHZ3bmh0MGxqODJ4b2VlczlmZ280byJ9.2bdAdtiuTbMNSAYAnC3nzw';
const url_vworld = 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png';

// ex : stroke/fill : hexTorgba('#17A2B8', 1.0)

var style  = new ol.style.Style({
	stroke : new ol.style.Stroke({
		color : '#ffc107',
		width : 1
	}),
	fill : new ol.style.Fill({
		color : hexTorgba('#ffc107', 0.5)
	}),
	text : new ol.style.Text({
		font : '14px Calibri, sans-serif',
		fill : new ol.style.Fill({color: '#000'}),
		stroke : new ol.style.Stroke({color : '#000', width : 1})
	})
})
var vectorSource = new ol.source.Vector();
var vector = new ol.layer.Vector({
	source : vectorSource,
	style : style
});
var raster = new ol.layer.Tile({
	source : new ol.source.Stamen({
		wrapX : false,
		layer : 'toner'
	})
})
var map = new ol.Map({
	layers : [
		raster, 
		vector
	],
	target : 'map',
	view : new ol.View({
		center : [7431601.438766161, 2774101.1578642763],
		zoom : 3.8,
		rotation: 1,
	})
});

var listenerKey = vectorSource.on('change', function(e) {
	if (vectorSource.getState() == 'ready') {
		$('.mask.ol10').hide();
	}
});

shp('../lib/shapefile-js-gh-pages/shpFile/CTPRVN.zip').then(function(geojson){
	let feature = new ol.format.GeoJSON({
		dataProjection: 'EPSG:3857',
		featuerProjection: 'EPSG:5179'
	}).readFeatures(geojson);
	vectorSource.addFeatures(feature);
})
