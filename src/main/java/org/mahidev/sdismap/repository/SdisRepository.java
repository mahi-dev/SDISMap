package org.mahidev.sdismap.repository;

import jakarta.validation.constraints.NotBlank;
import org.mahidev.sdismap.model.Sdis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface SdisRepository extends JpaRepository<Sdis, Long> {

    Optional<Sdis> findByName(@NotBlank final String name);
}
