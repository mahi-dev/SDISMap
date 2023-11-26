package org.mahidev.sdismap.utility;

import lombok.NonNull;
import org.mahidev.sdismap.exception.BadFormatException;
import org.mahidev.sdismap.model.Center;
import org.mahidev.sdismap.model.Sdis;

import java.util.List;
import java.util.stream.Collectors;

public class LocationUtils {

    public static Center findCentralGeoLocation(@NonNull final List<Sdis> sdis) {
        return sdis.stream()
                .map(Sdis::getLocation)
                .collect(Collectors.teeing(
                        Collectors.averagingDouble(loc -> convertToDecimal(loc.getSiteLatitude())),
                        Collectors.averagingDouble(loc -> convertToDecimal(loc.getSiteLongitude())),
                        (avgLat, avgLon) -> new Center(convertToDms(avgLat), convertToDms(avgLon))
                ));
    }

    private static double convertToDecimal(@NonNull final String dms) {
        // Extraire les degrés, minutes, secondes et la direction
        final var parts = dms.trim().split("[°'\"\\s]+");
        if (parts.length < 3) {
            throw new BadFormatException("Format de DMS invalide : " + dms);
        }

        final var degrees = Double.parseDouble(parts[0]);
        final var minutes = Double.parseDouble(parts[1]);
        final var seconds = Double.parseDouble(parts[2]);

        // Convertir en degrés décimaux
        final var decimal = Math.signum(degrees) * (Math.abs(degrees) + (minutes / 60.0) + (seconds / 3600.0));

        // Gestion des directions N/S/E/W
        return (dms.contains("S") || dms.contains("W")) ? -decimal : decimal;
    }

    private static String convertToDms(final double decimal) {
        final var degrees = (int) decimal;
        final var fractionalDegrees = Math.abs(decimal - degrees);
        final var minutes = (int) (fractionalDegrees * 60);
        final var fractionalMinutes = (fractionalDegrees * 60) - minutes;
        final var seconds = (int) (fractionalMinutes * 60);

        final var direction = degrees < 0 ? (decimal == degrees ? "S" : "W") : (decimal == degrees ? "N" : "E");
        return String.format("%d° %02d' %02d\" %s", Math.abs(degrees), minutes, seconds, direction);
    }

}
