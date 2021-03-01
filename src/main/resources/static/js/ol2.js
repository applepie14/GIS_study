var image = new ol.style.Circle({
	radius : 5,
	fill : null,
	stroke : new ol.style.Stroke({
		color : 'red',
		width : 1
	})

})

var styles = {
	'Point' : new ol.style.Style({
		image : image
	}),
	'LineString' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'green',
			width : 1
		})
	}),
	'MultiPolygon' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'yellow',
			width : 1
		}),
		fill : new ol.style.Fill({
			color : 'rgba(255, 255, 0, 0.1)'
		})
	}),
	'MultiPoint' : new ol.style.Style({
		image : image
	}),
	'MultiLineString' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'green',
			width : 1
		})
	}),
	'MultiPolygon' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'yellow',
			width : 1
		}),
		fill : new ol.style.Fill({
			color : 'rgba(255, 255, 0, 0.1)'
		})
	}),
	'GeometryCollection' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'purple',
			width : 2
		}),
		fill : new ol.style.Fill({
			color : 'purple'
		}),
		image : new ol.style.Circle({
			radius : 10,
			fill : new ol.style.Fill({
				color : 'rgba(128, 0, 128, 0.5)'
			}),
			stroke : new ol.style.Stroke({
				color : 'purple'
			})
		})
	}),
	'Circle' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'red',
			width : 2
		}),
		fill : new ol.style.Fill({
			color : 'rgba(255, 0, 0, 1)'
		})
	})
}

var styleFunction = function(feature) {
	return styles[feature.getGeometry().getType()];
}

var geojsonObject = {
	'type' : 'FeatureCollection',
	'crs' : {
		'type' : 'name',
		'properties' : {
			'name' : 'EPSG:3857'
		}
	},
	'features' : [
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'Point',
					'coordinates' : [ 0, 0 ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'LineString',
					'coordinates' : [ [ 4e6, -2e6 ], [ 8e6, 2e6 ] ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'LineString',
					'coordinates' : [ [ 4e6, 2e6 ], [ 8e6, -2e6 ] ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'Polygon',
					"coordinates" : [ [ [-17040181.68891205, 8750758.962561885],
						[-16691594.282685308, 8752223.615529224],
						[-16688664.97675063, 8276211.40114397],
						[-17041646.34187939, 8273282.095209291],
						[-17040181.68891205, 8750758.962561885] ] ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'MultiLineString',
					"coordinates" : [
						[ 	[-153.07455655323295, 61.53946770906629],
							[-149.94314260458233, 61.54573718371199],
							[-149.9168282016525, 59.44050114600006],
							[-153.08771375469786, 59.42711939333955],
							[-153.07455655323295, 61.53946770906629]],
							[ [ 1e6, -7.5e5 ], [ 1e6, 7.5e5 ] ],
							[ [ -7.5e5, -1e6 ], [ 7.5e5, -1e6 ] ],
							[ [ -7.5e5, 1e6 ], [ 7.5e5, 1e6 ] ] ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'MultiPolygon',
					"coordinates" : [
						[ [ 
							[-153.07455655323295, 61.53946770906629],
							[-149.94314260458233, 61.54573718371199],
							[-149.9168282016525, 59.44050114600006],
							[-153.08771375469786, 59.42711939333955],
							[-153.07455655323295, 61.53946770906629]
						 ] ],
						[ [ [ -5e6, 6e6 ], [ -5e6, 8e6 ],
							[ -3e6, 8e6 ], [ -3e6, 6e6 ] ] ],
						[ [ [ -2e6, 6e6 ], [ -2e6, 8e6 ], 
							[ 0, 8e6 ], [ 0, 6e6 ] ] ],
						[ [ [ 1e6, 6e6 ], [ 1e6, 8e6 ], 
							[ 3e6, 8e6 ], [ 3e6, 6e6 ] ] ] ]
				}
			},
			{
				'type' : 'Feature',
				'geometry' : {
					'type' : 'GeometryCollection',
					'geometries' : [
							{
								'type' : 'LineString',
								'coordinates' : [ [ -5e6, -5e6 ], [ 0, -5e6 ] ] 
							},
							{
								'type' : 'Point',
								'coordinates' : [ 4e6, -5e6 ] // Circle처럼 보이는 포인트?
							},
							{
								'type' : 'Polygon',
								'coordinates' : [ [ [ 1e6, -6e6 ], [ 2e6, -4e6 ], [ 3e6, -6e6 ] ] ]
							} ]
				}
			} ]
};
var vectorSource = new ol.source.Vector({
	features : (new ol.format.GeoJSON()).readFeatures(geojsonObject)
});

vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([ 5e6, 7e6 ],1e6)));

var vectorLayer = new ol.layer.Vector({
	source : vectorSource,
	style : styleFunction
});

var map = new ol.Map({
	layers : [ 
		new ol.layer.Tile({
			source : new ol.source.OSM()
		}),
		vectorLayer ],
	target : 'map',
	view : new ol.View({
		center : [ 0, 0 ],
		zoom : 2,
	})
})