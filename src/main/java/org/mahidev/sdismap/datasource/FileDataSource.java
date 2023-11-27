package org.mahidev.sdismap.datasource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@ConfigurationProperties(prefix = "sdis")
@Qualifier("fileDataSource")
public final class FileDataSource implements DataSource {

	private String path;

	public InputStream getInputStream() {
		try {
			return new ClassPathResource(path).getInputStream();
		} catch (IOException e) {
			throw new RuntimeException("Erreur lors de l'obtention du InputStream pour le fichier: " + path, e);
		}
	}

	@Override
	public String getFileName() {
		if (path == null || path.isEmpty()) {
			return "";
		}
		final var parts = path.split("[\\\\/]");
		return parts[parts.length - 1];
	}

	@Override
	public String getFileExtension() {
		final var filename = getFileName();
		final var dotIndex = filename.lastIndexOf('.');
		return (dotIndex > 0 && dotIndex < filename.length() - 1) ? filename.substring(dotIndex + 1) : "";
	}
}
