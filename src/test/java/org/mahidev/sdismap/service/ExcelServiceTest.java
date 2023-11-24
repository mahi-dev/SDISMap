package org.mahidev.sdismap.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.StreamDataSource;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.utility.InMemoryMultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource({"classpath:application.properties", "classpath:application-dev.properties"})
class ExcelServiceTest {

    private static final String LIST_EMPTY_ERROR = "La liste est vide.";

    private static final String OBJECT_IS_NULL_ERROR = "L'objet est null.";
    @Autowired
    SdisRepository sdisRepository;

    @Autowired
    Manager.SdisService sdisService;

    @Autowired
    Manager.ReaderService<Sdis> readerService;

    @Autowired
    @Qualifier("fileDataSource")
    DataSource dataSource;

    private static void testEntities(final List<Sdis> allSdis) {
        assertFalse(allSdis.isEmpty(), LIST_EMPTY_ERROR);
        assertTrue(allSdis.stream().map(Sdis::getLocation).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
        assertTrue(allSdis.stream().map(Sdis::getEmissionReception).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
        assertTrue(allSdis.stream().map(Sdis::getFrequency).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
        assertTrue(allSdis.stream().map(Sdis::getAerien).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
    }

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
            assertFalse(sdisList.isEmpty(), LIST_EMPTY_ERROR);
            assertTrue(sdisList.stream().findFirst().map(Sdis::getLocation).isPresent(), OBJECT_IS_NULL_ERROR);
        }
    }

    @Test
    void saveOneSdis() throws IOException {
        final var sdisList = readerService.readExcel(dataSource);
        assertFalse(sdisList.isEmpty(), LIST_EMPTY_ERROR);
        assertTrue(sdisList.stream().map(Sdis::getLocation).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
        sdisRepository.save(sdisList.stream().findFirst().get());
        final var allSdis = sdisService.getAllSdis();
        assertTrue(allSdis.size() == 1);
        assertFalse(allSdis.isEmpty(), LIST_EMPTY_ERROR);
        assertTrue(allSdis.stream().map(Sdis::getLocation).allMatch(Objects::nonNull), OBJECT_IS_NULL_ERROR);
    }

    @Test
    void saveExcel() throws IOException {
        testEntities(readerService.saveExcel(dataSource));
        testEntities(sdisService.getAllSdis());
    }

    @Test
    void saveExcelFromMultiPart() throws IOException {
        try (final var datasource = new StreamDataSource(new InMemoryMultipartFile(dataSource.getPath()))) {
            final var sdisList = readerService.saveExcel(datasource);
            assertFalse(sdisList.isEmpty());
            assertFalse(sdisService.getAllSdis().isEmpty());
        }
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
