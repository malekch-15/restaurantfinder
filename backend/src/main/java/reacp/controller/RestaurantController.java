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

    @GetMapping
    public List<RestaurantModelDto> getAllRestaurants(){
        List<RestaurantModel> restaurantModels = restaurantService.getAllRestaurants();
        return restaurantModels.stream().map(restaurantModel -> new RestaurantModelDto(
                restaurantModel.name(),
                restaurantModel.city(),
                restaurantModel.category(),
                restaurantModel.description(),
                restaurantModel.status()
        )).toList();
    }

    @GetMapping("/{id}")
    public RestaurantModelDto getRestaurantById(@PathVariable String id){
        RestaurantModel restaurantModel = restaurantService.getRestaurantById(id);
        return new RestaurantModelDto(
                restaurantModel.name(),
                restaurantModel.city(),
                restaurantModel.category(),
                restaurantModel.description(),
                restaurantModel.status()
        );
    }

    @PostMapping
    public RestaurantModelDto postRestaurant(@RequestBody RestaurantModel restaurantModel){
        RestaurantModel newRestaurantModel = restaurantService.addRestaurant(restaurantModel);
        return new RestaurantModelDto(
                newRestaurantModel.name(),
                newRestaurantModel.city(),
                newRestaurantModel.category(),
                newRestaurantModel.description(),
                newRestaurantModel.status()
        );
    }

    @PostMapping("/update-all")
    public List<RestaurantModelDto> updateAll(@RequestBody List<RestaurantModel> restaurantModels){
        List<RestaurantModel> updatedAllRestaurants = restaurantService.updateAll(restaurantModels);
        return updatedAllRestaurants.stream().map(restaurantModel -> new RestaurantModelDto(
                restaurantModel.name(),
                restaurantModel.city(),
                restaurantModel.category(),
                restaurantModel.description(),
                restaurantModel.status()
        )).toList();
    }

    @PutMapping("/{id}")
    public RestaurantModelDto putRestaurant(@PathVariable String id, @RequestBody RestaurantModel restaurantModel){
        RestaurantModel newRestaurantModel = restaurantService.updateRestaurantWithPut(id, restaurantModel);
        return new RestaurantModelDto(
                newRestaurantModel.name(),
                newRestaurantModel.city(),
                newRestaurantModel.category(),
                newRestaurantModel.description(),
                newRestaurantModel.status()
        );
    }

    @PatchMapping("/{id}")
    public RestaurantModelDto patchRestaurant(@PathVariable String id, @RequestBody RestaurantModel restaurantModel){
        RestaurantModel newRestaurantModel = restaurantService.updateRestaurantWithPatch(id, restaurantModel);
        return new RestaurantModelDto(
                newRestaurantModel.name(),
                newRestaurantModel.city(),
                newRestaurantModel.category(),
                newRestaurantModel.description(),
                newRestaurantModel.status()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable String id){
        restaurantService.deleteRestaurant(id);
    }
}
