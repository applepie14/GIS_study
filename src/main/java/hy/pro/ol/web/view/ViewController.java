package hy.pro.ol.web.view;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ViewController {

	@GetMapping("/")
	public String view() {
		return "index";
	}

	@GetMapping("/login")
	public String login(Principal principal) {
		if (principal != null) {
			return "redirect:/";
		} else {
			return "login";
		}
	}
}
