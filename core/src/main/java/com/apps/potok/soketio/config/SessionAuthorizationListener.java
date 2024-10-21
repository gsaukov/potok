package com.apps.potok.soketio.config;

import com.corundumstudio.socketio.AuthorizationListener;
import com.corundumstudio.socketio.AuthorizationResult;
import com.corundumstudio.socketio.HandshakeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.session.Session;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class SessionAuthorizationListener implements AuthorizationListener {

    @Value("${session.test-mode-authentication}")
    private boolean testModeAuthentication;

    @Autowired
    private RedisSessionRepository sessionRepository;

    @Override
    public AuthorizationResult getAuthorizationResult(HandshakeData data) {
        if(testModeAuthentication) {
            return new AuthorizationResult(true);
        }

        OAuth2Authentication oAuth2Authentication = SessionUtil.getOAuth2Authentication(data, sessionRepository);

        if(oAuth2Authentication != null) {
            return new AuthorizationResult(oAuth2Authentication.isAuthenticated());
        } else {
            return new AuthorizationResult(false);
        }
    }
}
