package org.mahidev.sdismap.datasource;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class StreamDataSource implements DataSource, AutoCloseable {

    private final Path tempFile;
    private final MultipartFile file;
    @Value("${upload.temp.path}")
    private Path tempFilePath;

    public StreamDataSource(@NonNull final MultipartFile multipartFile) throws IOException {
        file = multipartFile;
        tempFile = createTempFile(file);
    }

    private static Path createTempFile(@NonNull final MultipartFile multipartFile) throws IOException {
        final var tempFile = Files.createTempFile("upload_", multipartFile.getName());
        multipartFile.transferTo(tempFile);
        return tempFile;
    }

    @Override
    public Path getPath() {
        return tempFile;
    }

    @Override
    public void close() throws IOException {
        Files.deleteIfExists(tempFile);
    }
}
