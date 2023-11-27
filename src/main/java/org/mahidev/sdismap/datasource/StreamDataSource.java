package org.mahidev.sdismap.datasource;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.MimeType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

import static java.nio.file.Files.probeContentType;

public class StreamDataSource implements DataSource, AutoCloseable {

	private static Path createTempFile(@NonNull final MultipartFile multipartFile) throws IOException {
		final var tempFile = Files.createTempFile("upload_", multipartFile.getName());
		multipartFile.transferTo(tempFile);
		return tempFile;
	}

	public StreamDataSource(@NonNull final MultipartFile multipartFile) throws IOException {
		file = multipartFile;
		tempFile = createTempFile(file);
	}

	private final Path tempFile;

	private final MultipartFile file;

	@Value("${upload.temp.path}")
	private Path tempFilePath;

	public Path getPath() {
		return tempFile;
	}

	public InputStream getInputStream() {
		try {
			return Files.newInputStream(tempFile);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public MimeType getMimeType() {
		try {
			return MimeType.valueOf(probeContentType(tempFile));
		} catch (IOException e) {
			throw new RuntimeException("Erreur lors de l'obtention du InputStream pour le fichier: " + tempFile, e);
		}
	}

	@Override
	public void close() throws IOException {
		Files.deleteIfExists(tempFile);
	}
}
