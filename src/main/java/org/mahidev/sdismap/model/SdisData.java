package org.mahidev.sdismap.model;

import org.mahidev.sdismap.utility.LocationUtils;

import java.util.List;

public record SdisData(int count, Center center, List<Sdis> sdisList) {

    public SdisData(final List<Sdis> sdisList) {
        this(sdisList.size(), LocationUtils.findCentralGeoLocation(sdisList), sdisList);
    }

}
