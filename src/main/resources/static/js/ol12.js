/**
 * 
 */
(function ($) {


}(jQuery));
// End ready

const format = new ol.format.GeoJSON();
const url_mapbox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXBwbGVtb29uMTQiLCJhIjoiY2thaHZ3bmh0MGxqODJ4b2VlczlmZ280byJ9.2bdAdtiuTbMNSAYAnC3nzw';
const url_vworld = 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png';
const maxExtent = [13146794.559833655, 3899646.5238036118, 15304643.266546285, 4672313.703941598];
const url_maptiler = 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=';
const key_maptiler = 'ZoohLJhyOVjbhFFyyUKg';

var attributions =
	  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
	  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
// ex : stroke/fill : hexTorgba('#17A2B8', 1.0)
var dragAndDropInteraction = new ol.interaction.DragAndDrop({
	formatConstructors : [ol.format.GPX, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON]
});

var raster = new ol.layer.Tile({
	source : new ol.source.XYZ({
		attributions: attributions,
		url : url_maptiler + key_maptiler,
	})
})
var map = new ol.Map({
	interactions : ol.interaction.defaults().extend([dragAndDropInteraction]),
	layers : [raster],
	target : 'map',
	view : new ol.View({
		center : [196652.75136333666, 1649437.3085186086],
		zoom : 1
	})
});
dragAndDropInteraction.on('addfeatures', function (event) {
	var vectorSource = new ol.source.Vector({
		features: event.features,
	});
	map.addLayer(
		new ol.layer.VectorImage({
			source: vectorSource,
		})
	);
	var getExtent = vectorSource.getExtent();
	var center = [(getExtent[0]+getExtent[2])/2, (getExtent[1]+getExtent[3])/2];
	var zoom = 6;
	//console.log(getExtent[2]-getExtent[0])
	if(getExtent[2]-getExtent[0] > 1550000){
		zoom = 4
	}
	map.getView().animate({
		center : center,
		zoom: zoom
	});
	  
});