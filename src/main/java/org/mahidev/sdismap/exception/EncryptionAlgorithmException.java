package org.mahidev.sdismap.exception;

import java.io.Serial;

public class EncryptionAlgorithmException extends RuntimeException {

        @Serial
        private static final long serialVersionUID = 5388635317872443534L;

        public EncryptionAlgorithmException(final String message) {
                super(message);
        }

        public EncryptionAlgorithmException(final Exception e) {
                super(e);
        }
}