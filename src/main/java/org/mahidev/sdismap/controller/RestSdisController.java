package org.mahidev.sdismap.controller;

import jakarta.validation.constraints.NotBlank;
import lombok.extern.log4j.Log4j2;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.StreamDataSource;
import org.mahidev.sdismap.dto.LocationDto;
import org.mahidev.sdismap.exception.GlobalExceptionHandler;
import org.mahidev.sdismap.exception.ImportSdisException;
import org.mahidev.sdismap.exception.SdisDescriptionNotFoundException;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.service.Manager;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/sdis")
public record RestSdisController(Manager.SdisService service, Manager.ReaderService<Sdis> readerService, DataSource dataSource) {

	@GetMapping("/description/{name}")
	public String getDescription(@PathVariable @NotBlank final String name) {
		return service.getDescription(name)
				.orElseThrow(() -> new SdisDescriptionNotFoundException(GlobalExceptionHandler.SDIS_DESCRIPTION_NOT_FOUND_EXCEPTION));
	}

	@GetMapping("/location/{name}")
	public LocationDto getLocation(@PathVariable @NotBlank final String name) {
		return service.getLocation(name).map(LocationDto::toDto)
				.orElseThrow(() -> new SdisDescriptionNotFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
	}

	@GetMapping(value = "/import")
	public List<Sdis> importSdis() {
		try {
			return readerService.saveExcel(dataSource);
		} catch (IOException e) {
			throw new ImportSdisException(GlobalExceptionHandler.IMPORT_SDIS_EXCEPTION_MESSAGE, e);
		}
	}

	@PostMapping(value = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public List<Sdis> importSdis(@RequestParam final MultipartFile file) {
		try (final var datasource = new StreamDataSource(file)) {
			return readerService.saveExcel(datasource);
		} catch (IOException e) {
			throw new ImportSdisException(GlobalExceptionHandler.IMPORT_SDIS_EXCEPTION_MESSAGE, e);
		}
	}

	@GetMapping(value = "/count")
	public long countSdis() {
		return service.count();
	}
}
