using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

/* 
    Support for content negociation from our actions is implemented by ObjectResult, and built into the status code specific action results returned from the helper methods like Ok() and NotFound()
    These ActionResult helped methods are based on ObjectResult and thus support content negociation. Action result methods derive from ObjectResult
    Were we to only return a model class, this is automatically wrapped in an ObjectResult, so that it supports content negociation
    All we need to do to ensure that these object result deriving results support the format we want is to add or configure the correct formatter

    If we open Postman, type GET https://localhost:7049/api/cities/1/pointsofinterest/, and press Send, we get back the points of interest for the city with id 1 in json format, because our API defaults to it. If we go to the headers tab, and set Accept as the key, and application/xml as the value, saying that we want to consume the API in xml format, we still get back json, because no XML formatter was configured. This isn't ideal, if a consumer of the API explicitly requests the data in XML format, and we don't support it, we shouldn't just return json, we should return a message saying that we don't support it 
    builder.Services.AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    });

// adding xml support to API and return 406 Not Acceptable to anything other than json(default) and xml which we added below
builder.Services.AddControllers(options =>
{
    // if a consumer of the API requests the data in a format we don't support, we return a message that we don't support it instead of returning the data in our default formatter (json) - 406 Not Acceptable
    options.ReturnHttpNotAcceptable = true;
}).AddXmlDataContractSerializerFormatters(); // adds XML input and output formatters, with just one line of code, we added XML support to our API
*/

builder.Services.AddControllers(options =>
{
    // if a consumer of the API requests the data in a format we don't support, we return a message that we don't support it instead of returning the data in our default formatter (json) - 406 Not Acceptable
    options.ReturnHttpNotAcceptable = true;
}).AddXmlDataContractSerializerFormatters(); // adds XML input and output formatters, with just one line of code, we added XML support to our API

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// we add the FileExtensionContentTypeProvided service to our container/app-before-being-built, which means we can inject it in other parts of our code, we need this service to automatically determine the type of file in the controller
builder.Services.AddSingleton<FileExtensionContentTypeProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// To set up endpoint routing, two pieces of middleware must be injected in the request pipeline, the routing middleware, and the endpoitns middleware (app.UseRouting(), app.UseEndpoints())
// app.UseRouting() marks the position in the middleware pipeline where a routing decision is made, in other words, where an endpoint is selected
// app.UseEndpoints() marks the position in the middlware pipeline where the selected endpoint is executed.
// This allows us to inject middleware that runs in between selecting the endpoint and executing the selected endpoint. In other words we can inject middleware that know which endpoint was selected and can potentially select a different one. These can see the selected endpoint, if any, and can just use that, or they can select a different endpoint.
// A common example is the authorization middleware, it runs between app.UseRouting(), and app.UseEndpoints() middleware

// app.UseRouting();
// app.UseAuthorization();
// app.UseEndpoints(endpoints =>  {// map endpoints });

// We still need to map the endpoints though, there's two ways for it, convention based or attribute based. For APIs, attribute based routing should be used so we will focus on that. app.MapControllers() adds endpoints for our controller actions, but no actions are specified, no conventions applied, this is the preferred approach for APIs.

// app.UseRouting();
// app.UseAuthorization();
// app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

// Example above is how you'd set this up in .NET 5, and you can still do it like this in .NET 6, but there's a shortcut available.
// app.MapControllers() replaces having to adding the routing middleware and the endpoints middleware, and then calling MapControllers when setting up the endpoints middleware. We can just call the MapControllers() method on the WebApplication object (app in this case) directly, because WebApplication implements the IEndpointsRouting()

// app.UseAuthorization();
// app.MapControllers();

// However you choose to do it, it still means that no routes are specified, so we have to set them up through attribute based routing, which allows you to use attributes at controller and action level: [Route], [HttpGet], ...
// Combined with a URI template, requests are matched to controller actions. For this you can use a variety of attributes depending on the HTTP method you want to match.

/* 
    HTTP Method     Attribute       Level       SampleURI
    GET             HttpGet         Action      /api/cities     /api/cities/1
    POST            HttpPost        Action      /api/cities
    PUT             HttpPut         Action      /api/cities/1
    PATCH           HttpPatch       Action      /api/cities/1
    DELETE          HttpDelete      Action      /api/cities/1
    ---             Route           Controller  ---

    The [Route] attribute, doesn't match to an HTTP method, this is used at controller level. The provided template will prefix all templates at the action-level attributes. For example, we see that all our sample URIs start with api/cities. The [Route] attribute could be used at controller level with api/cities as its template value. That way we don't have to provide that value in the templates of all the action-level attributes
*/

// For example, when consuming HTTP services to get data, we should send an HTTP request with the HTTP method GET, to a URI that routes to an action on a controller

app.UseHttpsRedirection();

app.UseRouting(); // add routing middleware to the request pipeline

app.UseAuthorization();


// next we add endpoints, and we configure them by calling MapControllers which adds endpoints for controller actions without specifying routes
app.UseEndpoints(endpoint => {
    endpoint.MapControllers();
});

app.Run();
