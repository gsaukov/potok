package com.apps.potok.soketio.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Component
public class Bootstrap {


    @Autowired
    private SocketIOServer server;

    @PostConstruct
    public void start() {
        server.start();
    }

    @PreDestroy
    public void stop() {
        server.stop();
    }

}
