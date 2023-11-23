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

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class EmissionReception {

	@ExcelProperty("EmRec N°")
	private final String number;

	@ExcelProperty("EmRec Systeme")
	private final String systme;

	@ExcelProperty("EmRec Designation Em.")
	private final String designation;

	@ExcelProperty("EmRec Puissance (dBW)")
	private final BigDecimal power;

	@ExcelProperty("EmRec Unite de Puissance")
	private final String powerUnit;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

	@NotNull
	@OneToOne
	private Sdis sdis;
}
