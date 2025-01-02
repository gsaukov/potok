package com.apps.depositary.service.depositV2;

import com.apps.depositary.persistance.entity.Deposit;
import com.apps.depositary.persistance.entity.Execution;
import com.apps.depositary.persistance.repository.DepositRepository;
import com.apps.depositary.service.AbstractDepositaryWorker;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentLinkedDeque;

public class DepositWorkerV2 extends AbstractDepositaryWorker {

    private final Log logger = LogFactory.getLog(DepositWorkerV2.class);

    private final ConcurrentLinkedDeque<Execution> eventQueue = new ConcurrentLinkedDeque<>();

    @Autowired
    private DepositRepository depositRepository;

    public void setNameDepositPersister(int num) {
        super.setName("DepositaryPersister_" + num);
    }

    @Override
    public void runDepositaryWorker() {
        Execution execution = eventQueue.poll();
        if(execution != null){
            Optional<Deposit> existingDeposit = depositRepository.findByAccountIdAndSymbolAndRouteAndClosed(execution.getAccountId(),
                    execution.getSymbol(), execution.getRoute(), false);
            if (existingDeposit.isPresent()) {
                addToDeposit(execution, existingDeposit.get());
            } else {
                newDeposit(execution);
            }
        } else {
            speedControl();
        }
    }

    private void addToDeposit (Execution execution, Deposit deposit) {
        Integer quantity = deposit.getQuantity() + execution.getQuantity();
        depositRepository.updateDeposit(new BigDecimal(execution.getFillPrice()), quantity, deposit.getUuid());
    }

    private void newDeposit (Execution execution) {
        depositRepository.save(toNewDeposit(execution));
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

    public void persist(Execution execution){
        eventQueue.add(execution);
    }

    @Override
    public void speedControl() {
        speedControl(100);
        //todo flush persistBatch/updateBatch here based on some time counter.
    }

}
