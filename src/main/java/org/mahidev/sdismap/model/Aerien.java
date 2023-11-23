package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
public class Aerien {

    @ExcelCellName("Aerien N°")
    private final int number;

    @ExcelCellName("Aerien Ref. Petitionnaire")
    private final String petitionerReference;

    @ExcelCellName("Aerien Type")
    private final String type;

    @ExcelCellName("Aerien Dimension (m)")
    private final String dimension;

    @ExcelCellName("Aerien Tilt (Deg.)")
    private final String tilt;

    @ExcelCellName("Aerien Azymuth (Deg.)")
    private final String azimuth;

    @ExcelCellName("Aerien Ouverture (Deg.)")
    private final String opening;

    @ExcelCellName("Aerien Hauteur (m)")
    private final String height;

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne
    private Sdis sdis;
}
