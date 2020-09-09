package hy.pro.ol.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import hy.pro.ol.security.MyLoginFailHandler;
import hy.pro.ol.security.MyLoginSeccessHandler;
import hy.pro.ol.security.QuickGuideUserServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final QuickGuideUserServiceImpl authImpl;

	private static final String[] RESOURCE_LOCATIONS = {
		"classpath:/static/"
	};


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();		// 개발 시 에만

		http.authorizeRequests()
			.antMatchers("/*", "/", "/ol/**").authenticated()
			.antMatchers("/css/**", "/js/**", "/images/**").permitAll()
			.antMatchers("/admin/**").hasRole("ADMIN")
		.and()
			.formLogin()
				.loginPage("/login")
				.loginProcessingUrl("/loginUser")
				.defaultSuccessUrl("/")
				.usernameParameter("login_id")
				.passwordParameter("login_pwd")
				.successHandler(new MyLoginSeccessHandler())
				.failureHandler(new MyLoginFailHandler())
		.and() // 로그아웃 설정
            .logout()
			.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
			.logoutSuccessUrl("/login")
			.invalidateHttpSession(true)
			.deleteCookies("JSESSIONID") // 쿠키삭제?
			.permitAll()
		.and()
			//.exceptionHandling().accessDeniedPage("/accessDenied")
			;
	}


	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authImpl);
    }

	@Bean
	PasswordEncoder passwordEncoder(){
	    return new BCryptPasswordEncoder();
	}
}
