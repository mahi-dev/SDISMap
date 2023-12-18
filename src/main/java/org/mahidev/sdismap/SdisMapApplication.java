package org.mahidev.sdismap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.mahidev.sdismap.configuration.NullAsEmptyStringSerializer;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.FileDataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.excel.service.PoijiExcelReader;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.model.User;
import org.mahidev.sdismap.repository.SdisCommonRepository;
import org.mahidev.sdismap.repository.SdisDetailsRepository;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.repository.UserRepository;
import org.mahidev.sdismap.service.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication(scanBasePackages = {"org.mahidev.sdismap.configuration", "org.mahidev.sdismap.controller", "org.mahidev.sdismap.exception",
		"org.mahidev.sdismap.repository", "org.mahidev.sdismap.projection"})
@EntityScan({"org.mahidev.sdismap.model"})
@EnableJpaRepositories({"org.mahidev.sdismap.repository"})
@EnableConfigurationProperties({FileDataSource.class})
@ConfigurationPropertiesScan
public class SdisMapApplication {

	public static void main(final String[] args) {
		SpringApplication.run(SdisMapApplication.class, args);
	}

	@Bean
	@Primary
	ObjectMapper objectMapper(final NullAsEmptyStringSerializer nullSerializer) {
		final var serializerProvider = new DefaultSerializerProvider.Impl();
		serializerProvider.setNullValueSerializer(nullSerializer);
		final var objectMapper = new ObjectMapper();
		final var javaTimeModule = new JavaTimeModule();
		final var dateSerializer = new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("dd-MM-yyyy - MM:HH:ss"));
		javaTimeModule.addSerializer(LocalDateTime.class, dateSerializer);
		objectMapper.registerModule(javaTimeModule);
		objectMapper.setSerializerProvider(serializerProvider);
		return objectMapper;
	}

	@Lazy
	@Bean
	UserManager.Service userService(final UserRepository repository) {
		return new UserService(repository);
	}

	@Lazy
	@Bean
	@Primary
	UserDetailsService customUserDetailsService(final UserManager.Service service) {
		return new CustomUserDetailsService(service);
	}

	@Bean
	AuthenticationManager authenticationManager(final AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Lazy
	@Bean
	@Qualifier("sdisExcelService")
	Manager.ReaderService<Sdis> excelService(final Manager.SdisService service, final ExcelParser<Sdis> excelParser,
			@Qualifier("fileDataSource") final DataSource dataSource) {
		return new XlsReaderService(service, excelParser, dataSource);
	}

	@Lazy
	@Bean
	Manager.SdisService sdisService(final SdisRepository repository, final SdisCommonRepository commonRepository,
			final SdisDetailsRepository detailsRepository) {
		return new SdisService(repository, commonRepository, detailsRepository);
	}

	@Lazy
	@Bean
	ExcelParser<Sdis> excelParser() {
		return new PoijiExcelReader();
	}

	@Lazy
	@Bean
	CurrentUserService currentUserService() {
		return new CurrentUserService();
	}

	@Bean
	CommandLineRunner setup(final UserManager.Service userService) {
		return args -> {
			userService.createUser(new User("mahi", "$2a$10$D07Lnng6MPZcXvid7larMeBzpcWYgu0dKBEHyxVQB.cLqaZ.RCByO"));
			userService.createUser(new User("invite", "$2a$10$BLqzpxAUWBiD4.aW.v8hzuD9leZAVUXXMa/kWk8m8L3NnuO4GbqQ2"));
			userService.createUser(new User("invite2", "$2a$10$BLqzpxAUWBiD4.aW.v8hzuD9leZAVUXXMa/kWk8m8L3NnuO4GbqQ2"));
			userService.createUser(new User("invite3", "$2a$10$BLqzpxAUWBiD4.aW.v8hzuD9leZAVUXXMa/kWk8m8L3NnuO4GbqQ2"));
			userService.createUser(new User("invite4", "$2a$10$BLqzpxAUWBiD4.aW.v8hzuD9leZAVUXXMa/kWk8m8L3NnuO4GbqQ2"));
			userService.createUser(new User("invite5", "$2a$10$BLqzpxAUWBiD4.aW.v8hzuD9leZAVUXXMa/kWk8m8L3NnuO4GbqQ2"));
		};
	}

}
