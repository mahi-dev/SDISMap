package org.mahidev.sdismap.excel.service;

import lombok.NonNull;
import org.springframework.util.MimeType;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.List;

public interface ExcelParser<T> {

	List<T> parseExcel(@NonNull final Path xlsFile) throws IOException;

	List<T> parseExcel(@NonNull final InputStream xlsFile, @NonNull final MimeType type) throws IOException;
}
