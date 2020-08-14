package hy.pro.ol.web.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/ol")
@Slf4j
public class ViewController {

	@GetMapping("/")
	public String view() {
		return "index";
	}
	@GetMapping("/1")
	public String ol1() {
		return "ol/ol1";
	}
	@GetMapping("/2")
	public String ol2() {
		return "ol/ol2";
	}
	@GetMapping("/3")
	public String ol3() {
		return "ol/ol3";
	}
	@GetMapping("/4")
	public String ol4() {
		return "ol/ol4";
	}
	@GetMapping("/5")
	public String ol5() {
		return "ol/ol5";
	}
	@GetMapping("/6")
	public String ol6() {
		return "ol/ol6";
	}
	@GetMapping("/7")
	public String ol7() {
		return "ol/ol7";
	}
	@GetMapping("/8")
	public String ol8() {
		return "ol/ol8";
	}
	@GetMapping("/9")
	public String ol9() {
		return "ol/ol9";
	}
	@GetMapping("/10")
	public String ol10() {
		return "ol/ol10";
	}
}
