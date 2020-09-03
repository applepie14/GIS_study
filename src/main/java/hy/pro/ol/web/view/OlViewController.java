package hy.pro.ol.web.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/ol")
@Slf4j
public class OlViewController {

	@GetMapping("/")
	public String olview() {
		return "ol/ol";
	}

	@GetMapping("/{view}")
	public String olview(@PathVariable("view") int view) {
		// log.info("############################### {}","ol/ol" + view);
		return "ol/ol" + view;
	}
	
}
