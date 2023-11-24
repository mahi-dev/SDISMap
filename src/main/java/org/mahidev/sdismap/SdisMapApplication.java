package org.mahidev.sdismap;

import org.mahidev.sdismap.controller.RestSdisController;
import org.mahidev.sdismap.datasource.DataSource;
import org.mahidev.sdismap.datasource.FileDataSource;
import org.mahidev.sdismap.excel.service.ExcelParser;
import org.mahidev.sdismap.excel.service.PoijiExcelReader;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.service.Manager;
import org.mahidev.sdismap.service.SdisService;
import org.mahidev.sdismap.service.XlsReaderService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"org.mahidev.sdismap.configuration"})
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
    @Qualifier("sdisExcelService")
    Manager.ReaderService<Sdis> excelService(final Manager.SdisService service, final ExcelParser<Sdis> excelParser) {
        return new XlsReaderService(service, excelParser);
    }

    @Lazy
    @Bean
    Manager.SdisService sdisService(final SdisRepository repository) {
        return new SdisService(repository);
    }

    @Lazy
    @Bean
    RestSdisController restSdisController(final Manager.SdisService sdisService, final Manager.ReaderService<Sdis> readerService,
                                          @Qualifier("fileDataSource") final DataSource dataSource) {
        return new RestSdisController(sdisService, readerService, dataSource);
    }

    @Lazy
    @Bean
    ExcelParser<Sdis> excelParser() {
        return new PoijiExcelReader();
    }
}
