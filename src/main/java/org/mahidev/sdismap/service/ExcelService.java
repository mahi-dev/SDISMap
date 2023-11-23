package org.mahidev.sdismap.service;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.read.listener.ReadListener;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.model.Sdis;

import java.util.List;

public record ExcelService(Manager.SdisService service, ReadListener<?> listener, DataSource dataSource) implements Manager.ExcelService {
	@Override
	public List<Sdis> readExcel() {
		final var filePath = dataSource.getPath().toString();
		EasyExcel.read(filePath, Sdis.class, listener).sheet().doRead();
		return service.getAllSdis();
	}
}
