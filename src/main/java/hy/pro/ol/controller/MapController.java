package hy.pro.ol.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hy.pro.ol.sevice.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/ol")
@RequiredArgsConstructor
@Slf4j
public class MapController {
	private final MapService mapService;
	
	
	@PostMapping("/insertPOI")
	public String insertPOI(String poiname, float lon, float lat, String poi_site) throws Exception{
		String resultStr = "fail";
		int resultInt = mapService.insertPOI(poiname, lon, lat, poi_site);
		if(resultInt > 0) {
			resultStr = "success";
		}
		log.debug(resultStr);
		return resultStr;
	}
	
	@PostMapping("/deletePOI")
	public String deletePOI(
		int poi_no	
	) throws Exception{
		String resultStr = "fail";
		int resultInt = mapService.deletePOI(poi_no);
		if(resultInt > 0) {
			resultStr = "success";
		}
		log.debug(resultStr);
		return resultStr;
	}

	@PostMapping("/updatePOI")
	public String updatePOI(String poiname, String poi_site, int poi_no) throws Exception{
		String resultStr = "fail";
		int resultInt = mapService.updatePOI(poiname, poi_site, poi_no);
		if(resultInt > 0) {
			resultStr = "success";
		}
		log.debug(resultStr);
		return resultStr;
	}
	
	@PostMapping("/testURL")
	public int testURL() throws Exception{
		return 10;
	}
}
