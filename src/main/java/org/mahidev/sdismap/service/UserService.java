package org.mahidev.sdismap.service;

import lombok.NonNull;
import org.mahidev.sdismap.model.User;
import org.mahidev.sdismap.model.UserPrincipal;
import org.mahidev.sdismap.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public record UserService(UserRepository userRepository) implements UserManager.Service {
	public static boolean isAuthorizedUser(@NonNull final UserPrincipal currentUser) {
		return Stream.of("mahi", "admin").anyMatch(role -> role.equals(currentUser.getUsername()));
	}

	@Override
	public Optional<User> createUser(@NonNull final User user) {
		return Optional.of(userRepository.save(user));
	}

	@Override
	public Optional<User> updateUser(final long id, @NonNull final String email, @NonNull final String password) {
		userRepository.updateUserByEmailAndPassword(id, email, password);
		return getUserById(id);
	}

	@Override
	public void deleteUser(final long id) {
		userRepository.deleteById(id);
	}

	@Override
	public Optional<User> getUserById(final long id) {
		return userRepository.findById(id);
	}

	@Override
	public Optional<User> getUserByEmail(@NonNull final String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}
