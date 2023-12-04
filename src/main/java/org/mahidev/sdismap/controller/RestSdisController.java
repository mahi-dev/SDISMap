package org.mahidev.sdismap.controller;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.mahidev.sdismap.datasource.StreamDataSource;
import org.mahidev.sdismap.dto.LocationDto;
import org.mahidev.sdismap.exception.GlobalExceptionHandler;
import org.mahidev.sdismap.exception.ImportSdisException;
import org.mahidev.sdismap.exception.SdisDescriptionNotFoundException;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.model.SdisData;
import org.mahidev.sdismap.service.Manager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/sdis")
public record RestSdisController(Manager.SdisService service, Manager.ReaderService<Sdis> readerService) {

	@GetMapping("/")
	public SdisData getAllSdis() {
		return new SdisData(service.getAllSdis());
	}

	@GetMapping("/search/{searchTerm}")
	public SdisData findSdis(@PathVariable final String searchTerm) {
		return new SdisData(service.findSdis(searchTerm));
	}

	@GetMapping("/filter/{searchTerm}")
	public SdisData getFilteredSdis(@PathVariable(required = false) final String searchTerm, @RequestParam(required = false) final List<String> name,
			@RequestParam(required = false) final List<Integer> anfrNumber, @RequestParam(required = false) final List<Integer> inseeSite,
			@RequestParam(required = false) final List<String> municipality, @RequestParam(required = false) final List<Integer> postalCode) {
		return new SdisData(service.getFilteredSdis(searchTerm, name, anfrNumber, inseeSite, municipality, postalCode));
	}

	@GetMapping("/filter")
	public SdisData getFilteredSdis(@RequestParam(required = false) final List<String> name,
			@RequestParam(required = false) final List<Integer> anfrNumber, @RequestParam(required = false) final List<Integer> inseeSite,
			@RequestParam(required = false) final List<String> municipality, @RequestParam(required = false) final List<Integer> postalCode) {
		return new SdisData(service.getFilteredSdis("", name, anfrNumber, inseeSite, municipality, postalCode));
	}

	@GetMapping("/{id}")
	public Sdis getSdis(@PathVariable @NotBlank final int id) {
		return service.getSdis(id).orElseThrow(() -> new SdisDescriptionNotFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
	}

	@GetMapping("/description/{name}")
	public String getDescription(@PathVariable @NotBlank final String name) {
		return service.getDescription(name)
				.orElseThrow(() -> new SdisDescriptionNotFoundException(GlobalExceptionHandler.SDIS_DESCRIPTION_NOT_FOUND_EXCEPTION));
	}

	@GetMapping("/location/{id}")
	public LocationDto getLocation(@PathVariable @NotBlank final int id) {
		return service.getSdis(id).map(LocationDto::toDto)
				.orElseThrow(() -> new SdisDescriptionNotFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
	}

	@GetMapping(value = "/import")
	public SdisData importSdis() {
		try {
			return new SdisData(readerService.saveExcel());
		} catch (final IOException e) {
			throw new ImportSdisException(GlobalExceptionHandler.IMPORT_SDIS_EXCEPTION_MESSAGE, e);
		}
	}

	@PostMapping(value = "/import")
	public SdisData importSdis(@RequestBody @NonNull final MultipartFile file) {
		try (final var datasource = new StreamDataSource(file)) {
			return new SdisData(readerService.saveExcel(datasource));
		} catch (final IOException e) {
			throw new ImportSdisException(GlobalExceptionHandler.IMPORT_SDIS_EXCEPTION_MESSAGE, e);
		}
	}

	@GetMapping(value = "/count")
	public long countSdis() {
		return service.count();
	}

	@GetMapping("/filters")
	public Filter getFilter() {
		return service.getFilter().orElseThrow();
	}

}
