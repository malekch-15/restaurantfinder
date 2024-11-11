package team2_backend.model;

public record RestaurantModel(
        String id,
        String name,
        String city,
        String category,
        String description,
        WishlistStatus status
) {
}
