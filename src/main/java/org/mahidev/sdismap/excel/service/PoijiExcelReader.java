package org.mahidev.sdismap.excel.service;

import com.poiji.bind.Poiji;
import com.poiji.exception.PoijiExcelType;
import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.exception.BadFormatException;
import org.mahidev.sdismap.model.Sdis;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public record PoijiExcelReader() implements ExcelParser<Sdis> {
	public static PoijiExcelType getPoijiExcelType(@NotNull final Path filePath) throws IOException {
		return switch (Files.probeContentType(filePath)) {
			case XLS -> PoijiExcelType.XLS;
			case XLSX -> PoijiExcelType.XLSX;
			default -> throw new BadFormatException(
					String.format("Le fichier %s est un %s, un %s ou un %s est attendu!", filePath.getFileName(), XLS, XLSX,
							Files.probeContentType(filePath)));
		};
	}

	private static final String XLS = "application/vnd.ms-excel";

	private static final String XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

	@Override
	public List<Sdis> parseExcel(@NotNull final Path xlsFile) throws IOException {
		try (final var fileStream = Files.newInputStream(xlsFile)) {
			return Poiji.fromExcel(fileStream, getPoijiExcelType(xlsFile), Sdis.class);
		}
	}

}
