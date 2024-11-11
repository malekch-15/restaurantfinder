package team2_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import team2_backend.model.RestaurantModel;

public interface RestaurantRepo extends MongoRepository<RestaurantModel, String> {
}
