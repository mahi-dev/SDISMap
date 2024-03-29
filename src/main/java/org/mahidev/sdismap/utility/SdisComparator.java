package org.mahidev.sdismap.utility;

import lombok.NonNull;
import org.mahidev.sdismap.model.*;

import java.util.List;
import java.util.Objects;

public class SdisComparator {

	public static List<Sdis> filter(@NonNull final List<Sdis> sdisBase, @NonNull final List<Sdis> sdisToCompare) {
		return sdisToCompare.parallelStream().filter(sdis -> !isPresent(sdisBase, sdis)).toList();
	}

	public static boolean isPresent(@NonNull final List<Sdis> sdisBase, @NonNull final Sdis sdisToCompare) {
		return sdisBase.parallelStream().anyMatch(sdis -> areSdisEntitiesEqual(sdis, sdisToCompare));
	}

	public static boolean areSdisEntitiesEqual(@NonNull final Sdis sdisBase, @NonNull final Sdis sdisToCompare) {
		if (sdisBase == sdisToCompare) {
			return true;
		}

		return Objects.equals(sdisBase.getName(), sdisToCompare.getName()) && Objects.equals(sdisBase.getMainUser(),
				sdisToCompare.getMainUser()) && sdisBase.getAnfrNumber() == sdisToCompare.getAnfrNumber() && Objects.equals(
				sdisBase.getCommissioningDate(),
				sdisToCompare.getCommissioningDate()) && sdisBase.getInseeSite() == sdisToCompare.getInseeSite() && Objects.equals(
				sdisBase.getCadastreReference(), sdisToCompare.getCadastreReference()) && Objects.equals(sdisBase.getSupportNumber(),
				sdisToCompare.getSupportNumber()) && Objects.equals(sdisBase.getSupportDescription(),
				sdisToCompare.getSupportDescription()) && Objects.equals(sdisBase.getSupportColors(), sdisToCompare.getSupportColors()) && Objects.equals(
				sdisBase.getSupportMarking(), sdisToCompare.getSupportMarking()) && Objects.equals(sdisBase.getSupportNature(),
				sdisToCompare.getSupportNature()) && Objects.equals(sdisBase.getSupportOwner(),
				sdisToCompare.getSupportOwner()) && areLocationEntitiesEqual(sdisBase.getLocation(),
				sdisToCompare.getLocation()) && areAerienEntitiesEqual(sdisBase.getAerien(),
				sdisToCompare.getAerien()) && areEmissionReceptionEntitiesEqual(sdisBase.getEmissionReception(),
				sdisToCompare.getEmissionReception()) && areFrequencyEntitiesEqual(sdisBase.getFrequency(), sdisToCompare.getFrequency());
	}

	private static boolean areLocationEntitiesEqual(@NonNull final Location locationBase, @NonNull final Location locationToCompare) {
		if (locationBase == locationToCompare) {
			return true;
		}

		return Objects.equals(locationBase.getSiteLongitude(), locationToCompare.getSiteLongitude()) && Objects.equals(locationBase.getSiteLatitude(),
				locationToCompare.getSiteLatitude()) && Objects.equals(locationBase.getAddress(), locationToCompare.getAddress()) && Objects.equals(
				locationBase.getPlaceName(), locationToCompare.getPlaceName()) && Objects.equals(locationBase.getMunicipality(),
				locationToCompare.getMunicipality()) && locationBase.getPostalCode() == locationToCompare.getPostalCode();
	}

	private static boolean areAerienEntitiesEqual(@NonNull final Aerien aerienBase, @NonNull final Aerien aerienToCompare) {
		if (aerienBase == aerienToCompare) {
			return true;
		}

		return aerienBase.getNumber() == aerienToCompare.getNumber() && Objects.equals(aerienBase.getPetitionerReference(),
				aerienToCompare.getPetitionerReference()) && Objects.equals(aerienBase.getType(), aerienToCompare.getType()) && Objects.equals(
				aerienBase.getDimension(), aerienToCompare.getDimension()) && Objects.equals(aerienBase.getTilt(),
				aerienToCompare.getTilt()) && Objects.equals(aerienBase.getAzimuth(), aerienToCompare.getAzimuth()) && Objects.equals(
				aerienBase.getOpening(), aerienToCompare.getOpening()) && Objects.equals(aerienBase.getHeight(), aerienToCompare.getHeight());
	}

	private static boolean areEmissionReceptionEntitiesEqual(@NonNull final EmissionReception emissionReceptionBase,
			@NonNull final EmissionReception emissionReceptionToCompare) {
		if (emissionReceptionBase == emissionReceptionToCompare) {
			return true;
		}

		return Objects.equals(emissionReceptionBase.getNumber(), emissionReceptionToCompare.getNumber()) && Objects.equals(
				emissionReceptionBase.getSystem(), emissionReceptionToCompare.getSystem()) && Objects.equals(emissionReceptionBase.getDesignation(),
				emissionReceptionToCompare.getDesignation()) && Objects.equals(emissionReceptionBase.getPower(),
				emissionReceptionToCompare.getPower()) && Objects.equals(emissionReceptionBase.getPowerUnit(), emissionReceptionToCompare.getPowerUnit());
	}

	private static boolean areFrequencyEntitiesEqual(@NonNull final Frequency frequencyBase, @NonNull final Frequency frequencyToCompare) {
		if (frequencyBase == frequencyToCompare) {
			return true;
		}

		return Objects.equals(frequencyBase.getBandMin(), frequencyToCompare.getBandMin()) && Objects.equals(frequencyBase.getBandMax(),
				frequencyToCompare.getBandMax()) && Objects.equals(frequencyBase.getBandService(), frequencyToCompare.getBandService());
	}

}
