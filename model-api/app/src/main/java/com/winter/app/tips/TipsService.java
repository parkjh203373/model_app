package com.winter.app.tips;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class TipsService {

    @Value("${fastapi.url:http://localhost:8000/api2/}")
    private String fastapiUrl;

    public String model(Map<String, String> data) throws Exception {

        WebClient webClient = WebClient.builder()
                .baseUrl(fastapiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<String> r = webClient.post()
                .uri("tips")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(data)
                .retrieve()
                .bodyToMono(String.class)
                ;

        System.out.println("FastAPI로부터 받은 결과: " + r.block());
        String result = r.block();
        return result;

        // RestClient restClient = RestClient.builder()
        // .baseUrl("http://localhost:8000/api2/")
        // .build();

        // String response = restClient.post()
        // .uri("tips")
        // .contentType(MediaType.APPLICATION_JSON)
        // .body(data)
        // .retrieve()
        // .body(String.class)
        // ;

        // System.out.println("FastAPI로부터 받은 결과: " + response);
        // return response;

    }

}
