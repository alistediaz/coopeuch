package com.coop.tareas.controller;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
class InvalidRequestException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public InvalidRequestException(String s) {
        super(s);
    }
}