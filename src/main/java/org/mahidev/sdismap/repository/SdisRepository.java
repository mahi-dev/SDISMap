package org.mahidev.sdismap.repository;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.mahidev.sdismap.model.FilterSdis;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.specification.SdisSpecifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface SdisRepository extends JpaRepository<Sdis, Long>, JpaSpecificationExecutor<Sdis> {

	default List<Sdis> filterSdis(@NonNull final FilterSdis filter) {
		return findAll(SdisSpecifications.filterBy(filter));
	}

	default List<Sdis> findSdis(@NonNull final String searchTerm) {
		return findAll(SdisSpecifications.hasSearchTerm(searchTerm));
	}

	default List<Sdis> filterSdis(final String searchTerm, final FilterSdis filter) {
		final var specification = (StringUtils.hasText(searchTerm)) ?
				SdisSpecifications.<Sdis>filterBy(filter).and(SdisSpecifications.hasSearchTerm(searchTerm)) :
				SdisSpecifications.<Sdis>filterBy(filter);
		return findAll(specification);
	}

	Optional<Sdis> findByName(@NonNull final String name);

	List<Sdis> findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(@NotNull final String siteLatitude, @NotNull final String siteLongitude);

	@Query("SELECT DISTINCT s.name FROM Sdis s")
	List<String> findDistinctNames();

	@Query("SELECT DISTINCT s.anfrNumber FROM Sdis s")
	List<Integer> findDistinctAnfrNumbers();

	@Query("SELECT DISTINCT s.inseeSite FROM Sdis s")
	List<Integer> findDistinctInseeSites();

	@Query("SELECT DISTINCT loc.municipality FROM Sdis s JOIN s.location loc")
	List<String> findDistinctMunicipalities();

	@Query("SELECT DISTINCT loc.postalCode FROM Sdis s JOIN s.location loc")
	List<Integer> findDistinctLocationPostalCodes();
}
