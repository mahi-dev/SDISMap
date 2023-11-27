package org.mahidev.sdismap.datasource;

import java.io.InputStream;

public interface DataSource {

	InputStream getInputStream();

	String getFileName();

	String getFileExtension();
}
