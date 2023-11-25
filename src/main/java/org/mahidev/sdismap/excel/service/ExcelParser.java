package org.mahidev.sdismap.excel.service;

import lombok.NonNull;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

public interface ExcelParser<T> {

    List<T> parseExcel(@NonNull final Path xlsFile) throws IOException;
}
