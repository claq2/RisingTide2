using RisingTide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RisingTide.API.Controllers
{
    public class UpcomingPaymentsController : ApiController
    {
        // GET api/UpcomingPayments/userId
        public IEnumerable<SinglePaymentWithDate> Get(string userId, DateTime startDate)
        {
            return Get(userId, startDate, 0);
        }

        public IEnumerable<SinglePaymentWithDate> Get(string userId, DateTime startDate, decimal startingBalance)
        {
            var service = new ScheduledPaymentService();
            var result = service.GetPaymentsForUser(userId);
            var r = result.GetUpcomingPayments(startDate.Date, startingBalance);
            return r;
        }
    }
}