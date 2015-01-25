using RisingTide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace RisingTide.API.Controllers
{
    public class ScheduledPaymentsController : ApiController
    {
        // GET api/scheduledpayments/userId
        public IEnumerable<ScheduledPayment> Get(string userId)
        {
            var service = new ScheduledPaymentService();
            var result = service.GetPaymentsForUser(userId);
#if DEBUG
                Thread.Sleep(1000);
#endif
            return result;
        }

        // GET api/scheduledpayments/userId/id
        public ScheduledPayment Get(string userId, Guid id)
        {
            var service = new ScheduledPaymentService();
            var result = service.GetPaymentForUser(userId, id);
#if DEBUG
                Thread.Sleep(1000);
#endif
            return result;
        }

        // POST api/scheduledpayments
        public ScheduledPayment Post([FromBody]ScheduledPayment value)
        {
            var service = new ScheduledPaymentService();
            var result = service.AddPayment(value);
            //var response = Request.CreateResponse<ScheduledPayment>(HttpStatusCode.Created, result);
            //string uri = Url.Link("UserIdAndPaymentId", new { userId = result.UserId, id = result.Id });
            //response.Headers.Location = new Uri(uri);
            return result;
        }

        // PUT api/scheduledpayments
        public ScheduledPayment Put([FromBody]ScheduledPayment value)
        {
            var service = new ScheduledPaymentService();
            var result = service.UpdatePayment(value);
            return result;
        }

        // DELETE api/scheduledpayments/userId/id
        public void Delete(string userId, Guid id)
        {
            var service = new ScheduledPaymentService();
            service.Delete(userId, id);
        }
    }
}
