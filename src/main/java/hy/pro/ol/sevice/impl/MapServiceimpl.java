package hy.pro.ol.sevice.impl;

import org.springframework.stereotype.Service;

import hy.pro.ol.mapper.Map;
import hy.pro.ol.sevice.MapService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MapServiceimpl implements MapService{
	
	private final Map map;
	
	@Override
	public String test() throws Exception {
		return map.test();
	}
	@Override
	public int insertPOI(String poiname, double lon, double lat, String poi_site) throws Exception {
		return map.insertPOI(poiname, lon, lat, poi_site);
	}
	@Override
	public int deletePOI(int poi_no) throws Exception {
		return map.deletePOI(poi_no);
	}
	@Override
	public int updatePOI(String poiname, String poi_site, int poi_no) throws Exception {
		return map.updatePOI(poiname, poi_site, poi_no);
	}
}
