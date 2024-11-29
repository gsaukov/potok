package com.apps.potok.soketio.listeners;

import com.apps.potok.exchange.account.Account;
import com.apps.potok.exchange.account.AccountManager;
import com.apps.potok.exchange.core.CancelOrderManager;
import com.apps.potok.exchange.core.Order;
import com.apps.potok.exchange.core.Position;
import com.apps.potok.exchange.core.SymbolContainer;
import com.apps.potok.exchange.notifiers.QuoteNotifier;
import com.apps.potok.soketio.model.LogLine;
import com.apps.potok.soketio.model.account.AccountDataRequest;
import com.apps.potok.soketio.model.execution.PositionNotification;
import com.apps.potok.soketio.model.order.CancelOrder;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DataListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.apps.potok.soketio.config.SessionUtil.getAccountId;
import static com.apps.potok.soketio.config.SessionUtil.getOrderUuid;

@Service
public class AccountDataListener implements DataListener<AccountDataRequest> {

    @Autowired
    private SymbolContainer symbolContainer;

    @Autowired
    private AccountManager accountManager;

    @Override
    public void onData(SocketIOClient client, AccountDataRequest data, AckRequest ackRequest) {
        Account account = accountManager.getAccount(getAccountId(client));
        sendClientSymbols(client);
        sendBalance(account, client);
        sendPositions(account, client);
        sendOrders(account, client);
    }

    private void sendClientSymbols(SocketIOClient client) {
        client.sendEvent("message", getTenSymbols());
    }

    private LogLine getTenSymbols() {
        List<String> symols = symbolContainer.getSymbols().subList(0, 10);
        LogLine logLine = new LogLine();
        logLine.setLine(symols.toString());
        return logLine;
    }

    private void sendBalance(Account account, SocketIOClient client) {
        client.sendEvent("balance", account.getBalance());
    }

    private void sendPositions(Account account, SocketIOClient client) {
        for(Position position : account.getPositions()) {
            PositionNotification notification = new PositionNotification(position);
            client.sendEvent("positionNotification", notification);
        }
        for(Position position : account.getShortPositions()) {
            PositionNotification notification = new PositionNotification(position);
            client.sendEvent("positionNotification", notification);
        }
    }

    private void sendOrders(Account account, SocketIOClient client) {
        for(Order order : account.getOrders()) {
            client.sendEvent("orderConfirm", order);
        }
    }

}
