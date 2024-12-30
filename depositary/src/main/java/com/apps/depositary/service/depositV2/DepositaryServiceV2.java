package com.apps.depositary.service.depositV2;

import com.apps.depositary.persistance.entity.Execution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//This is queue based deposit creation service that relies on database lock mechanic.
@Service
public class DepositaryServiceV2 {

    @Autowired
    private DepositExecutorV2 depositExecutor;

    public void processExecution(Execution execution) {
        depositExecutor.executeDeposit(execution);
    }

}
