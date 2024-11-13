import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import reacp.BackendApplication;
import reacp.model.RestaurantModel;
import reacp.model.WishlistStatus;
import reacp.repository.RestaurantRepo;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
class RestaurantIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    RestaurantRepo restaurantRepo;

    @BeforeEach
    void setup() {
        restaurantRepo.deleteAll();
        createRestaurant("1", "Testrestaurant", "Testcity", "testkategorie",
                "test description", WishlistStatus.ON_WISHLIST);
    }

    private RestaurantModel createRestaurant(String id, String name, String city, String category,
                                             String description, WishlistStatus wishlistStatus) {
        RestaurantModel restaurantModel = new RestaurantModel(id, name, city, category, description, wishlistStatus);
        return restaurantRepo.save(restaurantModel); // Restaurant speichern
    }

    @Test
    void getAllRestaurants_expectListWithOneRestaurant_whenOneRestaurantSaved() throws Exception {

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/restaurant")
                )
                //THEN
                .andExpect(
                        MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                                       [ 
                                                                                         {
                            "id": "1",
                            "name": "Testrestaurant",
                            "city": "Testcity",
                            "category": "testkategorie",
                            "description": "test description",
                            "status": "ON_WISHLIST"
                                                                                         }]
                        
                        """
                ));

    }

    @Test
    void getRestaurantById_returnRestaurantWithId1_whenRestaurantWithId1Saved() throws Exception {

        //WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/restaurant/1")
                )
                //THEN
                .andExpect(
                        MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        
                                                                                         {
                            "id": "1",
                            "name": "Testrestaurant",
                            "city": "Testcity",
                            "category": "testkategorie",
                            "description": "test description",
                            "status": "ON_WISHLIST"
                                                                                         }
                        
                        """
                ));

    }

}


