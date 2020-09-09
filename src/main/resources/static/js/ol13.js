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
const url_maptiler = 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=ZoohLJhyOVjbhFFyyUKg';

var attributions =
	  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
	  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
var style = new ol.style.Style({
	fill : new ol.style.Fill({
		color : 'rgba(255, 255, 255, 0.2)'
	}),
	stroke : new ol.style.Stroke({
		color : '#1ebcd5',
		width : 2
	}),
	image : new ol.style.Circle({
		radius : 6.5,
		stroke : new ol.style.Stroke({
			color : '#ffffff'
		}),
		fill : new ol.style.Fill({
			color : '#1ebcd5'
		})
	}),
});
var raster = new ol.layer.Tile({
	source : new ol.source.XYZ({
		url : url_vworld,
	})
});

var vectorSource = new ol.source.Vector({
	format : format,
	url : function(extent) {
		return 'http://localhost:12315/geoserver/wfs?' + 
			'service=WFS&' + 
			'version=1.1.0&' + 
			'request=GetFeature&' + 
			//'typeName=example:LPTD_LDREG_DOGEUN_POINT_INFO_11_202007&' + 
			'typeName=example:studypoi&' + 
			'maxFeatures=300&' +
			'outputFormat=application/json&' + 
			'srsname=EPSG:3857&' + 
			'bbox=' + extent.join(',') + ',EPSG:3857';
	},
	strategy : ol.loadingstrategy.bbox
});
var vectorLayer = new ol.layer.Vector({
	source : vectorSource,
	style : new ol.style.Style({
		image : new ol.style.Circle({
			radius : 6.5,
			stroke : new ol.style.Stroke({
				color : '#ffffff'
			}),
			fill : new ol.style.Fill({
				color : '#e91e63'
			})
		}),
		stroke : new ol.style.Stroke({
			color : 'rgba(0, 0, 255, 1.0)',
			width : 2
		})
	})
});
var vectorSource2 = new ol.source.Vector();
var vectorLayer2 = new ol.layer.Vector({
	source : vectorSource2,
	style : style
});

var map = new ol.Map({
	layers : [raster, vectorLayer,vectorLayer2],
	target : 'map',
	view : new ol.View({
		center : [196652.75136333666, 1649437.3085186086],
		zoom : 1,
		extent :maxExtent
	})
});

/* modify */
var modify = new ol.interaction.Modify({ source : vectorSource });
map.addInteraction(modify);
var modify2 = new ol.interaction.Modify({ source : vectorSource2 });
map.addInteraction(modify2);

modify.on('modifyend', function(e){
	var coord = e.mapBrowserEvent.coordinate;
	console.log(coord)
});
/* draw, snap */
var draw, snap;
var typeSelect = document.getElementById('layers')

function addInteractions(){
	draw = new ol.interaction.Draw({
		source : vectorSource2,
		type : typeSelect.value
	})
	map.addInteraction(draw);
	snap = new ol.interaction.Snap({ source: vectorSource2 });
	map.addInteraction(snap);
	
}
typeSelect.onchange = function () {
	map.removeInteraction(draw);
	map.removeInteraction(snap);
	addInteractions();
};
addInteractions();