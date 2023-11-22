package org.mahidev.sdismap.service;


import jakarta.validation.constraints.NotBlank;
import org.mahidev.sdismap.model.Location;

import java.util.Optional;

public class Manager {


    public interface SdisService {

        Optional<Location> getLocation(@NotBlank final String name);

        Optional<String> getDescription(@NotBlank final String name);
    }

}
