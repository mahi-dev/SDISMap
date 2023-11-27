package specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.NonNull;
import org.mahidev.sdismap.model.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class SdisSpecifications {

	public static Specification<Sdis> hasSearchTerm(@NonNull final String searchTerm) {
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
				Join<Sdis, Location> locationJoin = root.join("location", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(locationJoin.get("siteLongitude")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("siteLatitude")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("address")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("municipality")), wildcard));
				predicates.add(cb.like(cb.lower(locationJoin.get("postalCode").as(String.class)), wildcard));

				Join<Sdis, Aerien> aerienJoin = root.join("aerien", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(aerienJoin.get("number").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("type")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("dimension")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("tilt")), wildcard));
				predicates.add(cb.like(cb.lower(aerienJoin.get("height")), wildcard));

				Join<Sdis, EmissionReception> emissionReceptionJoin = root.join("emissionReception", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("systme")), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("designation")), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("power").as(String.class)), wildcard));
				predicates.add(cb.like(cb.lower(emissionReceptionJoin.get("powerUnit")), wildcard));

				Join<Sdis, Frequency> frequencyJoin = root.join("frequency", JoinType.LEFT);
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandMin")), wildcard));
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandMax")), wildcard));
				predicates.add(cb.like(cb.lower(frequencyJoin.get("bandService")), wildcard));
			}

			return cb.or(predicates.toArray(new Predicate[0]));
		};
	}

	public static Specification<Sdis> filterBy(@NonNull final Filter filter) {
		return (root, query, criteriaBuilder) -> {
			final var predicates = new ArrayList<Predicate>();

			if (filter.names() != null && !filter.names().isEmpty()) {
				predicates.add(root.get("name").as(String.class).in(filter.names()));
			}
			if (filter.anfrNumbers() != null && !filter.anfrNumbers().isEmpty()) {
				predicates.add(root.get("anfrNumber").as(Integer.class).in(filter.anfrNumbers()));
			}
			if (filter.inseeSites() != null && !filter.inseeSites().isEmpty()) {
				predicates.add(root.get("inseeSite").as(Integer.class).in(filter.inseeSites()));
			}
			if (filter.municipalities() != null && !filter.municipalities().isEmpty()) {
				predicates.add(root.join("location").get("municipality").as(String.class).in(filter.municipalities()));
			}
			if (filter.postalCodes() != null && !filter.postalCodes().isEmpty()) {
				predicates.add(root.join("location").get("postalCode").in(filter.postalCodes()));
			}

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		};
	}
}
