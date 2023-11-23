package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.model.Location;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;

import java.util.List;
import java.util.Optional;

public record SdisService(SdisRepository repository) implements Manager.SdisService {

    @Override
    public List<Sdis> getAllSdis() {
        return repository.findAll();
    }

    @Override
    public List<Sdis> saveAllSdis(@NotNull final List<Sdis> sdisList) {
        return repository.saveAll(sdisList);
    }

    @Override
    public Optional<Location> getLocation(@NotBlank final String name) {
        return repository.findByName(name).map(Sdis::getLocation);
    }

    @Override
    public Optional<String> getDescription(@NotBlank final String name) {
        return repository.findByName(name).map(Sdis::getSupportDescription);
    }
}
