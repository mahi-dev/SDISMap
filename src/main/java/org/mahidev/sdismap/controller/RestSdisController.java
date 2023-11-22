package org.mahidev.sdismap.controller;

import jakarta.validation.constraints.NotBlank;
import lombok.extern.log4j.Log4j2;
import org.mahidev.sdismap.dto.LocationDto;
import org.mahidev.sdismap.exception.GlobalExceptionHandler;
import org.mahidev.sdismap.exception.SdisDescriptionNotFoundException;
import org.mahidev.sdismap.service.Manager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/api/sdis")
public record RestSdisController(Manager.SdisService service) {

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
}