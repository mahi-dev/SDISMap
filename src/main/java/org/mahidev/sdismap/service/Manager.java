package org.mahidev.sdismap.service;


import jakarta.validation.constraints.NotBlank;
import org.mahidev.sdismap.model.Location;
import org.mahidev.sdismap.model.Sdis;

import java.util.List;
import java.util.Optional;

public class Manager {
    public interface SdisService {

        List<Sdis> getAllSdis();

        Optional<Location> getLocation(@NotBlank final String name);

        Optional<String> getDescription(@NotBlank final String name);
    }

    public interface ExcelService {

        List<Sdis> readExcel();
    }

}
