package com.spring_boot.event;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main class for the Eventeco Spring Boot application.
 */
@SpringBootApplication
public class MainApplication {

    /**
     * The main method that serves as the entry point for the Spring Boot application.
     *
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}