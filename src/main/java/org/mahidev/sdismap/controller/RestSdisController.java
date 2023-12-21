package org.mahidev.sdismap.controller;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.mahidev.sdismap.datasource.StreamDataSource;
import org.mahidev.sdismap.dto.LocationDto;
import org.mahidev.sdismap.exception.GlobalExceptionHandler;
import org.mahidev.sdismap.exception.ImportSdisException;
import org.mahidev.sdismap.exception.NoLocationFoundException;
import org.mahidev.sdismap.exception.SdisDescriptionNotFoundException;
import org.mahidev.sdismap.model.Filter;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.model.SdisData;
import org.mahidev.sdismap.projection.SdisCommon;
import org.mahidev.sdismap.projection.SdisDetails;
import org.mahidev.sdismap.service.Manager;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/sdis")
public record RestSdisController(Manager.SdisService service, Manager.ReaderService<Sdis> readerService) {

	@GetMapping("/")
	public SdisData<Sdis> getAllSdis() {
		return new SdisData<>(service.getAllSdis());
	}

	@GetMapping("/location")
	public SdisData<Sdis> getSdis(@RequestParam final String latitude, @RequestParam final String longitude) {
		return new SdisData<>(service.getSdis(latitude, longitude));
	}

	@GetMapping("/common/location")
	public SdisCommon getSdisCommon(@RequestParam final String latitude, @RequestParam final String longitude) {
		return service.getSdisCommon(latitude, longitude, Collections.emptyList())
				.orElseThrow(() -> new NoLocationFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
	}

	@GetMapping("/common/filter/{searchTerm}")
	public SdisCommon getFilteredCommonSdis(@PathVariable(required = false) final String searchTerm,
			@RequestParam(required = false) final List<String> name, @RequestParam(required = false) final List<Integer> anfrNumber,
			@RequestParam(required = false) final List<Integer> inseeSite, @RequestParam(required = false) final List<String> municipality,
			@RequestParam(required = false) final List<Integer> postalCode, @RequestParam(required = false) final List<String> latitude,
			@RequestParam(required = false) final List<String> longitude) {
		return service.getFilteredCommonSdis(searchTerm, name, anfrNumber, inseeSite, municipality, postalCode, latitude, longitude,
				Collections.emptyList()).orElseThrow(() -> new NoLocationFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
	}

	@GetMapping("/details/location")
	public SdisData<SdisDetails> getSdisDetails(@RequestParam final String latitude, @RequestParam final String longitude,
			@RequestParam(required = false) final String sortBy) {
		return new SdisData<>(service.getSdisDetails(latitude, longitude, createOrder(sortBy)));
	}

	@GetMapping("/details/filter/{searchTerm}")
	public SdisData<SdisDetails> getFilteredDetailsSdis(@PathVariable(required = false) final String searchTerm,
			@RequestParam(required = false) final List<String> name, @RequestParam(required = false) final List<Integer> anfrNumber,
			@RequestParam(required = false) final List<Integer> inseeSite, @RequestParam(required = false) final List<String> municipality,
			@RequestParam(required = false) final List<Integer> postalCode, @RequestParam(required = false) final List<String> latitude,
			@RequestParam(required = false) final List<String> longitude, @RequestParam(required = false) final String sortBy) {
		return new SdisData<>(service.getFilteredDetailsSdis(searchTerm, name, anfrNumber, inseeSite, municipality, postalCode, latitude, longitude,
				createOrder(sortBy)));
	}

	private List<Sort.Order> createOrder(String sortBy) {
		final var order = new ArrayList<Sort.Order>();
		if (StringUtils.hasText(sortBy)) {
			final var splitValue = sortBy.trim().split("\\s+");
			final var propertyOrder = (splitValue.length == 2) ?
					("ASC".equalsIgnoreCase(splitValue[1])) ?
							Sort.Order.asc(splitValue[0]) :
							("DESC".equalsIgnoreCase(splitValue[1])) ? Sort.Order.desc(splitValue[0]) : null :
					null;
			if (propertyOrder != null)
				order.add(propertyOrder);
		}
		return order;
	}

	@GetMapping("/search/{searchTerm}")
	public SdisData<Sdis> findSdis(@PathVariable final String searchTerm) {
		return new SdisData<>(service.findSdis(searchTerm));
	}

	@GetMapping("/filter/{searchTerm}")
	public SdisData<Sdis> getFilteredSdis(@PathVariable(required = false) final String searchTerm, @RequestParam(required = false) final List<String> name,
			@RequestParam(required = false) final List<Integer> anfrNumber, @RequestParam(required = false) final List<Integer> inseeSite,
			@RequestParam(required = false) final List<String> municipality, @RequestParam(required = false) final List<Integer> postalCode,
			@RequestParam(required = false) final List<String> latitude, @RequestParam(required = false) final List<String> longitude) {
		return new SdisData<>(service.getFilteredSdis(searchTerm, name, anfrNumber, inseeSite, municipality, postalCode, latitude, longitude));
	}

	@GetMapping("/filter")
	public SdisData<Sdis> getFilteredSdis(@RequestParam(required = false) final List<String> name,
			@RequestParam(required = false) final List<Integer> anfrNumber, @RequestParam(required = false) final List<Integer> inseeSite,
			@RequestParam(required = false) final List<String> municipality, @RequestParam(required = false) final List<Integer> postalCode) {
		return new SdisData<>(service.getFilteredSdis("", name, anfrNumber, inseeSite, municipality, postalCode));
	}

	@GetMapping("/{id}")
	public Sdis getSdis(@PathVariable @NotBlank final int id) {
		return service.getSdis(id).orElseThrow(() -> new NoLocationFoundException(GlobalExceptionHandler.NO_LOCATION_FOUND_EXCEPTION_MESSAGE));
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
	public SdisData<Sdis> importSdis() {
		try {
			return new SdisData<>(readerService.saveExcel());
		} catch (final Exception e) {
			throw new ImportSdisException(GlobalExceptionHandler.IMPORT_SDIS_EXCEPTION_MESSAGE, e);
		}
	}

	@PostMapping(value = "/import")
	public SdisData<Sdis> importSdis(@RequestBody @NonNull final MultipartFile file) {
		try (final var datasource = new StreamDataSource(file)) {
			return new SdisData<>(readerService.saveExcel(datasource));
		} catch (final Exception e) {
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

	@DeleteMapping("/reset")
	public boolean reset() {
		return service.deleteAll();
	}

}
