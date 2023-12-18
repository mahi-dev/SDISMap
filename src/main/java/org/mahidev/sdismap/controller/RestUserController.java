package org.mahidev.sdismap.controller;

import jakarta.validation.constraints.NotBlank;
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

@Log4j2
@RestController
@RequestMapping("/api/user")
public record RestUserController(UserManager.Service service, CurrentUserService currentUserService, PasswordEncoder encoder) {

	@GetMapping("/{name}/create")
	public UserDto create(final @PathVariable @NotBlank String name, final @RequestParam @NotBlank String password) {
		if (UserService.isAuthorizedUser(currentUserService.getCurrentUser()))
			return UserDto.toDto(service.createUser(new User(name, encoder.encode(password))));
		else
			throw new UnauthorizedAccessException("Action non autorisé.");
	}

	@DeleteMapping("/{name}/delete")
	public boolean delete(final @PathVariable @NotBlank String name) {
		if (UserService.isAuthorizedUser(currentUserService.getCurrentUser())) {
			final var user = service.getUserByEmail(name);
			if (user.getId() >= 0L) {
				service.deleteUser(user.getId());
				return true;
			}
			throw new UserNotFoundException(String.format("Utilisateur non trouvé : %s.", name));
		} else
			throw new UnauthorizedAccessException("Action non autorisé.");
	}

	@GetMapping("/list")
	public List<UserDto> getUser() {
		return service.getAllUsers().stream().map(UserDto::toDto).toList();
	}
}
