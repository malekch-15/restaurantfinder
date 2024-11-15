package reacp.model;

public record RestaurantModelDto(
        String name,
        String city,
        String category,
        String description,
        WishlistStatus status
) {
}