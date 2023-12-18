package org.mahidev.sdismap.model;

import java.util.List;

public record SdisData<T>(int count, List<T> sdisList) {

	public SdisData(final List<T> sdisList) {
		this(sdisList.size(), sdisList);
	}

}
