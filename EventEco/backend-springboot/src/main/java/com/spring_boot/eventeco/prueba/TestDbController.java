package com.spring_boot.eventeco.prueba;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestDbController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public String testDatabaseConnection() {
        try {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM information_schema.tables", Integer.class);
            return "Conexión exitosa. Tablas en la base de datos: " + count;
        } catch (Exception e) {
            return "Error conectando a la base de datos: " + e.getMessage();
        }
    }
}