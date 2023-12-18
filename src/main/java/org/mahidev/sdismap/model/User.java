package org.mahidev.sdismap.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

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

	public User(@NonNull final String email, @NonNull final String password) {
		this.email = email;
		this.password = password;
		lastUpdate = LocalDateTime.now();
	}

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	private Long id;

	@NotBlank
	@NonNull
	private String email;

	@NotBlank
	@NonNull
	private String password;

	@NonNull
	private LocalDateTime lastUpdate;
}
