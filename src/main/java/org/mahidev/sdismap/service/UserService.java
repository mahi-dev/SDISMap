package org.mahidev.sdismap.service;

import lombok.NonNull;
import org.mahidev.sdismap.model.User;
import org.mahidev.sdismap.repository.UserRepository;

import java.util.List;

public record UserService(UserRepository userRepository) implements UserManager.Service {

	@Override
	public User createUser(@NonNull final User user) {
		return userRepository.save(user);
	}

	@Override
	public User updateUser(@NonNull final User user) {
		return userRepository.save(user);
	}

	@Override
	public void deleteUser(final long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User getUserById(final long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public User getUserByEmail(@NonNull final String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}
