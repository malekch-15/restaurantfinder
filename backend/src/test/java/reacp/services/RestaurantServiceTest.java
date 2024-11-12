package reacp.services;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import reacp.model.RestaurantModel;
import reacp.repository.RestaurantRepo;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static reacp.model.WishlistStatus.ON_WISHLIST;

@SpringBootTest
class RestaurantServiceTest {
    IdService idService= new IdService();
RestaurantRepo restaurantRepo = mock(RestaurantRepo.class);
RestaurantService restaurantService = new RestaurantService(idService, restaurantRepo);

 @Test
    void getAllRestaurants() {
     //Given
     RestaurantModel restaurantModel =new RestaurantModel("1","Fischereihafen Restaurant",
             "Hamburg","Seafood","Ein gehobenes Restaurant mit Hafenblick, ",ON_WISHLIST);

     List<RestaurantModel> restaurants= List.of(restaurantModel);
     when(restaurantRepo.findAll()).thenReturn(restaurants);
     //WHEN
     List<RestaurantModel> actuel=restaurantService.getAllRestaurants();
     //THEN
     assertEquals(actuel,restaurants);
     System.out.println(actuel +"and"+ restaurants);

 }
}