package org.mahidev.sdismap.excel.service;

import jakarta.validation.constraints.NotNull;

import java.nio.file.Path;
import java.util.List;

public interface ExcelParser<T> {

    List<T> parseExcel(@NotNull final Path xlsFile);
}
