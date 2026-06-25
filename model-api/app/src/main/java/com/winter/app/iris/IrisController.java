package com.winter.app.iris;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/**")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class IrisController {

    private IrisService irisService;

    @PostMapping("iris") 
    public String irisForm(@RequestBody Map<String, String> data) throws Exception {
        System.out.println("프론트로부터 전달받은 Iris 데이터: " + data);
        String result = irisService.model(data);
        return result;
    }

}
