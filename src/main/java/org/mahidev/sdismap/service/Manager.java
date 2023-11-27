package org.mahidev.sdismap.service;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.Sdis;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public class Manager {
	public interface SdisService {

		long count();

		List<Sdis> getAllSdis();

		List<Sdis> saveAllSdis(@NonNull final List<Sdis> sdisList);

		Optional<Sdis> getSdis(final long id);

		Optional<Sdis> getSdis(@NotBlank final String name);

		Optional<String> getDescription(@NotBlank final String name);

		Optional<Filter> getFilter();

		List<Sdis> getFilteredSdis(List<String> names, List<Integer> anfrNumbers, List<Integer> inseeSites, List<String> municipalities,
				List<Integer> postalCodes);

		List<Sdis> findSdis(String search);
	}

	public interface ReaderService<T> {

		List<T> readExcel(@NonNull final DataSource dataSource) throws IOException;

		List<Sdis> readExcel(@NonNull DataSource dataSource, int limit) throws IOException;

		List<T> saveExcel(@NonNull final DataSource dataSource) throws IOException;

		List<T> saveExcel(@NonNull final DataSource dataSource, final int limit) throws IOException;
	}

}
