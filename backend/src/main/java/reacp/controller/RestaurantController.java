package reacp.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reacp.model.RestaurantModel;
import reacp.model.RestaurantModelDto;
import reacp.services.RestaurantService;

import java.util.List;

@RestController
@RequestMapping("api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;


    @GetMapping()
    public List<RestaurantModel> getAllRestaurants(){
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public RestaurantModel getRestaurantById(@PathVariable String id){
        return restaurantService.getRestaurantById(id);
    }


    @PostMapping
    public RestaurantModel postRestaurant(@RequestBody RestaurantModelDto restaurantModelDto){
        return restaurantService.addRestaurant(
                new RestaurantModel(
                        null,
                        restaurantModelDto.name(),
                        restaurantModelDto.city(),
                        restaurantModelDto.category(),
                        restaurantModelDto.description(),
                        restaurantModelDto.status()
                ));
    }


    @PostMapping("/update-all")
    public List<RestaurantModel> updateAll(@RequestBody List<RestaurantModel> restaurantModels){
        return restaurantService.updateAll(restaurantModels);
    }



    @PutMapping("/{id}")
    public RestaurantModel putRestaurant(@PathVariable String id, @RequestBody RestaurantModelDto restaurantModeldto){
        return restaurantService.updateRestaurantWithPut(id,
                new RestaurantModel(
                        id,
                        restaurantModeldto.name(),
                        restaurantModeldto.city(),
                        restaurantModeldto.category(),
                        restaurantModeldto.description(),
                        restaurantModeldto.status()
                ));
    }


    @PatchMapping("/{id}")
    public RestaurantModel patchRestaurant(@PathVariable String id, @RequestBody RestaurantModelDto restaurantModeldto){
        return restaurantService.updateRestaurantWithPatch(id,
                new RestaurantModel(
                        id,
                        restaurantModeldto.name(),
                        restaurantModeldto.city(),
                        restaurantModeldto.category(),
                        restaurantModeldto.description(),
                        restaurantModeldto.status()
                ));
    }


    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable String id){
        restaurantService.deleteRestaurant(id);
    }
}
