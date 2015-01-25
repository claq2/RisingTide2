using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RisingTide.API.Models
{
    public class ScheduledPaymentTableEntity : TableEntity
    {
        public ScheduledPaymentTableEntity()
        {

        }

        public ScheduledPaymentTableEntity(string userId, Guid id)
            :base(userId, id.ToString().ToUpperInvariant())
        {
            //this.PartitionKey = userId;
            //this.RowKey = id.ToString();
            //this.UserId = userId;
        }

        public ScheduledPaymentTableEntity(string userId, string subject)
            : base(userId, subject)
        {
            //this.PartitionKey = userId;
            //this.UserId = userId;
            //this.RowKey = subject;
            this.Subject = subject;
        }

        //public string UserId { get; set; }
        public string Subject { get; set; }
        public int Amount { get; set; }
        public string PaymentType { get; set; }
        public string Recurrence { get; set; }
        public DateTime DueDate { get; set; }
        public bool IncludeInCashFlowAnalysis { get; set; }
    }
}