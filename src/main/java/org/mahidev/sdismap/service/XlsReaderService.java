package org.mahidev.sdismap.service;

import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.model.Sdis;

import java.util.List;

public record XlsReaderService(Manager.SdisService service, ExcelParser<Sdis> excelParser,
                               DataSource dataSource) implements Manager.ReaderService<Sdis> {
    @Override
    public List<Sdis> readExcel() {
        final var filePath = dataSource.getPath();
        return excelParser.parseExcel(filePath);
    }

    @Override
    public List<Sdis> saveExcel() {
        final var sdisList = readExcel();
        return service.saveAllSdis(sdisList);
    }
}
