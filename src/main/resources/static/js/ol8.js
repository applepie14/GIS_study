/**
 * 
 */
(function ($) {
	
	
	
	
}(jQuery));
// End ready

var format = new ol.format.GeoJSON();
var url_mapbox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXBwbGVtb29uMTQiLCJhIjoiY2thaHZ3bmh0MGxqODJ4b2VlczlmZ280byJ9.2bdAdtiuTbMNSAYAnC3nzw';
var url_vworld = 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png';

var iconFeature = new ol.Feature({
	geometry : new ol.geom.Point([14129600.82, 4512500.74]),
	name : 'my name is zito!'
})

var iconStyle = new ol.style.Style({
	image : new ol.style.Icon(({
		anchor : [0.5, 20],
		anchorXUnits : 'fraction',
		anchorYUnits : 'pixels',
		src : 'http://map.vworld.kr/images/ol3/marker_blue.png'
	}))
})

iconFeature.setStyle(iconStyle);
var vectorSource = new ol.source.Vector({
	features : [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
	source : vectorSource
});
var raster = new ol.layer.Tile({
	source : new ol.source.XYZ({
		url : url_mapbox
	})
})
var map = new ol.Map({
	layers : [
		raster, vectorLayer
	],
	target : 'map',
	view : new ol.View({
		center : [14129600.82, 4512500.74],
		maxZoom : 19, 
		zoom : 14
	})
});


var popupDiv = document.getElementById('popup');
var popup = new ol.Overlay({
	element : popupDiv,
	positioning: 'bottom-center',
	stopEvent : false,
	offset : [-18, -50]
});
map.addOverlay(popup);

// 마커 클릭
function clickMarker(evt){
	var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature){
		return feature;
	});
	if(feature){
		var coordinates = feature.getGeometry().getCoordinates();

		popup.setPosition(coordinates);
		$(popupDiv).popover({
			'placement' : 'top',
			'animation' : false,
			'html' : true,
			'content' : feature.get('name')
		})
		$(popupDiv).popover('show');
	}else{
		$(popupDiv).popover('dispose');
	}
};

map.on('click', clickMarker);

// 지도 클릭 >> 클릭한 위치 좌표 팝업

var coordDiv = document.getElementById('olPopup');
var olPopup = new ol.Overlay({
	element : coordDiv
});
map.addOverlay(olPopup);

function clickMap(evt){
	var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature){
		return feature;
	});
	if(feature == null){
		var coordinate = evt.coordinate;
		var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));

		$(coordDiv).popover('dispose');
		olPopup.setPosition(coordinate);
		$(coordDiv).popover({
			'placement' : 'top',
			'animation' : false,
			'html' : true,
			'content' : '<p>현재 위치 좌표정보</p><code>' + hdms + '</code>'
		});
		$(coordDiv).popover('show');
	}else{
		$(coordDiv).popover('dispose');
	}
}

map.on('click', clickMap);
map.on('pointerdrag', function(){ 
	$(popupDiv).popover('dispose');
	$(coordDiv).popover('dispose'); 
});









