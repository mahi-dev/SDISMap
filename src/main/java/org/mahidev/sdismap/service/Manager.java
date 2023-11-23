package org.mahidev.sdismap.service;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.model.Location;
import org.mahidev.sdismap.model.Sdis;

import java.util.List;
import java.util.Optional;

public class Manager {
    public interface SdisService {

        List<Sdis> getAllSdis();

        List<Sdis> saveAllSdis(@NotNull final List<Sdis> sdisList);

        Optional<Location> getLocation(@NotBlank final String name);

        Optional<String> getDescription(@NotBlank final String name);
    }

    public interface ReaderService<T> {

        List<T> readExcel();

        List<T> saveExcel();
    }

}
