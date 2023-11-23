package org.mahidev.sdismap.model;

import com.alibaba.excel.annotation.ExcelProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class Location {

	@NotNull
	@ExcelProperty("Site Long. (Deg.)")
	private final String siteLongitude;

	@NotNull
	@ExcelProperty("Site Lat. (Deg.)")
	private final String siteLatitude;

	@ExcelProperty("Site Adresse")
	private final String address;

	@ExcelProperty("Site Lieu Dit")
	private final String placeName;

	@NotBlank
	@ExcelProperty("Site Commune")
	private final String municipality;

	@NotNull
	@ExcelProperty("Site Code Postal")
	private final Integer postalCode;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

	@NonNull
	@OneToOne
	private Sdis sdis;
}
