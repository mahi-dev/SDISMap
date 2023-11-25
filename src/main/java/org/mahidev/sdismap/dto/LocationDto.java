package org.mahidev.sdismap.dto;

import lombok.NonNull;
import org.mahidev.sdismap.model.Sdis;

public record LocationDto(String Name, String address, int postalCode, String municipality, String siteLatitude,
                          String siteLongitude) {
    public static LocationDto toDto(@NonNull final Sdis sdis) {
        return new LocationDto(sdis.getName(), sdis.getLocation().getAddress(), sdis.getLocation().getPostalCode(),
                sdis.getLocation().getMunicipality(), sdis.getLocation().getSiteLatitude(), sdis.getLocation().getSiteLongitude());
    }
}
