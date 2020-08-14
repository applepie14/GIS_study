/**
 * 
 */
(function ($) {
	
	
	
	
}(jQuery));
// End ready

const format = new ol.format.GeoJSON();
const url_mapbox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXBwbGVtb29uMTQiLCJhIjoiY2thaHZ3bmh0MGxqODJ4b2VlczlmZ280byJ9.2bdAdtiuTbMNSAYAnC3nzw';
const url_vworld = 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png';


var style = new ol.style.Style({
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
var vector = new ol.layer.Vector({
	source : vectorSource,
	style : style 
});
var raster = new ol.layer.Tile({
	source : new ol.source.XYZ({
		url : url_vworld
	})
})
var map = new ol.Map({
	layers : [
		raster, vector
	],
	target : 'map',
	view : new ol.View({
		center : [14225718.91318997, 4285980.113872604],
		minZoom : 6.5,
		zoom : 6.5
	})
});



// 지도 클릭 >> 클릭한 위치 좌표 팝업

var coordDiv = document.getElementById('olPopup');
var olPopup = new ol.Overlay({
	element : coordDiv
});
map.addOverlay(olPopup);

var featureDiv = document.getElementById('featureDiv');
var featurePopup = new ol.Overlay({
	element : featureDiv
});
map.addOverlay(featurePopup);

var insertFeature;
var insertCoord = [];
function clickMap(evt){
	//console.log(evt);
	var feature = evt.map.forEachFeatureAtPixel(evt.pixel, function(feature){
		return feature;
	});

	var coordinate = evt.coordinate;
	insertCoord = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
	var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));

	if(feature != null || feature != undefined){
		let featureInfo = feature.getProperties();
		$(coordDiv).popover('dispose');
		$(featureDiv).popover('dispose');
		featurePopup.setPosition(coordinate);
		
		let siteTag = featureInfo.poi_site;
		if((featureInfo.poi_site).indexOf('http') > -1){
			siteTag = '<a href="'+featureInfo.poi_site+'" target="_blank">'+ featureInfo.poi_site +'</a>'
		}
		$(featureDiv).popover({
			'placement' : 'top',
			'animation' : false,
			'html' : true,
			'content' : '<div class="d-block text-center p-2">'+ featureInfo.poiname +'<br>' + 
						siteTag + '</div>' +
						'<div class="d-block text-center p-2"><div class="row  mx-0">' + 
						'<a class="btn btn-sm btn-block btn-outline-warning mt-2 updateBtn col-6">수정하기</a>' +
						'<a class="btn btn-sm btn-block btn-outline-danger mt-2 deleteBtn col-6" id="'+featureInfo.poi_no+'">삭제하기</a></div>' +
						'</div></div>'
						
		});
		$(featureDiv).popover('show');
		$('.deleteBtn').click(function(){deletePOI($(this))});
		$('.updateBtn').click(function(){
			$('.modal-footer #insertPOIBtn').addClass('d-none');
			$('.modal-footer button.updatePOIBtn').removeClass('d-none').attr('id', featureInfo.poi_no);
			$('#poiname').val(featureInfo.poiname);
			$('#poisite').val(featureInfo.poi_site);
			$('#exampleModalCenter').modal('show');
			$(featureDiv).popover('dispose');
		});
	}
	else if(feature == null || feature == undefined){
		$(coordDiv).popover('dispose');
		$(featureDiv).popover('dispose');
		olPopup.setPosition(coordinate);
		
		$(coordDiv).popover({
			'placement' : 'top',
			'animation' : false,
			'html' : true,
			'content' : '<div class="d-block text-center p-2"><code>' + hdms + '</code>' + 
						'<a class="btn btn-sm btn-block btn-outline-info mt-2" id="insertBtn" data-toggle="modal" data-target="#exampleModalCenter">현재 위치 저장하기</a></div>'
		});
		
		$(coordDiv).popover('show');
		$('#insertBtn').click(function(){
			$('#exampleModalCenter').modal('show');
			insertFeature = feature;
		})
		
		
	}else{
		$(coordDiv).on('hidden.bs.popover', function () {
			insertCoord = [];
		})
		$(coordDiv).popover('dispose');
		
		
	}
}

map.on('click', clickMap);
map.on('movestart', function(){ 
	$(coordDiv).popover('dispose');
	$(featureDiv).popover('dispose');
});

$('#exampleModalCenter').on('show.bs.modal', function(){
	$(coordDiv).popover('hide');
});
$('#exampleModalCenter').on('hide.bs.modal', function(){
	$('.modal-footer #insertPOIBtn').removeClass('d-none');
	$('.modal-footer button.updatePOIBtn').addClass('d-none').attr('id', '');
	$('#exampleModalCenter input').val('');
});

$('#dismissModal').click(function(){
	$(coordDiv).popover('show');
	$('.popover-body #insertBtn').attr('data-toggle', 'modal').attr('data-target', '#exampleModalCenter');
});

$('#insertPOIBtn').click(function(){
	console.log('insert');
	var params = {
		poiname : $('#poiname').val(),
		lon : insertCoord[0],
		lat : insertCoord[1],
		poi_site : $('#poisite').val()
	}
	$.ajax({
		type : 'POST',
		url : '/ol/insertPOI',
		data : params,
		dataType : 'text',
		success : function(e){
			vectorSource.refresh();
			$('#exampleModalCenter').modal('hide');
		},
		error : function(e) {
			console.debug(e.responseText);
		}
	});
})

function deletePOI(request){
	var poi_no = Number(request[0].id);

	$.ajax({
		type : 'POST',
		url : '/ol/deletePOI',
		data : {poi_no : poi_no},
		dataType : 'text',
		success : function(e){
			if(e == 'success'){
				$(featureDiv).popover('dispose');
				vectorSource.refresh();
			}	
		},
		error : function(e) {
			console.debug(e.responseText);
		}
	});
}

$('.updatePOIBtn').click(function(){ updatePOI($(this)); });
function updatePOI(request){
	var params = {
		poi_no : Number(request[0].id),
		poiname : $('#poiname').val(),
		poi_site : $('#poisite').val()
	}
	$.ajax({
		type : 'POST',
		url : '/ol/updatePOI',
		data : params,
		dataType : 'text',
		success : function(e){
			if(e == 'success'){
				vectorSource.refresh();
				$('#exampleModalCenter').modal('hide');
			}	
		},
		error : function(e) {
			console.debug(e.responseText);
		}
	});
}

