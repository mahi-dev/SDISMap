package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.model.Sdis;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public class Manager {
    public interface SdisService {

        long count();

        List<Sdis> getAllSdis();

        List<Sdis> saveAllSdis(@NotNull final List<Sdis> sdisList);

        Optional<Sdis> getSdis(final long id);

        Optional<Sdis> getSdis(@NotBlank final String name);

        Optional<String> getDescription(@NotBlank final String name);


    }

    public interface ReaderService<T> {

        List<T> readExcel(@NotNull final DataSource dataSource) throws IOException;

        List<T> saveExcel(@NotNull final DataSource dataSource) throws IOException;
    }

}
