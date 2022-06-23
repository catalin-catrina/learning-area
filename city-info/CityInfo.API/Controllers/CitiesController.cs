using CityInfo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    // ControllerBase contains basic functionality controllers need, like access to the model state, the current user, and common methods of returning responses. We could also derive from Controller instead of ControllerBase, but that base class contains additional helper methods to use when returning views, which isn't needed when building an API

    // The next thing we want to do is add the [ApiController] attribute, while not necessary, very useful, because it configures this controller with features and behaviours aimed at improving the developer experience when building APIs. Think about requiring a certain type of routing, automatically returning a 400 Bad Request on bad input, and returning problem details on errors
    [ApiController]
    //[Route("api/cities")] // specifying "api/cities" here allows us to skip them in the request templates
    [Route("api/[controller]")] // but since our controller is named CitiesController (controller is deleted, and cities is lowercased, so controller is named cities, we can pass in "api[controller]" to our Route attribute instead of "api/cities"
    public class CitiesController : ControllerBase
    {
        // next, we need a method that returns data
        // we want to respond to a get request, so we use the [HttpGet] attribute. We want this controller action to be executed when we send the request to, say, api/cities, so that's what we pass in as the routing template
        //[HttpGet("api/cities")]
        //[HttpGet]
        //public JsonResult GetCities()
        //{
        //    // we want to return JSON as the representation format of our data, for that we can use the JsonResult class / type to instantiate a new object, which will return a jsonfied version of whatever we pass in
        //    // however we don't always want to return a json format, besides, while we can set a status code on a JsonResult type because JsonResult implements IStatusCodeActionResult interface, this can become rather cumbersome
        //    var temp = new JsonResult(CitiesDataStore.Current.Cities);
        //    temp.StatusCode = 200;
        //    return temp;
        //}

        // ASP.NET Core contains a set of built-in helper methods on ControllerBase, that all create an IAction result

        //[HttpGet("api/cities/{id}")] // I don't need to specify api/cities because the Route attribute takes care of it for me
        //[HttpGet("{id}")]
        //public JsonResult GetCity(int id)
        //{
        //    var temp = new JsonResult(CitiesDataStore.Current.Cities.FirstOrDefault(city => city.Id == id));
        //    temp.Statuscode = 200;
        //    return temp;
        //}

        // this way we're not tied automatically to json format and we can return status codes more easily
        [HttpGet]
        public ActionResult<IEnumerable<CityDto>> GetCities()
        {
            // we don't check and return NotFound() here because even if the list is empty, we found the list and return it empty
            var cities = CitiesDataStore.Current.Cities;
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public ActionResult<CityDto> GetCity(int id)
        {
            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(city => city.Id == id);
            if (cityToReturn == null)
            {
                return NotFound(); // will return 404 not found
            }
            return Ok(cityToReturn); // will return the city with a 200 ok status code
        }
    }
}
