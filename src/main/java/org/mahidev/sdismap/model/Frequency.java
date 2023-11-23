package org.mahidev.sdismap.model;

import com.alibaba.excel.annotation.ExcelProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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
public class Frequency {

	@ExcelProperty("Bande Freq. Min.")
	private final String bandMin;

	@ExcelProperty("Bande Freq. Max.")
	private final String bandMax;

	@ExcelProperty("Bande Service")
	private final String bandService;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

	@NotNull
	@OneToOne
	private Sdis sdis;
}
