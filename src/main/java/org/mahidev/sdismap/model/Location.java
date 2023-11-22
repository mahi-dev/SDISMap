package org.mahidev.sdismap.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class Location {

    @NotNull
    private final BigDecimal latitude;
    @NotNull
    private final BigDecimal longitude;
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

    @NonNull
    @OneToOne
    @JoinColumn(name = "sdis_id")
    private Sdis sdis;
}
