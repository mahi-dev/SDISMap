package org.mahidev.sdismap.datasource;

import org.springframework.util.MimeType;

import java.io.InputStream;
import java.nio.file.Path;

public interface DataSource {
	Path getPath();

	InputStream getInputStream();

	MimeType getMimeType();
}
