package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class EmissionReception {

    @ExcelCellName("EmRec N°")
    private final String number;

    @ExcelCellName("EmRec Systeme")
    private final String systme;

    @ExcelCellName("EmRec Designation Em.")
    private final String designation;

    @ExcelCellName("EmRec Puissance (dBW)")
    private final BigDecimal power;

    @ExcelCellName("EmRec Unite de Puissance")
    private final String powerUnit;

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

}
