package org.mahidev.sdismap.repository;

import jakarta.transaction.Transactional;
import org.mahidev.sdismap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	@Transactional
	@Modifying
	@Query("update User u set u.email = ?2, u.password = ?3 where u.id = ?1")
	void updateUserByEmailAndPassword(long id, String email, String password);
}
