package org.mahidev.sdismap.dto;

import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.model.Location;

import java.math.BigDecimal;

public record LocationDto(String Name, BigDecimal latitude, BigDecimal longitude) {
    public static LocationDto toDto(@NotNull final Location location) {
        return new LocationDto(location.getSdis().getName(), location.getLatitude(), location.getLongitude());
    }
}
