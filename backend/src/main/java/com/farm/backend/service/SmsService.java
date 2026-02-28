package com.farm.backend.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final DefaultMessageService messageService;

    public SmsService(
            @Value("${solapi.api-key}") String apiKey,
            @Value("${solapi.api-secret}") String apiSecret
    ) {
        this.messageService =
                NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.solapi.com");
    }

    public void sendSms(String to, String text, String from) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText(text);

        try {
            // 실제 문자 전송
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException e) {
            // 일부/전체 발송 실패 시 여기로 옴
            System.out.println("문자 발송 실패 (일부 또는 전체): " + e.getMessage());
            System.out.println("실패 목록: " + e.getFailedMessageList());
        } catch (Exception e) {
            // 그 외 예외
            e.printStackTrace();
        }
    }
}
