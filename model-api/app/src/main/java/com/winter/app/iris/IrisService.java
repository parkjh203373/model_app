package com.winter.app.iris;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class IrisService {

    @Value("${fastapi.url:http://localhost:8000/api2/}")
    private String fastapiUrl;

    public String model(Map<String, String> data) throws Exception {

        WebClient webClient = WebClient.builder()
                .baseUrl(fastapiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<String> r = webClient.post()
                .uri("iris")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(data)
                .retrieve()
                .bodyToMono(String.class);

        String result = r.block();
        System.out.println("FastAPI로부터 받은 결과: " + result);
        return result;
    }

}
