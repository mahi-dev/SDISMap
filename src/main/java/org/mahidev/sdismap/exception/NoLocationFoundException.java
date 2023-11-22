package org.mahidev.sdismap.exception;

import java.io.Serial;

public class NoLocationFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 8790976939071513739L;

    public NoLocationFoundException(final String message) {
        super(message);
    }
}