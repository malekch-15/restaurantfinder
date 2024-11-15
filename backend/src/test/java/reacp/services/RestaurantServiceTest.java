package reacp.services;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import reacp.model.RestaurantModel;
import reacp.repository.RestaurantRepo;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static reacp.model.WishlistStatus.NOT_ON_WISHLIST;
import static reacp.model.WishlistStatus.ON_WISHLIST;

@SpringBootTest
class RestaurantServiceTest {
    IdService idService= mock(IdService.class);
RestaurantRepo restaurantRepo = mock(RestaurantRepo.class);
RestaurantService restaurantService = new RestaurantService(idService, restaurantRepo);
//RESTAURANT DATA
RestaurantModel restaurantModel =new RestaurantModel("1","Fischereihafen Restaurant",
            "Hamburg","Seafood","Ein gehobenes Restaurant mit Hafenblick, ",ON_WISHLIST);
    RestaurantModel restaurantModel2 =new RestaurantModel("2","Fischereihafen Restaurant",
            "Hamburg","Seafood","Ein gehobenes Restaurant mit Hafenblick, ",ON_WISHLIST);
    List<RestaurantModel> restaurants= List.of(restaurantModel,restaurantModel2);
 @Test
    void getAllRestaurants() {
     //Given


     when(restaurantRepo.findAll()).thenReturn(restaurants);
     //WHEN
     List<RestaurantModel> expected=restaurantService.getAllRestaurants();
     //THEN
     assertEquals(expected,restaurants);
     System.out.println(expected+"and"+ restaurants);

 }

    @Test
    void getRestaurantById() {
     //Given
     when(restaurantRepo.findById("1")).thenReturn(Optional.of(restaurantModel));
     //when
        RestaurantModel expected=restaurantService.getRestaurantById("1");
        assertEquals(expected,restaurantModel);
        System.out.println(expected+"and"+ restaurants);

    }

    @Test
    void addRestaurant() {
     //GIVEN
        RestaurantModel restaurantModel3=new RestaurantModel("3","Fischereihafen Restaurant",
                "Köln","Seafood","Ein gehobenes Restaurant mit Hafenblick, ",ON_WISHLIST);

        RestaurantModel newRestaurant= new RestaurantModel("3",restaurantModel3.name(),restaurantModel3.city()
        ,restaurantModel3.category(),restaurantModel3.description(),restaurantModel3.status());
        when(idService.generateRandomId()).thenReturn("3");
        when(restaurantRepo.save(any(RestaurantModel.class))).thenReturn(newRestaurant);
        //WHEN
       RestaurantModel expected=restaurantService.addRestaurant(restaurantModel3);


        //THEN
        assertEquals(newRestaurant, expected);
        assertEquals(restaurantModel3.name(),expected.name());
        assertEquals(restaurantModel3.city(), expected.city());
        assertEquals(restaurantModel3.category(), expected.category());
        assertEquals(restaurantModel3.description(), expected.description());
        assertEquals(restaurantModel3.status(), expected.status());
        System.out.println(expected+"and"+ restaurants);
    }

    @Test
    void updateRestaurantWithPut() {
        RestaurantModel exist=new RestaurantModel("3","Fischereihafen Restaurant",
                "Köln","Seafood","Ein gehobenes Restaurant mit Hafenblick, ",NOT_ON_WISHLIST);

        RestaurantModel updated = new RestaurantModel("3",exist.name(),exist.city()
                ,exist.category(),exist.description(),ON_WISHLIST);
        when(restaurantRepo.existsById("3")).thenReturn(true);
        when(idService.generateRandomId()).thenReturn("3");
        when(restaurantRepo.save(any(RestaurantModel.class))).thenReturn(updated);

        RestaurantModel expected=restaurantService.updateRestaurantWithPut("3",updated);
        assertEquals(updated, expected);
    }


    @Test
    void deleteRestaurant() {
        String restaurantId = "1";

        restaurantService.deleteRestaurant(restaurantId);

        verify(restaurantRepo, times(1)).deleteById(restaurantId);
        verifyNoMoreInteractions(restaurantRepo);

    }
}