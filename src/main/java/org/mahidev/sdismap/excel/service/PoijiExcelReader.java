package org.mahidev.sdismap.excel.service;

import com.poiji.bind.Poiji;
import org.mahidev.sdismap.model.Sdis;

import java.nio.file.Path;
import java.util.List;

public record PoijiExcelReader() implements ExcelParser<Sdis> {
    @Override
    public List<Sdis> parseExcel(final Path xlsFile) {
        return Poiji.fromExcel(xlsFile.toFile(), Sdis.class);
    }
}
