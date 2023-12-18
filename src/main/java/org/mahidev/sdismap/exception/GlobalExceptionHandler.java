package org.mahidev.sdismap.exception;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	public record ApiError(HttpStatus status, String message) {
	}

	public static final String NO_SUCH_ALGORITHM_EXCEPTION_MESSAGE = "L'algorithme demandé n'est pas disponible dans l'environnement.";

	public static final String INVALID_KEY_SPEC_EXCEPTION_MESSAGE = "Les spécifications de la clé ne sont pas valides.";

	public static final String NULL_POINTER_EXCEPTION_MESSAGE = "Une opération a échoué car une valeur nulle a été trouvée là où elle n'était pas attendue.";

	public static final String ILLEGAL_ARGUMENT_EXCEPTION_MESSAGE = "Un argument invalide a été fourni à la requête.";

	public static final String NO_LOCATION_FOUND_EXCEPTION_MESSAGE = "La géolocalisation du sdis n'a pas été trouvé.";

	public static final String BAD_FORMAT_EXCEPTION_MESSAGE = "Format du fichier inattendu.";

	public static final String IMPORT_SDIS_EXCEPTION_MESSAGE = "Il y a eu un problème pendant l'import des SDIS.";

	public static final String ALREADY_EXIST_USER_EXCEPTION = "Un utilisateur avec les détails fournis existe déjà.";

	public static final String NOT_FOUND_USER_EXCEPTION = "Utilisateur non trouvé.";

	public static final String SDIS_DESCRIPTION_NOT_FOUND_EXCEPTION = "La description du sdis n'a pas été trouvé.";

	public static final String MSG = "Une exception %s s'est produite : ";

	public static final String UNAUTHORIZED_ACCESS_EXCEPTION = "L'accès à cette ressource n'est pas autorisé.";

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ApiError> handleNullPointerException(final NullPointerException e) {
		return exception(e, HttpStatus.BAD_REQUEST, NULL_POINTER_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiError> handleIllegalArgumentException(final IllegalArgumentException e) {
		return exception(e, HttpStatus.BAD_REQUEST, ILLEGAL_ARGUMENT_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(NoSuchAlgorithmException.class)
	public ResponseEntity<ApiError> handleNoSuchAlgorithmException(final NoSuchAlgorithmException e) {
		return exception(e, HttpStatus.NOT_FOUND, NO_SUCH_ALGORITHM_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(InvalidKeySpecException.class)
	public ResponseEntity<ApiError> handleInvalidKeySpecException(final InvalidKeySpecException e) {
		return exception(e, HttpStatus.NOT_ACCEPTABLE, INVALID_KEY_SPEC_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(NoLocationFoundException.class)
	public ResponseEntity<ApiError> noLocationFoundException(final NoLocationFoundException e) {
		return exception(e, HttpStatus.NOT_FOUND, NO_LOCATION_FOUND_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(BadFormatException.class)
	public ResponseEntity<ApiError> handleBadFormatException(final BadFormatException e) {
		return exception(e, HttpStatus.BAD_REQUEST, BAD_FORMAT_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(ImportSdisException.class)
	public ResponseEntity<ApiError> handleImportSdisException(final ImportSdisException e) {
		return exception(e, HttpStatus.INTERNAL_SERVER_ERROR, IMPORT_SDIS_EXCEPTION_MESSAGE);
	}

	@ExceptionHandler(UserAlreadyExistException.class)
	public ResponseEntity<ApiError> handleUserAlreadyExists(final UserAlreadyExistException e) {
		return exception(e, HttpStatus.CONFLICT, ALREADY_EXIST_USER_EXCEPTION);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ApiError> userNotFoundException(final UserNotFoundException e) {
		return exception(e, HttpStatus.NOT_FOUND, NOT_FOUND_USER_EXCEPTION);
	}

	@ExceptionHandler(SdisDescriptionNotFoundException.class)
	public ResponseEntity<ApiError> sdisDescriptionNotFoundException(final SdisDescriptionNotFoundException e) {
		return exception(e, HttpStatus.NOT_FOUND, SDIS_DESCRIPTION_NOT_FOUND_EXCEPTION);
	}

	@ExceptionHandler(UnauthorizedAccessException.class)
	public ResponseEntity<ApiError> unauthorizedAccessException(final UnauthorizedAccessException e) {
		return exception(e, HttpStatus.UNAUTHORIZED, UNAUTHORIZED_ACCESS_EXCEPTION);
	}

	private ResponseEntity<ApiError> exception(@NonNull final Exception e, @NonNull final HttpStatus status, @NotBlank final String message) {
		log.error(String.format(MSG, e.getClass().getSimpleName()), e);
		final var apiError = new ApiError(status, message);
		return new ResponseEntity<>(apiError, apiError.status());
	}
}
