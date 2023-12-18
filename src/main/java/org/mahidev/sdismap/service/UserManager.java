package org.mahidev.sdismap.service;

import org.mahidev.sdismap.model.User;

import java.io.Serial;
import java.util.List;
import java.util.Optional;

public interface UserManager {

	interface Service {
		Optional<User> createUser(User user);

		Optional<User> updateUser(long id, String email, String password);

		void deleteUser(long id);

		Optional<User> getUserById(long id);

		Optional<User> getUserByEmail(String email);

		List<User> getAllUsers();
	}

	class Exception extends java.lang.Exception {
		@Serial
		private static final long serialVersionUID = -4807363539164254L;

		public Exception(String message, Throwable cause) {
			super(message, cause);
		}

		public Exception(String message) {
			super(message);
		}
	}
}
