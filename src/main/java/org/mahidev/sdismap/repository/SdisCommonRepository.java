package org.mahidev.sdismap.repository;

import lombok.NonNull;
import org.mahidev.sdismap.model.FilterSdis;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.projection.SdisCommon;
import org.mahidev.sdismap.specification.SdisSpecifications;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.util.StringUtils;

import java.util.List;

@RepositoryRestResource(excerptProjection = SdisCommon.class)
public interface SdisCommonRepository extends JpaRepository<Sdis, Long>, JpaSpecificationExecutor<SdisCommon> {
	default List<SdisCommon> filterSdis(@NonNull final FilterSdis filter, final Pageable limit) {
		return findAll(SdisSpecifications.filterBy(filter));
	}

	default List<SdisCommon> findSdis(@NonNull final String searchTerm) {
		return findAll(SdisSpecifications.hasSearchTerm(searchTerm));
	}

	default List<SdisCommon> filterSdis(final String searchTerm, final FilterSdis filter, final Sort sort) {
		final var specification = (StringUtils.hasText(searchTerm)) ?
				SdisSpecifications.<SdisCommon>filterBy(filter).and(SdisSpecifications.hasSearchTerm(searchTerm)) :
				SdisSpecifications.<SdisCommon>filterBy(filter);
		return findAll(specification, sort);
	}

	List<SdisCommon> findSdisByLocation_SiteLatitudeAndLocation_SiteLongitude(String latitude, String longitude, Sort sort);
}


