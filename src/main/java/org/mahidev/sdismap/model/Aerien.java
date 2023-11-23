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
public class Aerien {

	@ExcelProperty("Aerien N°")
	private final String number;

	@ExcelProperty("Aerien Ref. Petitionnaire")
	private final String petitionerReference;

	@ExcelProperty("Aerien Type")
	private final String type;

	@ExcelProperty("Aerien Dimension (m)")
	private final String dimension;

	@ExcelProperty("Aerien Tilt (Deg.)")
	private final String tilt;

	@ExcelProperty("Aerien Azymuth (Deg.)")
	private final String azimuth;

	@ExcelProperty("Aerien Ouverture (Deg.)")
	private final String opening;

	@ExcelProperty("Aerien Hauteur (m)")
	private final String height;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

	@NotNull
	@OneToOne
	private Sdis sdis;
}
