package com.apps.depositary.service.depositV2;

import com.apps.depositary.persistance.entity.Deposit;
import com.apps.depositary.persistance.entity.Execution;
import com.apps.depositary.persistance.repository.DepositRepository;
import com.apps.depositary.persistance.repository.ExecutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

//This is queue based deposit creation service that relies on database lock mechanic.
@Service
public class DepositaryServiceV2 {

    @Autowired
    private DepositExecutorV2 depositExecutor;

    @Autowired
    private DepositRepository depositRepository;

    @Autowired
    private ExecutionRepository executionRepository;

    @Transactional
    public void processExecution(Execution execution) {
        Optional<Deposit> existingDeposit = depositRepository.findByAccountIdAndSymbolAndRouteAndClosed(execution.getAccountId(),
                execution.getSymbol(), execution.getRoute(), false);
        Deposit deposit;
        if (existingDeposit.isPresent()) {
            deposit = addToDeposit(execution, existingDeposit.get());
        } else {
            deposit = newDeposit(execution);
        }
        execution.setDepositId(deposit.getUuid());
        executionRepository.save(execution);
    }

    private Deposit addToDeposit (Execution execution, Deposit deposit) {
        deposit.setQuantity(deposit.getQuantity() + execution.getQuantity());
        return deposit;
    }

    private Deposit newDeposit (Execution execution) {
        return depositRepository.save(toNewDeposit(execution));
    }

    private Deposit toNewDeposit(Execution execution) {
        Deposit newDeposit = new Deposit();
        newDeposit.setUuid(UUID.randomUUID());
        newDeposit.setTimestamp(execution.getTimestamp());
        newDeposit.setSymbol(execution.getSymbol());
        newDeposit.setAccountId(execution.getAccountId());
        newDeposit.setRoute(execution.getRoute());
        newDeposit.setFillPrice(execution.getFillPrice().doubleValue());
        newDeposit.setBlockedPrice(execution.getBlockedPrice());
        newDeposit.setQuantity(execution.getQuantity());
        return newDeposit;
    }

}
