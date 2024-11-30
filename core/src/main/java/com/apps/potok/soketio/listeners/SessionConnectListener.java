package com.apps.potok.soketio.listeners;

import com.apps.potok.exchange.account.Account;
import com.apps.potok.exchange.account.AccountManager;
import com.apps.potok.soketio.config.SessionUtil;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.ConnectListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.stereotype.Service;

import static com.apps.potok.soketio.config.SessionUtil.ACCOUNT_ID;
import static com.apps.potok.exchange.account.AccountManager.TEST_ACCOUNT_ID;

@Service
public class SessionConnectListener implements ConnectListener {

    @Value("${session.test-mode-authentication}")
    private boolean testModeAuthentication;

    @Autowired
    private RedisSessionRepository sessionRepository;

    @Autowired
    private AccountManager accountManager;

    @Override
    public void onConnect(SocketIOClient client) {
        Account account = assignAccountId(client);
    }

    private Account assignAccountId(SocketIOClient client){
        String accountId = null;
        if(testModeAuthentication){
            accountId = TEST_ACCOUNT_ID;
        } else {
            OAuth2Authentication oAuth2Authentication = SessionUtil.getOAuth2Authentication(client.getHandshakeData(),
                    sessionRepository);
            accountId = getAccountId(oAuth2Authentication.getUserAuthentication());
        }
        client.set(ACCOUNT_ID, accountId);
        return accountManager.addClient(accountId, client.getSessionId());
    }

    private String getAccountId(Authentication auth){
        for (GrantedAuthority grantedAuth : auth.getAuthorities()) {
            if (grantedAuth.getAuthority().startsWith(ACCOUNT_ID)) {
                return grantedAuth.getAuthority().substring(ACCOUNT_ID.length());
            }
        }
        return null;
    }

}
