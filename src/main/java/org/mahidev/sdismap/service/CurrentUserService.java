package org.mahidev.sdismap.service;

import org.mahidev.sdismap.model.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

public record CurrentUserService() {

	public UserPrincipal getCurrentUser() {
		return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

}
