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



    @Test
    void getAllRestaurants_expectListWithOneRestaurant_whenOneRestaurantSaved() throws Exception {
        //GIVEN
        RestaurantModel restaurantModel=new RestaurantModel("1","Testrestaurant","Testcity",
                "testkategorie","test description", WishlistStatus.ON_WISHLIST);
        restaurantRepo.save(restaurantModel);

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
                                                                                         }
                                                                                        ]
                        """
                ));

    }
}

