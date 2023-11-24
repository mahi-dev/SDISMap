package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.model.Sdis;

import java.io.IOException;
import java.util.List;

public record XlsReaderService(Manager.SdisService service, ExcelParser<Sdis> excelParser) implements Manager.ReaderService<Sdis> {
	@Override
	public List<Sdis> readExcel(@NotNull final DataSource dataSource) throws IOException {
		final var filePath = dataSource.getPath();
		return excelParser.parseExcel(filePath);
	}

	@Override
	public List<Sdis> saveExcel(@NotNull final DataSource dataSource) throws IOException {
		final var sdisList = readExcel(dataSource);
		return service.saveAllSdis(sdisList);
	}
}
