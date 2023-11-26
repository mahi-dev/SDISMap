package org.mahidev.sdismap.repository;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.Sdis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import specification.SdisSpecifications;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface SdisRepository extends JpaRepository<Sdis, Long>, JpaSpecificationExecutor<Sdis> {

    default List<Sdis> filterSdis(@NonNull final Filter filter) {
        return findAll(SdisSpecifications.filterBy(filter));
    }

    Optional<Sdis> findByName(@NotBlank final String name);

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
