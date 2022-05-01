using System.Text.Json;
using System.Text.Json.Serialization;

namespace ContosoCrafts.Website.Models
{
    // products.json is a json file, and Product.cs is a c# class that represents that data, and I want to have lists of products
    // we need to map these 2 together (json properties to class members)
    // We can do that using a JSON Property which is like an attribute that you can stick at the top of your property and then map them that way
    public class Product
    {
        public string Id { get; set; }
        public string Maker { get; set; }

        // here we're explicitly saying that the json property name is img and we're mapping it to our class prroperty called Image
        [JsonPropertyName("img")]
        public string Image { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int[] Ratings { get; set; }

        public override string ToString()
        {
            // serialize = convert object -> string
            // serialize is taking all of this object information and converting it back into text that will be part of the json file
            // serial means doing something one after another, so to serialize it means to go and take product, and product, and product, and all the properties and all the properties one after another and make a string
            // we're going to serialize the type of Product
            // this means we're going to serialize this object
            return JsonSerializer.Serialize<Product>(this);
        }
    }
}
