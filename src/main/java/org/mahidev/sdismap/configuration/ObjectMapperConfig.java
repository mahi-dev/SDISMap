package org.mahidev.sdismap.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ObjectMapperConfig implements InitializingBean {

	private final NullAsEmptyStringSerializer nullSerializer;

	private final ObjectMapper objectMapper;

	@Override
	public void afterPropertiesSet() {
		final var serializerProvider = new DefaultSerializerProvider.Impl();
		serializerProvider.setNullValueSerializer(nullSerializer);
		objectMapper.setSerializerProvider(serializerProvider);
	}

}
