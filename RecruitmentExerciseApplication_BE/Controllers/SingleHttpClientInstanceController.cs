using Microsoft.AspNetCore.Mvc;
using RecruitmentExerciseApplication_BE.Models;

namespace RecruitmentExerciseApplication_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SingleHttpClientInstanceController
    {
        private static readonly HttpClient httpClient;

        static SingleHttpClientInstanceController()
        {
            httpClient = new HttpClient();
        }

        public async Task<TerritoryResponse> GetTerritoryAsync(string url)
        {
            var result = await httpClient.GetAsync(url);
            var dataObjects = await result.Content.ReadFromJsonAsync<TerritoryResponse>();
            httpClient.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            return dataObjects;
        }

        public async Task<AccountModel> CreateAccountAsync([FromForm] AccountCredentials accountCredentials, string url)
        {
            httpClient.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, accountCredentials);
            var dataObjects = response.Content.ReadFromJsonAsync<AccountModel>();
            return await dataObjects;

        }
    }
}
