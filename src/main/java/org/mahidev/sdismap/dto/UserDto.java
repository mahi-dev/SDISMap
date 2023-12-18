package org.mahidev.sdismap.dto;

import lombok.NonNull;
import org.mahidev.sdismap.model.User;

import java.time.LocalDateTime;

public record UserDto(String email, LocalDateTime lastUpdate) {

	public static UserDto toDto(@NonNull final User user) {
		return new UserDto(user.getEmail(), user.getLastUpdate());
	}
}
