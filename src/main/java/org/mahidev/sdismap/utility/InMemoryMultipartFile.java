package org.mahidev.sdismap.utility;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

@Data
@RequiredArgsConstructor
public class InMemoryMultipartFile implements MultipartFile {

	public InMemoryMultipartFile(@NonNull Path filePath) throws IOException {
		this(filePath.getFileName().toString(), filePath.toString(), Files.probeContentType(filePath), Files.readAllBytes(filePath));
	}

	public InMemoryMultipartFile(String fileName, InputStream stream, String type) throws IOException {
		this(fileName, fileName, type, stream.readAllBytes());
	}

	@NonNull
	private final String name;

	private final String originalFilename;

	private final String contentType;

	private final byte[] bytes;

	@Override
	public boolean isEmpty() {
		return (getSize() == 0);
	}

	@Override
	public long getSize() {
		return this.bytes.length;
	}

	@Override
	public @NonNull InputStream getInputStream() {
		return new ByteArrayInputStream(this.bytes);
	}

	@Override
	public void transferTo(@NonNull File dest) throws IOException, IllegalStateException {
		Files.write(dest.toPath(), this.bytes, StandardOpenOption.TRUNCATE_EXISTING);
	}
}
