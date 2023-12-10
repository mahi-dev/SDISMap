package org.mahidev.sdismap.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Data
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@DynamicUpdate
public class User {

	public User(@NonNull final String email) {
		this.email = email;
		this.password = "0000";
	}

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long   id;

	@NotBlank
	@NonNull
	private String email;

	@NotBlank
	@NonNull
	private String password;
}
