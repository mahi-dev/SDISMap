package org.mahidev.sdismap.dto;

import lombok.NonNull;
import org.mahidev.sdismap.model.User;

public record UserDto(String email) {

	public static UserDto toDto(@NonNull final User user) {
		return new UserDto(user.getEmail());
	}
}
