package org.mahidev.sdismap.exception;

import java.io.Serial;

public class BadFormatException extends RuntimeException {

	@Serial
	private static final long serialVersionUID = 5388635317872443534L;

	public BadFormatException(final String message) {
		super(message);
	}

	public BadFormatException(final Exception e) {
		super(e);
	}
}
