package org.mahidev.sdismap.converter;

import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.cglib.core.Converter;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;

@Component
@ConfigurationPropertiesBinding
public class StringToPathConverter implements Converter {

	@Override
	public Object convert(Object value, Class target, Object context) {
		return Paths.get((String) value);
	}
}
