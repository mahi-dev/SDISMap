package org.mahidev.sdismap.listener;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.alibaba.excel.util.ListUtils;
import lombok.RequiredArgsConstructor;
import org.mahidev.sdismap.model.Sdis;
import org.mahidev.sdismap.repository.SdisRepository;

import java.util.List;

@RequiredArgsConstructor
public class SdisFileListener implements ReadListener<Sdis> {

    private static final int BATCH_COUNT = 100;
    private final SdisRepository repository;
    private List<Sdis> cache = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);

    @Override
    public void invoke(final Sdis sdis, final AnalysisContext analysisContext) {
        cache.add(sdis);
        if (cache.size() >= BATCH_COUNT) {
            saveData();
            cache = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
        }
    }

    @Override
    public void doAfterAllAnalysed(final AnalysisContext analysisContext) {
        saveData();
    }

    private void saveData() {
        repository.saveAll(cache);
    }
}
