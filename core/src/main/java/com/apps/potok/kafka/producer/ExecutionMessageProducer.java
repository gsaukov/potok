package com.apps.potok.kafka.producer;

import com.apps.potok.soketio.model.execution.Execution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class ExecutionMessageProducer {

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
        executionKafkaTemplate.send(topicName, message.getUuid().toString(),  message);
    }
}
