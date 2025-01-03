package com.apps.depositary.kafka.consumer;

import com.apps.depositary.kafka.messaging.ExecutionMessage;
import com.apps.depositary.persistance.entity.Execution;
import com.apps.depositary.persistance.entity.Route;
import com.apps.depositary.service.depositV2.DepositaryServiceV2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.ConsumerSeekAware;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import static com.apps.depositary.kafka.config.KafkaConsumerConfig.GROUPID_DEPOSITARY;

@Component
public class ExecutionMessageConsumerV2 implements ConsumerSeekAware {

    @Value("${kafka.topic.executions}")
    private String executionsTopic;

    private ConsumerSeekCallback callback;

    @Autowired
    private DepositaryServiceV2 depositaryService;

    @KafkaListener(topics = "${kafka.topic.executions}", groupId = GROUPID_DEPOSITARY, containerFactory = "depositKafkaListenerContainerFactory")
    public void listenGroupDeposit(@Payload ExecutionMessage message,
                                   @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
                                   @Header(KafkaHeaders.OFFSET) int offset,
                                   Acknowledgment acknowledgment) {
        Execution execution = toExecution(message);
        depositaryService.processExecution(execution);
        acknowledgment.acknowledge();
    }

    private Execution toExecution(ExecutionMessage message) {
        Execution execution = new Execution();
        execution.setUuid(message.getUuid());
        execution.setCounterExecutionUuid(message.getCounterExecutionUuid());
        execution.setOrderUuid(message.getOrderUuid());
        execution.setTimestamp(message.getTimestamp());
        execution.setSymbol(message.getSymbol());
        execution.setAccountId(message.getAccountId());
        execution.setRoute(Route.valueOf(message.getRoute()));
        execution.setFillPrice(message.getFillPrice());
        execution.setBlockedPrice(message.getBlockedPrice());
        execution.setQuantity(message.getQuantity());
        execution.setFilled(message.isFilled());
        return execution;
    }

    private void setOffset(int partition, long newOffset) {
        callback.seek(executionsTopic, partition, newOffset);
    }

    @Override
    public void registerSeekCallback(ConsumerSeekCallback callback) {
        this.callback = callback;
    }
}
