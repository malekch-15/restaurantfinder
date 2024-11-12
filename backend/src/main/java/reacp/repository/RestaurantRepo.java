package reacp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import reacp.model.RestaurantModel;
@Repository
public interface RestaurantRepo extends MongoRepository<RestaurantModel, String> {
}
