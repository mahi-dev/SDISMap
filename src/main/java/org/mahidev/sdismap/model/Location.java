package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCell;
import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class Location {

    @NotNull
    @ExcelCellName("Site Long. (Deg.)")
    private final String siteLongitude;

    @NotNull
    @ExcelCellName("Site Lat. (Deg.)")
    private final String siteLatitude;

    @ExcelCell(6)
    private final String address;

    @ExcelCellName("Site Lieu Dit")
    private final String placeName;

    @NotBlank
    @ExcelCellName("Site Commune")
    private final String municipality;

    @ExcelCellName("Site Code Postal")
    private final int postalCode;

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;
}
