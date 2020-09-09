package hy.pro.ol.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import hy.pro.ol.vo.QuickGuideUserVO;

public class MyLoginSeccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();

		//log.info("@@@@@@@@@@@@@@@@@@@@@\n"+((QuickGuideUserVO)authentication.getPrincipal()).getUser().toString());
		session.setAttribute("user", ((QuickGuideUserVO)authentication.getPrincipal()));

		response.sendRedirect("/");
	}

}
