package com.apps.depositary.service.depositV2;

import com.apps.depositary.persistance.entity.Deposit;
import com.apps.depositary.persistance.entity.Execution;
import com.apps.depositary.persistance.repository.DepositRepository;
import com.apps.depositary.service.AbstractDepositaryWorker;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
            //TODO logic here.
        } else {
            speedControl();
        }
    }

    private Deposit toNewDeposit(Execution execution) {
        Deposit newDeposit = new Deposit();
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
