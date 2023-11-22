package org.mahidev.sdismap.exception;

import java.io.Serial;

public class DecryptionException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 3500662474407973981L;

    public DecryptionException(final String message) {
        super(message);
    }

    public DecryptionException(final Exception e) {
        super(e);
    }
}