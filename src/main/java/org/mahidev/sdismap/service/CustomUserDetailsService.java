package org.mahidev.sdismap.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.mahidev.sdismap.model.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserManager.Service userService;

	@Override
	public UserDetails loadUserByUsername(@NonNull final String email) throws UsernameNotFoundException {
		return userService.getUserByEmail(email).map(UserPrincipal::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
	}
}
