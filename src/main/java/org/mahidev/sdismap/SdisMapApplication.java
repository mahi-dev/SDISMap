package org.mahidev.sdismap;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.DefaultSerializerProvider;
import org.mahidev.sdismap.configuration.NullAsEmptyStringSerializer;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.FileDataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.excel.service.PoijiExcelReader;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.model.User;
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
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static org.springframework.security.core.userdetails.User.withUsername;

@SpringBootApplication(scanBasePackages = {"org.mahidev.sdismap.configuration", "org.mahidev.sdismap.controller", "org.mahidev.sdismap.exception",
		"org.mahidev.sdismap.repository"})
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
	public ObjectMapper objectMapper(final NullAsEmptyStringSerializer nullSerializer) {
		final var serializerProvider = new DefaultSerializerProvider.Impl();
		serializerProvider.setNullValueSerializer(nullSerializer);
		ObjectMapper objectMapper = new ObjectMapper();
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
	UserDetailsService userDetailsService() {
		final var user = withUsername("mahi").password("$2a$10$D07Lnng6MPZcXvid7larMeBzpcWYgu0dKBEHyxVQB.cLqaZ.RCByO").roles("USER").build();
		final var admin = withUsername("admin").password("$2a$10$hdySJB/sNy2/U6ss.ejj..rajl9jT2vMZxBVf7iq84Rj90n/qUVdu").roles("ADMIN", "USER").build();
		return new InMemoryUserDetailsManager(user, admin);
	}

	@Bean
	public AuthenticationManager authenticationManager(final AuthenticationConfiguration authenticationConfiguration) throws Exception {
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
	Manager.SdisService sdisService(final SdisRepository repository) {
		return new SdisService(repository);
	}

	@Lazy
	@Bean
	ExcelParser<Sdis> excelParser() {
		return new PoijiExcelReader();
	}

	@Bean
	protected CommandLineRunner setup(UserManager.Service userService) {
		return args -> {
			userService.createUser(new User("mahi", "$2a$10$D07Lnng6MPZcXvid7larMeBzpcWYgu0dKBEHyxVQB.cLqaZ.RCByO"));
		};
	}

}
