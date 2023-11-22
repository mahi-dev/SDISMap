package org.mahidev.sdismap.exception;

import java.io.Serial;

public class UserAlreadyExistException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 3599731853504184758L;

    public UserAlreadyExistException(final String message) {
            super(message);
        }
    }