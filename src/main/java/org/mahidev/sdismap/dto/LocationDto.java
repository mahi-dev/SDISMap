package org.mahidev.sdismap.dto;

import jakarta.validation.constraints.NotNull;
import org.mahidev.sdismap.model.Location;

public record LocationDto(String Name, String address, int postalCode, String municipality, String siteLatitude, String siteLongitude) {
	public static LocationDto toDto(@NotNull final Location location) {
		return new LocationDto(location.getSdis().getName(), location.getAddress(), location.getPostalCode(), location.getMunicipality(),
				location.getSiteLatitude(), location.getSiteLongitude());
	}
}
