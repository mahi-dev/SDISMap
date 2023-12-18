package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.FilterSdis;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.projection.SdisCommon;
import org.mahidev.sdismap.projection.SdisDetails;
import org.mahidev.sdismap.repository.SdisCommonRepository;
import org.mahidev.sdismap.repository.SdisDetailsRepository;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.utility.SdisComparator;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

public record SdisService(SdisRepository repository, SdisCommonRepository commonRepository, SdisDetailsRepository detailsRepository)
		implements Manager.SdisService {

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
		final var filtered = SdisComparator.filter(getAllSdis(), sdisList);
		repository.saveAll(filtered);
		return getAllSdis();
	}

	@Override
	public Optional<Sdis> getSdis(final long id) {
		return repository.findById(id);
	}

	@Override
	public Optional<Sdis> getSdis(@NonNull final String name) {
		return repository.findByName(name);
	}

	@Override
	public List<Sdis> getSdis(@NotNull final String siteLatitude, @NotNull final String siteLongitude) {
		return repository.findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(siteLatitude, siteLongitude);
	}

	@Override
	public List<SdisCommon> getSdisCommon(String siteLatitude, String siteLongitude) {
		return commonRepository.findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(siteLatitude, siteLongitude);
	}

	@Override
	public List<SdisDetails> getSdisDetails(String siteLatitude, String siteLongitude) {
		return detailsRepository.findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(siteLatitude, siteLongitude);
	}

	@Override
	public Optional<String> getDescription(@NonNull final String name) {
		return repository.findByName(name).map(Sdis::getSupportDescription);
	}

	@Override
	public Optional<Filter> getFilter() {
		return Optional.of(new Filter(repository.findDistinctNames(), repository.findDistinctAnfrNumbers(), repository.findDistinctInseeSites(),
				repository.findDistinctMunicipalities(), repository.findDistinctLocationPostalCodes()));
	}

	@Override
	public List<Sdis> getFilteredSdis(final String searchTerm, final List<String> names, final List<Integer> anfrNumbers, final List<Integer> inseeSites,
			final List<String> municipalities, final List<Integer> postalCodes) {
		return repository.filterSdis(searchTerm,
				new FilterSdis(names, anfrNumbers, inseeSites, municipalities, postalCodes, Collections.emptyList(), Collections.emptyList()));
	}

	@Override
	public List<Sdis> getFilteredSdis(String searchTerm, List<String> names, List<Integer> anfrNumbers, List<Integer> inseeSites,
			List<String> municipalities, List<Integer> postalCodes, List<String> latitude, List<String> longitude) {
		return repository.filterSdis(searchTerm, new FilterSdis(names, anfrNumbers, inseeSites, municipalities, postalCodes, latitude, longitude));
	}

	@Override
	public List<Sdis> getFilteredSdis(final List<String> names, final List<Integer> anfrNumbers, final List<Integer> inseeSites,
			final List<String> municipalities, final List<Integer> postalCodes) {
		return repository.filterSdis(
				new FilterSdis(names, anfrNumbers, inseeSites, municipalities, postalCodes, Collections.emptyList(), Collections.emptyList()));
	}

	@Override
	public List<Sdis> findSdis(@NonNull final String searchTerm) {
		return repository.findSdis(searchTerm);
	}

	@Override
	public boolean deleteAll() {
		repository.deleteAll();
		return getAllSdis().isEmpty();
	}
}
