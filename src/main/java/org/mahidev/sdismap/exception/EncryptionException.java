package org.mahidev.sdismap.exception;

import java.io.Serial;

public class EncryptionException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 9069172861585882891L;

    public EncryptionException(final String message) {
        super(message);
    }

    public EncryptionException(final Exception e) {
        super(e);
    }
}
