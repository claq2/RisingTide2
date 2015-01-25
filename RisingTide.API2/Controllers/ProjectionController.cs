using RisingTide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RisingTide.API.Controllers
{
    public class ProjectionController : ApiController
    {
        public IEnumerable<CalendarDay> Get(string userId, DateTime startDate, int numberOfDays, decimal initialBalance)
        {
            var service = new ScheduledPaymentService();
            var payments = service.GetPaymentsForUser(userId);
            var data = payments.GetDayRangeWithPaymentsFor(startDate.Date, numberOfDays, initialBalance);
            return data;
        }
    }
}
