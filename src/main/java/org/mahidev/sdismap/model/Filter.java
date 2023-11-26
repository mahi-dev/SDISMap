package org.mahidev.sdismap.model;

import java.util.List;

public record Filter(List<String> names, List<Integer> anfrNumbers, List<Integer> inseeSites,
                     List<String> municipalities, List<Integer> postalCodes) {
}
