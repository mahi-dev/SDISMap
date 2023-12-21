package org.mahidev.sdismap.repository;

import lombok.NonNull;
import org.mahidev.sdismap.model.FilterSdis;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.projection.SdisDetails;
import org.mahidev.sdismap.specification.SdisSpecifications;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.util.StringUtils;

import java.util.List;

@RepositoryRestResource(excerptProjection = SdisDetails.class)
public interface SdisDetailsRepository extends JpaRepository<Sdis, Long>, JpaSpecificationExecutor<SdisDetails> {

	default List<SdisDetails> filterSdis(@NonNull final FilterSdis filter) {
		return findBy(SdisSpecifications.filterBy(filter), q -> q.as(SdisDetails.class)).all();
	}

	default List<SdisDetails> findSdis(@NonNull final String searchTerm) {
		return findBy(SdisSpecifications.hasSearchTerm(searchTerm), q -> q.as(SdisDetails.class)).all();
	}

	default List<SdisDetails> filterSdis(final String searchTerm, final FilterSdis filter, final Sort sort) {
		final var specification = (StringUtils.hasText(searchTerm)) ?
				SdisSpecifications.<SdisDetails>filterBy(filter).and(SdisSpecifications.hasSearchTerm(searchTerm)) :
				SdisSpecifications.<SdisDetails>filterBy(filter);
		return findBy(specification, q -> q.as(SdisDetails.class).sortBy(sort)).all();
	}

	List<SdisDetails> findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(String latitude, String longitude, Sort sort);
}
