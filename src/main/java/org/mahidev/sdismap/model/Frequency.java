package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class Frequency {

    @ExcelCellName("Bande Freq. Min.")
    private final String bandMin;

    @ExcelCellName("Bande Freq. Max.")
    private final String bandMax;

    @ExcelCellName("Bande Service")
    private final String bandService;

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;


}
