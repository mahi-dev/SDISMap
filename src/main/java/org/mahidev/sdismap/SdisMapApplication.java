package org.mahidev.sdismap;

import org.mahidev.sdismap.controller.RestSdisController;
import org.mahidev.sdismap.repository.SdisRepository;
import org.mahidev.sdismap.service.Manager;
import org.mahidev.sdismap.service.SdisService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"org.mahidev.sdismap.configuration"})
@EntityScan({"org.mahidev.sdismap.model"})
@EnableJpaRepositories({"org.mahidev.sdismap.repository"})
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
}
