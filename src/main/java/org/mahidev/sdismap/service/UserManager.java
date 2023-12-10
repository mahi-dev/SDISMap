package org.mahidev.sdismap.service;

import org.mahidev.sdismap.model.User;

import java.io.Serial;
import java.util.List;

public interface UserManager {

	interface Service {
		User createUser(User user);

		User updateUser(User user);

		void deleteUser(long id);

		User getUserById(long id);

		User getUserByEmail(String email);

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
