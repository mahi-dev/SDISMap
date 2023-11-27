package org.mahidev.sdismap.excel.service;

import com.poiji.bind.Poiji;
import com.poiji.exception.PoijiExcelType;
import lombok.NonNull;
import org.mahidev.sdismap.exception.BadFormatException;
import org.mahidev.sdismap.model.Sdis;
import org.springframework.util.MimeType;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public record PoijiExcelReader() implements ExcelParser<Sdis> {
	public static PoijiExcelType getPoijiExcelType(@NonNull final Path filePath) throws IOException {
		return getPoijiExcelType(Files.probeContentType(filePath));
	}

	public static PoijiExcelType getPoijiExcelType(@NonNull final MimeType type) {
		return getPoijiExcelType(type.toString());
	}

	private static PoijiExcelType getPoijiExcelType(@NonNull final String type) {
		return switch (type) {
			case FileFormat.XLS_EXT -> PoijiExcelType.XLS;
			case FileFormat.XLSX_EXT -> PoijiExcelType.XLSX;
			default -> throw new BadFormatException(
					String.format("Le fichier est un %s, un %s ou un %s est attendu!", FileFormat.XLS, FileFormat.XLSX, type));
		};
	}

	@Override
	public List<Sdis> parseExcel(@NonNull final Path xlsFile) throws IOException {
		try (final var fileStream = Files.newInputStream(xlsFile)) {
			return Poiji.fromExcel(fileStream, getPoijiExcelType(xlsFile), Sdis.class);
		}
	}

	@Override
	public List<Sdis> parseExcel(@NonNull final InputStream xlsFile, @NonNull final String type) throws IOException {
		try (final var fileStream = xlsFile) {
			return Poiji.fromExcel(fileStream, getPoijiExcelType(type), Sdis.class);
		}
	}

}
