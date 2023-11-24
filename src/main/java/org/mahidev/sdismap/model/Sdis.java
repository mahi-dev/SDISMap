package org.mahidev.sdismap.model;

import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelCellRange;
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
    @ExcelCellName("Nom du Site")
    private final String name;

    @ExcelCellName("Site Utilisateur Principal")
    private final String mainUser;

    @ExcelCellName("Site N°ANFR")
    private final int anfrNumber;

    @ExcelCellName("Site Date Mise en Service")
    private final String commissioningDate;

    @ExcelCellName("Site Code INSEE")
    private final int inseeSite;

    @ExcelCellName("Site Ref Cadastre")
    private final String cadastreReference;

    @ExcelCellName("Support N°")
    private final String supportNumber;

    @ExcelCellName("Support Description")
    private final String supportDescription;

    @ExcelCellName("Support Couleurs")
    private final String supportColors;

    @ExcelCellName("Support Balisage")
    private final String supportMarking;

    @ExcelCellName("Support Nature")
    private final String supportNature;

    @ExcelCellName("Support Propriétaire")
    private final String supportOwner;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "location_id")
    @ExcelCellRange
    private final Location location;


    @NotNull
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "aerien_id")
    @ExcelCellRange
    private final Aerien aerien;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "sdis_em_rec")
    @ExcelCellRange
    private final EmissionReception emissionReception;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "sdis_frequency")
    @ExcelCellRange
    private final Frequency frequency;

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private Long id;

}
