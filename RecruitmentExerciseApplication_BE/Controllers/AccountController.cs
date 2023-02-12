using Microsoft.AspNetCore.Mvc;
using RecruitmentExerciseApplication_BE.Models;

namespace RecruitmentExerciseApplication_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        SingleHttpClientInstanceController client = new SingleHttpClientInstanceController();

        [HttpPost("/Account/SignIn")]
        public async Task<IActionResult> Post([FromForm] AccountCredentials accountCredentials)
        {
            string url = "https://netzwelt-devtest.azurewebsites.net/Account/SignIn";
            var accountToSend = await client.CreateAccountAsync(accountCredentials, url);

            if (accountToSend.Message != null)
            {

                return NotFound(accountToSend);
            }
            return Ok(accountToSend);
        }

    }
}
