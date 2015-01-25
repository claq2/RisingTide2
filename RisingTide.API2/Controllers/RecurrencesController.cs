using RisingTide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RisingTide.API.Controllers
{
    public class RecurrencesController : ApiController
    {
        // GET api/Recurrences
        public IEnumerable<string> Get()
        {
            return Recurrence.AllRecurrences;
        }
    }
}