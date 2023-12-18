package org.mahidev.sdismap.configuration;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.EnumSet;

@Configuration
@EnableWebSecurity
@Log4j2
@RequiredArgsConstructor
public class CustomWebSecurityConfigurerAdapter {

	@Bean
	static FilterRegistrationBean<Filter> handlerMappingIntrospectorCacheFilter(final HandlerMappingIntrospector hmi) {
		final var cacheFilter = hmi.createCacheFilter();
		final var registrationBean = new FilterRegistrationBean<>(cacheFilter);
		registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		registrationBean.setDispatcherTypes(EnumSet.allOf(DispatcherType.class));
		return registrationBean;
	}

	private final UserDetailsService userDetailsService;

	@Bean
	public SecurityFilterChain securityFilterChain(final HttpSecurity http) throws Exception {
		return http.csrf(AbstractHttpConfigurer::disable).cors(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> {
					auth.requestMatchers("/").permitAll();
					auth.requestMatchers("/favicon.ico").permitAll();
					auth.anyRequest().authenticated();
				}).formLogin(Customizer.withDefaults()).formLogin(login -> login.successHandler(new LoginSuccessHandler()))
				.logout(l -> l.logoutSuccessUrl("/").invalidateHttpSession(true).clearAuthentication(true).permitAll()).rememberMe(
						r -> r.userDetailsService(userDetailsService).key("sdisKey").rememberMeCookieName("sdis-remember-me").tokenValiditySeconds(604800))
				.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/favicon.ico", "/error");
	}
}
