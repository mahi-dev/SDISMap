package org.mahidev.sdismap.controller;

import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.mahidev.sdismap.dto.UserDto;
import org.mahidev.sdismap.exception.UnauthorizedAccessException;
import org.mahidev.sdismap.exception.UserNotFoundException;
import org.mahidev.sdismap.model.User;
import org.mahidev.sdismap.service.CurrentUserService;
import org.mahidev.sdismap.service.UserManager;
import org.mahidev.sdismap.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Function;

@Log4j2
@RestController
@RequestMapping("/api/user")
public record RestUserController(UserManager.Service service, CurrentUserService currentUserService, PasswordEncoder encoder) {

	@GetMapping("/{name}/create")
	public UserDto updateOrCreate(final @PathVariable @NonNull String name, final @RequestParam @NonNull String password) {
		if (UserService.isAuthorizedUser(currentUserService.getCurrentUser())) {
			final Function<User, User> modifyUser = user -> service.updateUser(user.getId(), name, encoder.encode(password)).orElseThrow();
			return UserDto.toDto(service.getUserByEmail(name).map(modifyUser)
					.orElseGet(() -> service.createUser(new User(name, encoder.encode(password))).orElseThrow()));
		} else
			throw new UnauthorizedAccessException("Action non autorisé.");
	}

	@GetMapping("/{name}/delete")
	public boolean delete(final @PathVariable @NonNull String name) {
		if (UserService.isAuthorizedUser(currentUserService.getCurrentUser())) {
			final Function<User, Boolean> deleteUser = user -> {
				service.deleteUser(user.getId());
				return true;
			};
			return service.getUserByEmail(name).filter(user -> user.getId() >= 0L).map(deleteUser)
					.orElseThrow(() -> new UserNotFoundException(String.format("Utilisateur non trouvé : %s.", name)));
		} else
			throw new UnauthorizedAccessException("Action non autorisé.");
	}

	@GetMapping("/list")
	public List<UserDto> getUser() {
		return service.getAllUsers().stream().map(UserDto::toDto).toList();
	}
}
