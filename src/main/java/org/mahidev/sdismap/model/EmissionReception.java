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
public class EmissionReception {

	@ExcelCellName("EmRec N°")
	private final String number;

	@ExcelCellName("EmRec Systeme")
	private final String system;

	@ExcelCellName("EmRec Designation Em.")
	private final String designation;

	@ExcelCellName("EmRec Puissance (dBW)")
	private final double power;

	@ExcelCellName("EmRec Unite de Puissance")
	private final String powerUnit;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

}
