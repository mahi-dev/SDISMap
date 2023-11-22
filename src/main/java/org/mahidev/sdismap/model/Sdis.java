package org.mahidev.sdismap.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class Sdis {

    @NotBlank
    @Column(unique = true)
    private final String name;
    @NotBlank
    @OneToOne(mappedBy = "sdis", cascade = CascadeType.ALL)
    private final Location location;
    @NotBlank
    private final String description;
    @NotNull
    private final int order;
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

}
