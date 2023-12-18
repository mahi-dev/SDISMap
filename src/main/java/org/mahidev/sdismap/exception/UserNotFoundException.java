package org.mahidev.sdismap.exception;

import java.io.Serial;

public class UserNotFoundException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 3599731853504184758L;

	public UserNotFoundException(final String message) {
		super(message);
	}
}
