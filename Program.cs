using ApiAguas.Data;
using ApiAguas.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Serve o frontend pela mesma origem da API
app.UseDefaultFiles();
app.UseStaticFiles();

// GET /api/aguas - lista todos
app.MapGet("/api/aguas", async (ApiDbContext db) =>
{
    var aguas = await db.Aguas.ToListAsync();
    return Results.Ok(aguas);
});

// GET /api/aguas/{id} - busca por ID
app.MapGet("/api/aguas/{id:int}", async (int id, ApiDbContext db) =>
{
    var agua = await db.Aguas.FindAsync(id);
    return agua is null ? Results.NotFound() : Results.Ok(agua);
});

// POST /api/aguas - cria
app.MapPost("/api/aguas", async (AguaEntity dados, ApiDbContext db) =>
{
    db.Aguas.Add(dados);
    await db.SaveChangesAsync();
    return Results.Created($"/api/aguas/{dados.Id}", dados);
});

// PUT /api/aguas/{id} - atualiza
app.MapPut("/api/aguas/{id:int}", async (int id, AguaEntity dados, ApiDbContext db) =>
{
    var agua = await db.Aguas.FindAsync(id);
    if (agua is null)
        return Results.NotFound();

    agua.Marca = dados.Marca;
    agua.Volume = dados.Volume;
    agua.Tipo = dados.Tipo;

    await db.SaveChangesAsync();
    return Results.Ok(agua);
});

// DELETE /api/aguas/{id} - exclui
app.MapDelete("/api/aguas/{id:int}", async (int id, ApiDbContext db) =>
{
    var agua = await db.Aguas.FindAsync(id);
    if (agua is null)
        return Results.NotFound();

    db.Aguas.Remove(agua);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
