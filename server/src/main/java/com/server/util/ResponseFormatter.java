package com.server.util;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseFormatter {

    public static ResponseEntity<String> formatResponse(Object payload, HttpStatus httpStatus) {
        String formatted = new Gson().toJson(payload);
        return new ResponseEntity<>(formatted, httpStatus);
    }

}
