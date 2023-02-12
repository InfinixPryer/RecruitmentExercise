using Microsoft.AspNetCore.Mvc;

namespace RecruitmentExerciseApplication_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TerritoryController : ControllerBase
    {
        SingleHttpClientInstanceController client = new SingleHttpClientInstanceController();

        [HttpGet("/Territories/All")]
        public async Task<IActionResult> Get()
        {
            string url = "https://netzwelt-devtest.azurewebsites.net/Territories/All";
            var data = await client.GetTerritoryAsync(url);

            return Ok(data);
        }

    }
}
