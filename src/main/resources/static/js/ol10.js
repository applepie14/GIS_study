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
var geoJSON_URL = 'http://localhost:12315/geoserver/ows?' + 
				  'service=WFS&' + 
				  'version=1.0.0&' + 
				  'request=GetFeature&' + 
				  'typeName=example:SIG&' + 
				  'outputFormat=application/json&' + 
				  'srsname=EPSG:3857';

var vectorSource = new ol.source.Vector({
	url : geoJSON_URL,
	format: new ol.format.GeoJSON()
});
var vector = new ol.layer.Vector({
	source : vectorSource,
	style : function(f){
		style.getText().setText(f.getProperties().SIG_KOR_NM);
		if(f.getProperties().SIG_CD.substring(0,2) == '11') {
			style.getFill().setColor(hexTorgba('#f44336', 0.7)) 
			return style // 11 : 서울 
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '26') {
			style.getFill().setColor(hexTorgba('#ff009f', 0.7)) 
			return style // 26 : 부산
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '27') {
			style.getFill().setColor(hexTorgba('#03a9f4', 0.7)) 
			return style // 27 : 대구
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '28') {
			style.getFill().setColor(hexTorgba('#673ab7', 0.7)) 
			return style // 28 : 인천
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '29') { 
			style.getFill().setColor(hexTorgba('#ffeb3b', 0.7)) 
			return style // 29 : 광주
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '30') {
			style.getFill().setColor(hexTorgba('#2196f3', 0.7)) 
			return style // 30 : 대전
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '31') {
			style.getFill().setColor(hexTorgba('#ffc107', 0.7)) 
			return style // 31 : 울산
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '36') {
			style.getFill().setColor(hexTorgba('#00bcd4', 0.7)) 
			return style // 36 : 세종
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '41') {
			style.getFill().setColor(hexTorgba('#009688', 0.7)) 
			return style // 41 : 경기
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '42') {
			style.getFill().setColor(hexTorgba('#9c27b0', 0.7)) 
			return style // 42 : 강원
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '43') {
			style.getFill().setColor(hexTorgba('#e91e63', 0.7)) 
			return style // 43 : 충북
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '44') {
			style.getFill().setColor(hexTorgba('#cddc39', 0.7)) 
			return style // 44 : 충남
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '45') {
			style.getFill().setColor(hexTorgba('#3f51b5', 0.7))
			return style // 45 : 전북
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '46') {
			style.getFill().setColor(hexTorgba('#4caf50', 0.7)) 
			return style // 46 : 전남
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '47') {
			style.getFill().setColor(hexTorgba('#ff5722', 0.7)) 
			return style // 47 : 경북
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '48') {
			style.getFill().setColor(hexTorgba('#607d8b', 0.7)) 
			return style // 48 : 경남
		}
		if(f.getProperties().SIG_CD.substring(0,2) == '50') {
			style.getFill().setColor(hexTorgba('#ff9800', 0.7)) 
			return style // 50 : 제주
		}
	} 
});
var raster = new ol.layer.Tile({
	source : new ol.source.XYZ({
		url : url_mapbox
	})
})
var map = new ol.Map({
	layers : [
		raster, 
		vector
	],
	target : 'map',
	view : new ol.View({
		center : [14225718.91318997, 4285980.113872604],
		zoom : 6.8
	})
});

var listenerKey = vectorSource.on('change', function(e) {
	if (vectorSource.getState() == 'ready') {
		$('.mask.ol10').hide();
	}
});

map.on('singleclick', function(evt){
	var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature){
		return feature;
	});
	if(feature != null || feature != undefined){
		var coordinate = evt.coordinate;
		map.getView().setCenter(coordinate);
		map.getView().setZoom(10);
		
		var info = feature.getProperties();
		$('#info').html('<span class="d-block text-primary">지역 코드 : ' + info.SIG_CD + '</span>' + 
						'<span class="d-block text-primary">지역명(한글) : ' + info.SIG_KOR_NM + '</span>' + 
						'<span class="d-block text-info">지역명(영문) : ' + info.SIG_ENG_NM + '</span>');

	}
	else {
		map.getView().setCenter([14225718.91318997, 4285980.113872604]);
		map.getView().setZoom(6.5);
		$('#info').html('<span class="d-block text-danger">정보가 없습니다. </span>');
	}
	
});

var selectedStyleFunction = function(feature, resolution) {
    return [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "red",
            lineCap: "butt",
            lineJoin: "bevel",
            width:3         
        }),
        fill : new ol.style.Fill({
            color: hexTorgba('#FFFFFF', 0.7)
        }),
        text : new ol.style.Text({
    		font : '14px Calibri, sans-serif',
    		fill : new ol.style.Fill({color: '#000'}),
    		stroke : new ol.style.Stroke({color : '#000', width : 1}),
            text: feature.getProperties().SIG_KOR_NM
        })
    })];
};
var select = new ol.interaction.Select({
    style: selectedStyleFunction
});
map.addInteraction(select);