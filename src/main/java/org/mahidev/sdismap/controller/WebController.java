package org.mahidev.sdismap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

	@GetMapping("/details")
	public String details() {
		return "forward:/details/index.html";
	}
}
