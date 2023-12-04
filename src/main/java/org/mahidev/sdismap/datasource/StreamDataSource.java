package org.mahidev.sdismap.datasource;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

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

	public InputStream getInputStream() {
		try {
			return Files.newInputStream(tempFile);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public String getFileName() {
		return file.getOriginalFilename();
	}

	@Override
	public String getFileExtension() {
		final var filename = getFileName();
		final var dotIndex = filename.lastIndexOf('.');
		return (dotIndex > 0 && dotIndex < filename.length() - 1) ? filename.substring(dotIndex + 1) : "";
	}

	@Override
	public void close() throws IOException {
		Files.deleteIfExists(tempFile);
	}
}
