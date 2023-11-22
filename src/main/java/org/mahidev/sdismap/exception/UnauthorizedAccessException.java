package org.mahidev.sdismap.exception;

import java.io.Serial;

public class UnauthorizedAccessException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -1241429425732130231L;

    public UnauthorizedAccessException(final String message) {
        super(message);
    }
}
