package hy.pro.ol.mapper;

public interface Map {
	
	String test() throws Exception;
	int insertPOI(String poiname, double lon, double lat, String poi_site) throws Exception;
	int deletePOI(int poi_no) throws Exception;
	int updatePOI(String poiname, String poi_site, int poi_no) throws Exception;
}
