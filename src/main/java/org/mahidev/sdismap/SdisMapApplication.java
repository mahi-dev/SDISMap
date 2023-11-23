package org.mahidev.sdismap;

import com.alibaba.excel.read.listener.ReadListener;
import org.mahidev.sdismap.controller.RestSdisController;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.FileDataSource;
import org.mahidev.sdismap.listener.SdisFileListener;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.service.ExcelService;
import org.mahidev.sdismap.service.Manager;
import org.mahidev.sdismap.service.SdisService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"org.mahidev.sdismap.converter"})
@EntityScan({"org.mahidev.sdismap.model"})
@EnableJpaRepositories({"org.mahidev.sdismap.repository"})
@EnableConfigurationProperties({FileDataSource.class})
@ConfigurationPropertiesScan
public class SdisMapApplication {

	public static void main(final String[] args) {
		SpringApplication.run(SdisMapApplication.class, args);
	}

	@Lazy
	@Bean
	Manager.SdisService sdisService(final SdisRepository repository) {
		return new SdisService(repository);
	}

	@Lazy
	@Bean
	RestSdisController restSdisController(final Manager.SdisService service) {
		return new RestSdisController(service);
	}

	@Lazy
	@Bean
	@Qualifier("sdisFileListener")
	ReadListener<Sdis> sdisFileListener(final SdisRepository repository) {
		return new SdisFileListener(repository);
	}

	@Bean
	@Qualifier("sdisExcelService")
	ExcelService excelService(final Manager.SdisService service, @Qualifier("sdisFileListener") final ReadListener<Sdis> sdisReadListener,
			final DataSource dataSource) {
		return new ExcelService(service, sdisReadListener, dataSource);
	}
}
