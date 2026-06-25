package com.winter.app.tips;

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
public class TipsController {

    private TipsService tipsService;

    @PostMapping("tips") 
    public String tipsForm(@RequestBody Map<String, String> data) throws Exception {
        System.out.println(data);
        String result = tipsService.model(data);
        return result;
    }

}