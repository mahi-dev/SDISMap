package org.mahidev.sdismap.model;

import java.util.List;

public record Filter(List<String> name, List<Integer> anfrNumber, List<Integer> inseeSite, List<String> municipality, List<Integer> postalCode) {
}
