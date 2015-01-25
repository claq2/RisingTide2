using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace RisingTide.API.Models
{
    public class ScheduledPayment
    {
        private DateTime dueDate;

        public ScheduledPayment()
        {

        }

        /// <summary>
        /// Initializes a new instance of the ScheduledPayment class.
        /// </summary>
        public ScheduledPayment(ScheduledPaymentTableEntity entity)
        {
            UserId = entity.PartitionKey;
            this.Id = new Guid(entity.RowKey);
            Subject = entity.Subject;
            Amount = entity.Amount / 100m;
            PaymentType = (PaymentType.Types)Enum.Parse(typeof(PaymentType.Types), entity.PaymentType);
            Recurrence = (Recurrence.Types)Enum.Parse(typeof(Recurrence.Types), entity.Recurrence);
            DueDate = entity.DueDate;
            IncludeInCashFlowAnalysis = entity.IncludeInCashFlowAnalysis;
        }

        public ScheduledPaymentTableEntity ToEntity()
        {
            ScheduledPaymentTableEntity result = new ScheduledPaymentTableEntity(this.UserId, this.Id)
            {
                Amount = Convert.ToInt32(this.Amount * 100),
                DueDate = this.DueDate,
                IncludeInCashFlowAnalysis = this.IncludeInCashFlowAnalysis,
                PaymentType = this.PaymentType.ToString(),
                Recurrence = this.Recurrence.ToString(),
                Subject = this.Subject
            };

            return result;
        }

        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Subject { get; set; }

        public decimal Amount { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public PaymentType.Types PaymentType { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Recurrence.Types Recurrence { get; set; }

        public virtual DateTime DueDate
        {
            get { return this.dueDate; }
            set { this.dueDate = value.Date; }
        }

        public bool IncludeInCashFlowAnalysis { get; set; }

        public DateTime NextDueDateAsOf(DateTime specificDate)
        {
            return this.NextDateAsOf(this.DueDate, specificDate);
        }

        private DateTime NextDateAsOf(DateTime startDate, DateTime specificDate)
        {
            specificDate = specificDate.Date;
            DateTime result = DateTime.MinValue;
            if (this.Recurrence == Models.Recurrence.Types.Weekly)
            {
                result = startDate;
                while (result < specificDate)
                {
                    result = result.AddDays(7);
                }
            }
            else if (this.Recurrence == Models.Recurrence.Types.Biweekly)
            {
                result = startDate;
                while (result < specificDate)
                {
                    result = result.AddDays(14);
                }
            }
            else if (this.Recurrence == Models.Recurrence.Types.Monthly)
            {
                result = startDate;
                while (result < specificDate)
                {
                    result = result.AddMonths(1);
                }
            }
            else if (this.Recurrence == Models.Recurrence.Types.Bimonthly)
            {
                result = startDate;
                while (result < specificDate)
                {
                    result = result.AddMonths(2);
                }
            }
            else if (this.Recurrence == Models.Recurrence.Types.LastDayOfMonth)
            {
                result = startDate.LastDayOfMonth();
                while (result < specificDate)
                {
                    result = result.AddMonths(1).LastDayOfMonth();
                }
            }
            else if (this.Recurrence == Models.Recurrence.Types.None && startDate >= specificDate)
            {
                result = startDate;
            }

            return result;
        }
    }
}
