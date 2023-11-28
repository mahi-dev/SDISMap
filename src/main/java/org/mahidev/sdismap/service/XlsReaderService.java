package org.mahidev.sdismap.service;

import lombok.NonNull;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.model.Sdis;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

public record XlsReaderService(Manager.SdisService service, ExcelParser<Sdis> excelParser, DataSource dataSource) implements Manager.ReaderService<Sdis> {

	@Override
	public List<Sdis> readExcel() throws IOException {
		return readExcel(dataSource);
	}

	@Override
	public List<Sdis> readExcel(@NonNull final DataSource dataSource) throws IOException {
		return excelParser.parseExcel(dataSource.getInputStream(), dataSource.getFileExtension());
	}

	@Override
	public List<Sdis> readExcel(@NonNull final DataSource dataSource, final int limit) throws IOException {
		return excelParser.parseExcel(dataSource.getInputStream(), dataSource.getFileExtension()).stream()
				.sorted(Comparator.comparing(Sdis::getAnfrNumber)).limit(limit).toList();
	}

	@Override
	public List<Sdis> readExcel(final int limit) throws IOException {
		return readExcel(dataSource, limit);
	}

	@Override
	public List<Sdis> saveExcel() throws IOException {
		return saveExcel(dataSource);
	}

	@Override
	public List<Sdis> saveExcel(@NonNull final DataSource dataSource) throws IOException {
		return service.saveAllSdis(readExcel(dataSource));
	}

	@Override
	public List<Sdis> saveExcel(@NonNull final DataSource dataSource, final int limit) throws IOException {
		return service.saveAllSdis(readExcel(dataSource, limit));
	}
}
