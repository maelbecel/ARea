package fr.zertus.area;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class AreaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AreaServerApplication.class, args);
	}

}
