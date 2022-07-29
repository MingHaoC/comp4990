package com.server.component;

import com.server.repository.EventRepository;
import com.server.repository.UserEventRepository;
import com.server.service.impl.AuthenticationServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.http.HttpResponse;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import static com.server.constant.URL.EXPO_SEND_NOTIFICATION_URL;
import static com.server.util.HTTPRequest.sendNotification;
import static java.util.Calendar.getInstance;

@Component
public class NotificationScheduler {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserEventRepository userEventRepository;

    @Scheduled(fixedRate = 30000)
    public void reportCurrentTime() {
        System.out.println("test");
        Date now = new Date();
        Calendar calendar = getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.HOUR, 2);
        Date toDate = calendar.getTime();

        eventRepository.findAllByTimeRange(now, toDate).forEach(event -> {
            userEventRepository.getUserRegisterInEventWithExpoToken(event.getEventId()).forEach(user -> {
                HashMap<String, String> body = new HashMap<>() {
                    {
                        put("to", user.getExpoToken());
                        put("title", event.getEventTitle());
                        put("body", event.getEventDescription());
                    }
                };
                HttpResponse<String> response = sendNotification(body, EXPO_SEND_NOTIFICATION_URL);
                if (response != null && response.statusCode() != 200) {
                    logger.error("An error has occurred trying to send notification to expo, Response body:\n"
                            + response.body());
                }
            });
        });
    }
}
