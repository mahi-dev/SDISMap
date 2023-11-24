package org.mahidev.sdismap.datasource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class StreamDataSource implements DataSource, AutoCloseable {

	private static Path createTempFile(final MultipartFile multipartFile) throws IOException {
		final var tempFile = Files.createTempFile("upload_", multipartFile.getName());
		multipartFile.transferTo(tempFile);
		return tempFile;
	}

	public StreamDataSource(final MultipartFile multipartFile) throws IOException {
		file = multipartFile;
		tempFile = createTempFile(file);
	}

	private final Path tempFile;

	private final MultipartFile file;

	@Value("${upload.temp.path}")
	private Path tempFilePath;

	@Override
	public Path getPath() {
		return tempFile;
	}

	@Override
	public void close() throws IOException {
		Files.deleteIfExists(tempFile);
	}
}
