package org.mahidev.sdismap.specification;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.NonNull;
import org.mahidev.sdismap.model.FilterSdis;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class SdisSpecifications {

	public static <T> Specification<T> hasSearchTerm(@NonNull final String searchTerm) {
		return (root, query, cb) -> {
			final var predicates = new ArrayList<Predicate>();
			if (!searchTerm.isEmpty()) {
				final var wildcard = "%" + searchTerm.toLowerCase() + "%";
				predicates.add(cb.like(cb.lower(root.get("name")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("mainUser")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("anfrNumber").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(root.get("commissioningDate")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("inseeSite").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(root.get("cadastreReference")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportNumber")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportDescription")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportColors")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportMarking")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportNature")), wildcard));
				predicates.add(cb.like(cb.lower(root.get("supportOwner")), wildcard));

				// Pour les champs imbriqués
				final var locationJoin = root.join("location", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(locationJoin.get("siteLongitude")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("siteLatitude")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("address")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("municipality")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("postalCode").as(String.class)), wildcard));

				final var aerienJoin = root.join("aerien", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(aerienJoin.get("number").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("type")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("dimension")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("tilt")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("height")), wildcard));

				final var emissionReceptionJoin = root.join("emissionReception", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("system")), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("designation")), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("power").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("powerUnit")), wildcard));

				final var frequencyJoin = root.join("frequency", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandMin")), wildcard));
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandMax")), wildcard));
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandService")), wildcard));
			}

			return cb.or(predicates.toArray(new Predicate[0]));
		};
	}

	public static <T> Specification<T> filterBy(@NonNull final FilterSdis filter) {
		return (root, query, criteriaBuilder) -> {
			final var predicates = new ArrayList<Predicate>();

			if (filter.name() != null && !filter.name().isEmpty()) {
				predicates.add(root.get("name").as(String.class).in(filter.name()));
			}
			if (filter.anfrNumber() != null && !filter.anfrNumber().isEmpty()) {
				predicates.add(root.get("anfrNumber").as(Integer.class).in(filter.anfrNumber()));
			}
			if (filter.inseeSite() != null && !filter.inseeSite().isEmpty()) {
				predicates.add(root.get("inseeSite").as(Integer.class).in(filter.inseeSite()));
			}
			if (filter.municipality() != null && !filter.municipality().isEmpty()) {
				predicates.add(root.join("location").get("municipality").as(String.class).in(filter.municipality()));
			}
			if (filter.postalCode() != null && !filter.postalCode().isEmpty()) {
				predicates.add(root.join("location").get("postalCode").in(filter.postalCode()));
			}
			if (filter.latitude() != null && filter.longitude() != null && !filter.latitude().isEmpty() && !filter.longitude().isEmpty()) {
				predicates.add(root.join("location").get("siteLatitude").as(String.class).in(filter.latitude()));
				predicates.add(root.join("location").get("siteLongitude").as(String.class).in(filter.longitude()));
			}
			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		};
	}
}
