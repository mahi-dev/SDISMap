package org.mahidev.sdismap.datasource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class StreamDataSource implements DataSource, AutoCloseable {

    private final MultipartFile file;

    @Value("${upload.temp.path}")
    private final Path tempFilePath;

    public StreamDataSource(final MultipartFile file) throws IOException {
        this.file = file;
        tempFilePath = createTempFile(file);
    }

    private static Path createTempFile(final MultipartFile file) throws IOException {
        final var tempFile = Files.createTempFile("upload_", file.getOriginalFilename());
        file.transferTo(tempFile);
        return tempFile;
    }

    @Override
    public Path getPath() {
        return tempFilePath;
    }

    @Override
    public void close() throws IOException {
        Files.deleteIfExists(tempFilePath);
    }

}