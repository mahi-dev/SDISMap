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
import org.mahidev.sdismap.utility.SdisComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

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
        testEntities(sdisList);
        sdisList.stream().findAny().ifPresent(sdis -> {
            final var savedSdis = sdisRepository.save(sdis);
            assertTrue(SdisComparator.areSdisEntitiesEqual(sdis, savedSdis));
        });
        final var allSdis = sdisService.getAllSdis();
        assertEquals(1, allSdis.size());
        testEntities(allSdis);
    }

    @Test
    void saveExcel() throws IOException {
        testEntities(readerService.saveExcel(dataSource));
        testEntities(sdisService.getAllSdis());
    }

    @Test
    void isPresent() throws IOException {
        final var limit = 3;
        final var savedSdis = readerService.saveExcel(dataSource, limit);
        assertEquals(limit, savedSdis.size());
        testEntities(savedSdis);
        final var allSdis = sdisService.getAllSdis();
        assertEquals(limit, allSdis.size());
        testEntities(allSdis);
        final var sdisList = readerService.readExcel(dataSource, limit);
        assertEquals(limit, sdisList.size());
        testEntities(sdisList);
        IntStream.range(0, sdisList.size())
                .forEach(i -> {
                    final var sdis = sdisList.get(i);
                    assertTrue(SdisComparator.isPresent(allSdis, sdis),
                            String.format("Erreur a l'index %s pour l'objet %s", i, sdis));
                });
    }

    @Test
    void saveExcelFromMultiPart() throws IOException {
        try (final var datasource = new StreamDataSource(new InMemoryMultipartFile(dataSource.getPath()))) {
            testEntities(readerService.saveExcel(datasource));
        }
    }
}
