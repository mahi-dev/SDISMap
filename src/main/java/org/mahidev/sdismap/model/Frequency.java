package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.*;
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

	@OneToOne(fetch = FetchType.EAGER)
	private Sdis sdis;
}
