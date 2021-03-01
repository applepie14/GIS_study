/**
 * 
 */
(function ($) {
	$('#switch1').change(function(){
		tile.setVisible(!tile.getVisible());
//		if($(this).is(":checked")){
//			tile.setVisible(true);
//		}else{
//			tile.setVisible(false);
//		}
	});
	
	
	
}(jQuery));
// End ready

const format = new ol.format.GeoJSON();
const url_mapbox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXBwbGVtb29uMTQiLCJhIjoiY2thaHZ3bmh0MGxqODJ4b2VlczlmZ280byJ9.2bdAdtiuTbMNSAYAnC3nzw';
const url_vworld = 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png';

// ex : stroke/fill : hexTorgba('#17A2B8', 1.0)

var style  = new ol.style.Style({
	stroke : new ol.style.Stroke({
		color : '#6e6e6e',
		width : 1
	}),
	fill : new ol.style.Fill({
		color : hexTorgba('#FFFFFF', 0.5)
	}),
	text : new ol.style.Text({
		font : '14px Calibri, sans-serif',
		fill : new ol.style.Fill({color: '#000'}),
		stroke : new ol.style.Stroke({color : '#000', width : 1})
	})
})

var tile = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:12315/geoserver/example/wms',
        params: {
          'LAYERS': 'example:SIG',
          'TILED': true,
          'STYLES': 'example:csstutorial',
        },
        crossOrigin : 'anonymous'
      }),
      visible: true,
      opacity: 1
});
var raster = new ol.layer.Tile({

	source : new ol.source.XYZ({
		url : url_vworld
	})
	/*
	source : new ol.source.Stamen({
		wrapX : false,
		layer : 'toner'
	})
	*/
})

var maxExtent = [13146794.559833655, 3899646.5238036118, 15304643.266546285, 4672313.703941598]
var map = new ol.Map({
	layers : [
		raster, 
		tile
	],
	target : 'map',
	view : new ol.View({
		center : [14225718.91318997, 4285980.113872604],
		zoom : 6.8,
		extent :maxExtent
	})
});


map.on('singleclick', function(evt){
	var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature){
		console.log(feature);
		return feature;
	});
	if(feature != null || feature != undefined){
		//console.log(feature)
		var getExtent = feature.getGeometry().getExtent();
		var center = [(getExtent[0]+getExtent[2])/2, (getExtent[1]+getExtent[3])/2];
		//var coordinate = evt.coordinate;

		map.getView().animate({
		    center : center,
		    zoom: 10
		});
		/*
		map.getView().setCenter(center);
		map.getView().setZoom(10);
		*/
		
		var info = feature.getProperties();
		$('#info').html('<span class="d-block text-primary">지역 코드 : ' + info.SIG_CD + '</span>' + 
						'<span class="d-block text-primary">지역명(한글) : ' + info.SIG_KOR_NM + '</span>' + 
						'<span class="d-block text-info">지역명(영문) : ' + info.SIG_ENG_NM + '</span>');

	}
	else {
		map.getView().animate({
		    center : [14225718.91318997, 4285980.113872604],
		    zoom: 6.8
		});
		$('#info').html('<span class="d-block text-danger">정보가 없습니다. </span>');
	}
	
});
//
//var selectedStyleFunction = function(feature, resolution) {
//    return [new ol.style.Style({
//        stroke: new ol.style.Stroke({
//            color: "red",
//            lineCap: "butt",
//            lineJoin: "bevel",
//            width:3         
//        }),
//        fill : new ol.style.Fill({
//            color: hexTorgba('#FFFFFF', 0.7)
//        }),
//        text : new ol.style.Text({
//    		font : '14px Calibri, sans-serif',
//    		fill : new ol.style.Fill({color: '#000'}),
//    		stroke : new ol.style.Stroke({color : '#000', width : 1}),
//            text: feature.getProperties().SIG_KOR_NM
//        })
//    })];
//};
//var select = new ol.interaction.Select({
//    style: selectedStyleFunction
//});
//map.addInteraction(select);