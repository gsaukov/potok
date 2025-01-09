package com.apps.potok.kafka.producer;

import com.apps.potok.soketio.model.execution.Execution;
import com.google.common.hash.HashCode;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.concurrent.CompletableFuture;

@Component
public class ExecutionMessageProducer {

    private static final Charset CHARSET = Charset.forName("US-ASCII");
    private static final int HASH_BITS = 32;

    @Value(value = "${kafka.topic.executions}")
    private String topicName;

    @Autowired
    private KafkaTemplate<String, Execution> executionKafkaTemplate;

    public void sendMessage(Execution message) {

        CompletableFuture<SendResult<String, Execution>> future = executionKafkaTemplate.send(topicName, message);

        future.whenComplete((result, ex) -> {
            if (ex == null) {
                System.out.println("Sent message=[" + message + "] with offset=[" + result.getRecordMetadata()
                        .offset() + "]");
            } else {
                System.out.println("Unable to send message=[" + message + "] due to : " + ex.getMessage());
            }
        });
    }

    public void sendExecutionMessage(Execution message) {
        int partitionNumber = getPartitionNumber(message);
        executionKafkaTemplate.send(topicName, partitionNumber, message.getUuid().toString(),  message);
    }

    private int getPartitionNumber(Execution execution) {
        HashCode hash = Hashing.goodFastHash(HASH_BITS).hashString(getConsistentHashSource(execution), CHARSET);
        return Hashing.consistentHash(hash, 4);
    }

    private String getConsistentHashSource(Execution execution) {
        return String.join("", execution.getAccountId(), execution.getSymbol(), execution.getRoute().toString());
    }
}
