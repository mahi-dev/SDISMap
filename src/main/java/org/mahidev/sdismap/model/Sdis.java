package org.mahidev.sdismap.model;

import com.alibaba.excel.annotation.ExcelProperty;
import jakarta.persistence.*;
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
public class Sdis {

	@NotBlank
	@ExcelProperty("Nom du Site")
	private final String name;

	@ExcelProperty("Site Utilisateur Principal")
	private final String mainUser;

	@NotBlank
	@ExcelProperty("Site N°ANFR")
	private final String anfrNumber;

	@NotBlank
	@ExcelProperty("Site Date Mise en Service")
	private final String commissioningDate;

	@NotBlank
	@ExcelProperty("Site Code INSEE")
	private final String inseeSite;

	@ExcelProperty("Site Ref Cadastre")
	private final String cadastreReference;

	@ExcelProperty("Support N°")
	private final String supportNumber;

	@ExcelProperty("Support Description")
	private final String supportDescription;

	@ExcelProperty("Support Couleurs")
	private final String supportColors;

	@ExcelProperty("Support Balisage")
	private final String supportMarking;

	@ExcelProperty("Support Nature")
	private final String supportNature;

	@ExcelProperty("Support Propriétaire")
	private final String supportOwner;

	@NotNull
	@OneToOne(mappedBy = "sdis", cascade = CascadeType.ALL)
	@JoinColumn(name = "sdis_location")
	private final Location location;

	@NotNull
	private final int importance;

	@NotNull
	@OneToOne(mappedBy = "sdis", cascade = CascadeType.ALL)
	@JoinColumn(name = "sdis_air")
	private Aerien aerien;

	@NotNull
	@OneToOne(mappedBy = "sdis", cascade = CascadeType.ALL)
	@JoinColumn(name = "sdis_em_rec")
	private EmissionReception emissionReception;

	@NotNull
	@OneToOne(mappedBy = "sdis", cascade = CascadeType.ALL)
	@JoinColumn(name = "sdis_frequency")
	private Frequency frequency;

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

}
