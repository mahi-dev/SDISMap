package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.utility.SdisComparator;

import java.util.List;
import java.util.Optional;

public record SdisService(SdisRepository repository) implements Manager.SdisService {

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public List<Sdis> getAllSdis() {
        return repository.findAll();
    }

    @Override
    public List<Sdis> saveAllSdis(@NotNull final @NonNull List<Sdis> sdisList) {
        final var filtered = SdisComparator.filter(getAllSdis(), sdisList); //@Todo à reparer
        return repository.saveAll(filtered);
    }

    @Override
    public Optional<Sdis> getSdis(final long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Sdis> getSdis(@NotBlank final String name) {
        return repository.findByName(name);
    }

    @Override
    public Optional<String> getDescription(@NotBlank final String name) {
        return repository.findByName(name).map(Sdis::getSupportDescription);
    }
}
