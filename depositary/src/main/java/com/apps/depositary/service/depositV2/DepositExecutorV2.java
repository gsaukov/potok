package com.apps.depositary.service.depositV2;

import com.apps.depositary.persistance.entity.Execution;
import com.google.common.hash.HashCode;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class DepositExecutorV2 {

    private static final Charset CHARSET = Charset.forName("US-ASCII");
    private static final int HASH_BITS = 32;

    @Autowired
    private ApplicationContext context;

    private final ThreadPoolExecutor executor;
    private final int executorsNumber;
    private final AtomicBoolean initialized;
    private final List<DepositWorkerV2> workers = new ArrayList<>();

    private DepositExecutorV2(@Value("${depositary.executorsNumber}") int executorsNumber) {
        this.executorsNumber = executorsNumber;
        this.executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(executorsNumber);
        this.initialized = new AtomicBoolean(false);
    }

    public void runDepositExecutor() {
        if(!initialized.get()){
            for (int i = 0; i < executorsNumber; i++) {
                DepositWorkerV2 worker = context.getBean(DepositWorkerV2.class);
                worker.setNameDepositPersister(i);
                workers.add(worker);
                executor.execute(worker);
            }
        }
        initialized.getAndSet(true);
    }

    public void executeDeposit(Execution execution){
        workers.get(getConsistentHash(execution)).persist(execution);
    }

    private int getConsistentHash(Execution execution) {
        HashCode hash = Hashing.goodFastHash(HASH_BITS).hashString(getConsistentHashSource(execution), CHARSET);
        return Hashing.consistentHash(hash, executorsNumber);
    }

    private String getConsistentHashSource(Execution execution) {
        return String.join("", execution.getAccountId(), execution.getSymbol(), execution.getRoute().toString());
    }
}
