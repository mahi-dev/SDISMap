package org.mahidev.sdismap.datasource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.MimeType;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.Files.probeContentType;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@ConfigurationProperties(prefix = "sdis")
@Qualifier("fileDataSource")
public final class FileDataSource implements DataSource {

	private String path;

	public Path getPath() {
		try {
			return Paths.get(new ClassPathResource(path).getURI());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public InputStream getInputStream() {
		try {
			return new ClassPathResource(path).getInputStream();
		} catch (IOException e) {
			throw new RuntimeException("Erreur lors de l'obtention du InputStream pour le fichier: " + path, e);
		}
	}

	@Override
	public MimeType getMimeType() {
		try {
			return MimeType.valueOf(probeContentType(Path.of(path)));
		} catch (IOException e) {
			throw new RuntimeException("Erreur lors de l'obtention du InputStream pour le fichier: " + path, e);
		}
	}
}
