using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingTide.API.Models
{
    public interface IScheduledPaymentService
    {
        ScheduledPayment UpdatePayment(ScheduledPayment payment);
        void Delete(string userId, Guid id);
        IEnumerable<ScheduledPayment> GetPaymentsForUser(string userId);
        ScheduledPayment GetPaymentForUser(string userId, Guid id);
        ScheduledPayment AddPayment(ScheduledPayment payment);
        IEnumerable<ScheduledPayment> GetAllRecords();
        IEnumerable<ScheduledPayment> AddRecords(IEnumerable<ScheduledPayment> records);
    }
}
