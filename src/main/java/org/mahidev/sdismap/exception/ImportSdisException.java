package org.mahidev.sdismap.exception;

import java.io.Serial;

public class ImportSdisException extends RuntimeException {
	@Serial
	private static final long serialVersionUID = 3500662474407973981L;

	public ImportSdisException(final String message) {
		super(message);
	}

	public ImportSdisException(final Exception e) {
		super(e);
	}

	public ImportSdisException(final String message, final Exception e) {
		super(message, e);
	}
}
