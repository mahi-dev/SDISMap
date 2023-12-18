package org.mahidev.sdismap.projection;

import org.mahidev.sdismap.model.Sdis;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "SdisCommon", types = Sdis.class)
public interface SdisCommon {
	@Value("#{target.name}")
	String getName();

	@Value("#{target.anfrNumber}")
	int getAnfrNumber();

	@Value("#{target.supportNumber}")
	String getSupportNumber();

	@Value("#{target.supportNature}")
	String getSupportNature();

	@Value("#{target.supportColors}")
	String getSupportColors();

	@Value("#{target.supportOwner}")
	String getSupportOwner();

	@Value("#{target.location.address} #{target.location.postalCode} #{target.location.municipality}")
	String getAddress();

	@Value("#{target.location.siteLongitude}")
	String getSiteLongitude();

	@Value("#{target.location.siteLatitude}")
	String getSiteLatitude();
}
