package org.mahidev.sdismap.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.StreamDataSource;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.web.InMemoryMultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource({"classpath:application.properties", "classpath:application-dev.properties"})
class ExcelServiceTest {

	@Autowired
	SdisRepository sdisRepository;

	@Autowired
	Manager.SdisService sdisService;

	@Autowired
	Manager.ReaderService<Sdis> readerService;

	@Autowired
	@Qualifier("fileDataSource")
	DataSource dataSource;

	@BeforeEach
	void setUp() {
		sdisRepository.deleteAll();
	}

	@AfterEach
	void tearDown() {
		sdisRepository.deleteAll();
	}

	@Test
	void readExcel() throws IOException {
		final var sdisList = readerService.readExcel(dataSource);
		assertFalse(sdisList.isEmpty());
	}

	@Test
	void readExcelFromMultiPart() throws IOException {
		try (final var datasource = new StreamDataSource(new InMemoryMultipartFile(dataSource.getPath()))) {
			final var sdisList = readerService.readExcel(datasource);
			assertFalse(sdisList.isEmpty());
		}
	}

	@Test
	void saveExcel() throws IOException {
		final var sdisList = readerService.saveExcel(dataSource);
		assertFalse(sdisList.isEmpty());
		assertFalse(sdisService.getAllSdis().isEmpty());
	}

	@Test
	void service() {
	}

	@Test
	void listener() {
	}

	@Test
	void dataSource() {
	}
}
