package org.mahidev.sdismap.datasource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;


@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
@ConfigurationProperties(prefix = "sdis")
public final class FileDataSource implements DataSource {
    private String path;

    private String file;
}
