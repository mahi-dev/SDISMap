package specification;

import jakarta.persistence.criteria.Predicate;
import lombok.NonNull;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.Sdis;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class SdisSpecifications {

    public static Specification<Sdis> filterBy(@NonNull final Filter filter) {
        return (root, query, criteriaBuilder) -> {
            final var predicates = new ArrayList<Predicate>();

            if (filter.names() != null && !filter.names().isEmpty()) {
                predicates.add(root.get("name").in(filter.names()));
            }
            if (filter.anfrNumbers() != null && !filter.anfrNumbers().isEmpty()) {
                predicates.add(root.get("anfrNumber").in(filter.anfrNumbers()));
            }
            if (filter.inseeSites() != null && !filter.inseeSites().isEmpty()) {
                predicates.add(root.get("inseeSite").in(filter.inseeSites()));
            }
            if (filter.municipalities() != null && !filter.municipalities().isEmpty()) {
                predicates.add(root.join("location").get("municipality").in(filter.municipalities()));
            }
            if (filter.postalCodes() != null && !filter.postalCodes().isEmpty()) {
                predicates.add(root.join("location").get("postalCode").in(filter.postalCodes()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
