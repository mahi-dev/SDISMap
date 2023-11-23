package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotBlank;
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
	public Optional<Location> getLocation(@NotBlank final String name) {
		return repository.findByName(name).map(Sdis::getLocation);
	}

	@Override
	public Optional<String> getDescription(final String name) {
		return repository.findByName(name).map(Sdis::getSupportDescription);
	}
}
