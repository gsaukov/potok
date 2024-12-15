package com.apps.depositary.kafka.producer;

import com.apps.depositary.kafka.messaging.DepositMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import java.util.concurrent.CompletableFuture;

@Component
public class DepositMessageProducer {

    @Value(value = "${kafka.topic.executions}")
    private String topicName;

    @Autowired
    private KafkaTemplate<String, DepositMessage> depositMessageKafkaTemplate;

    public void sendMessage(DepositMessage message) {
        CompletableFuture<SendResult<String, DepositMessage>> future = depositMessageKafkaTemplate.send(topicName, message);
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                System.out.println("Sent message=[" + message + "] with offset=[" + result.getRecordMetadata()
                        .offset() + "]");
            } else {
                System.out.println("Unable to send message=[" + message + "] due to : " + ex.getMessage());
            }
        });
    }

    public void sendDepositMessage(DepositMessage message) {
        depositMessageKafkaTemplate.send(topicName, message);
    }
}
