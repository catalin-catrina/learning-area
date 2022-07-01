using CityInfo.API.Models;

namespace CityInfo.API
{
    public class CitiesDataStore
    {
        public List<CityDto> Cities { get; set; }
        public static CitiesDataStore Current { get; } = new CitiesDataStore();
        public CitiesDataStore()
        {
            Cities = new List<CityDto>()
            {
                new CityDto()
                {
                    Id = 1,
                    Name = "Cluj",
                    Description = "lorem ipsum asd sdqwe",
                    PointsOfInterest = new List<PointOfInterestDto>()
                    {
                        new PointOfInterestDto()
                        {
                            Id = 1,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        },
                        new PointOfInterestDto()
                        {
                            Id = 2,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        }
                    }
                }, 
                new CityDto()
                {
                    Id = 2,
                    Name = "Bucuresti",
                    Description = "lorem ipsum dsqwe wqvxc",
                    PointsOfInterest = new List<PointOfInterestDto>()
                    {
                        new PointOfInterestDto()
                        {
                            Id = 1,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        },
                        new PointOfInterestDto()
                        {
                            Id = 2,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        }
                    }
                },
                new CityDto()
                {
                    Id = 3,
                    Name = "Timisoara",
                    Description = "lorem ipsum sda asdqwe",
                    PointsOfInterest = new List<PointOfInterestDto>()
                    {
                        new PointOfInterestDto()
                        {
                            Id = 1,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        },
                        new PointOfInterestDto()
                        {
                            Id = 2,
                            Name = "lorem ipsum",
                            Description = "lorem isadsdas adfsdfs"
                        }
                    }
                }
            };
        }
    }
}
