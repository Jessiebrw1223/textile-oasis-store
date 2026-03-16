using Microsoft.EntityFrameworkCore;
using TextileOasis.Domain.Entities;
using TextileOasis.Infrastructure.Persistence;

namespace TextileOasis.Infrastructure.Seed;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();
        if (!await context.Categories.AnyAsync())
        {
            context.Categories.AddRange(
                new Category { Name = "Toallas", Description = "Toallas de alta calidad para hogar, hotel y spa", IsActive = true },
                new Category { Name = "Batas", Description = "Batas cómodas y elegantes para baño y descanso", IsActive = true },
                new Category { Name = "Sets", Description = "Sets completos para hoteles y negocios", IsActive = true }
            );
            await context.SaveChangesAsync();
        }
        if (!await context.Products.AnyAsync())
        {
            var categories = await context.Categories.ToListAsync();
            int cat(string name) => categories.First(c => c.Name == name).Id;
            context.Products.AddRange(
                new Product { Name = "Toalla Blanca Premium", Description = "Toalla suave de algodón para uso hotelero", Price = 45.9m, Stock = 40, ImageUrl = "", Material = "Algodón", IsFeatured = true, IsActive = true, CategoryId = cat("Toallas") },
                new Product { Name = "Toalla Gris Corporativa", Description = "Toalla absorbente de alta durabilidad", Price = 39.9m, Stock = 30, ImageUrl = "", Material = "Microfibra", IsFeatured = false, IsActive = true, CategoryId = cat("Toallas") },
                new Product { Name = "Bata Spa Deluxe", Description = "Bata cómoda y elegante para spa y hotel", Price = 89.9m, Stock = 20, ImageUrl = "", Material = "Algodón", IsFeatured = true, IsActive = true, CategoryId = cat("Batas") },
                new Product { Name = "Set Hotelero Completo", Description = "Set ideal para equipamiento hotelero", Price = 320m, Stock = 15, ImageUrl = "", Material = "Algodón Egipcio", IsFeatured = true, IsActive = true, CategoryId = cat("Sets") }
            );
            await context.SaveChangesAsync();
        }
        if (!await context.Users.AnyAsync())
        {
            context.Users.Add(new User { FullName = "Administrador TextileOasis", Email = "admin@textileoasis.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123*"), PhoneNumber = "999384593", Role = "Admin", IsActive = true });
            await context.SaveChangesAsync();
        }
    }
}
