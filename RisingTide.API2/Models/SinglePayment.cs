using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Converters;

namespace RisingTide.API.Models
{
    public class SinglePayment : IComparable
    {
        public decimal Amount { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public PaymentType.Types PaymentType { get; set; }
        
        public string Subject { get; set; }
        
        public Guid ScheduledPaymentId { get; set; }
        
        public bool IncludeInCashFlowAnalysis { get; set; }

        /// <summary>
        /// Initializes a new instance of the SinglePayment class.
        /// </summary>
        public SinglePayment()
        {
            this.PaymentType = Models.PaymentType.Types.Debit;
        }

        public virtual int CompareTo(object obj)
        {
            SinglePayment otherAsPayment = obj as SinglePayment;
            if (otherAsPayment == null)
            {
                throw new ArgumentException("obj is not a SinglePayment");
            }

            if (otherAsPayment.PaymentType == this.PaymentType)
            {
                return 0;
            }
            else if (this.PaymentType == Models.PaymentType.Types.Debit && otherAsPayment.PaymentType == Models.PaymentType.Types.Credit)
            {
                //this is debit and the other is credit so this comes after
                return 1;
            }
            else
            {
                // this is credit and other is debit so this comes first
                return -1;
            }
        }
    }
}
