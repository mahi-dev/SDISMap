package org.mahidev.sdismap.service;

import org.junit.jupiter.api.*;
import org.mahidev.sdismap.repository.SdisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource({"classpath:application.properties", "classpath:application-dev.properties"})
class ExcelServiceTest {

	@Autowired
	SdisRepository sdisRepository;

	@Autowired
	Manager.SdisService sdisService;

	@Autowired
	Manager.ExcelService excelService;

	@BeforeEach
	void setUp() {
		sdisRepository.deleteAll();
	}

	@AfterEach
	void tearDown() {
		sdisRepository.deleteAll();
	}

	@Test
	void readExcel() {
		excelService.readExcel();
		final var sdisList = sdisService.getAllSdis();
		Assertions.assertFalse(sdisList.isEmpty());
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
