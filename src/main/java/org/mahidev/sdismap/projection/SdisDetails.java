package org.mahidev.sdismap.projection;

import org.mahidev.sdismap.model.Sdis;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "sdisDetails", types = Sdis.class)
public interface SdisDetails {
	@Value("#{target.aerien.number}")
	int getAerienNumber();

	@Value("#{target.aerien.type}")
	String getAerienType();

	@Value("#{target.emissionReception.power}")
	String getPower();

	@Value("#{target.aerien.dimension}")
	String getAerienDimension();

	@Value("#{target.aerien.height}")
	String getAerienHeight();

	@Value("#{target.aerien.azimuth}")
	String getAerienAzimuth();

	@Value("#{target.frequency.bandMin}")
	String getFrequencyMin();

	@Value("#{target.frequency.bandMax}")
	String getFrequencyMax();

	@Value("#{target.frequency.bandService}")
	String getFrequencyService();
}

