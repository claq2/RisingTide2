using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RisingTide.API.Models
{
    public class SinglePaymentWithDate : SinglePayment, IComparable
    {
        public DateTime DueDate { get; set; }

        public decimal Balance { get; set; }

        public override int CompareTo(object obj)
        {
            SinglePaymentWithDate otherAsPaymentDate = obj as SinglePaymentWithDate;
            if (otherAsPaymentDate == null)
            {
                throw new ArgumentException("obj is not a PaymentOnDate");
            }

            if (otherAsPaymentDate.DueDate == this.DueDate)
            {
                return base.CompareTo(otherAsPaymentDate);
                //if (otherAsPaymentDate.IsDebit == this.IsDebit)
                //{
                //    return 0;
                //}
                //else if (this.IsDebit && !otherAsPaymentDate.IsDebit)
                //{
                //    //this is debit and the other is credit so this comes after
                //    return 1;
                //}
                //else
                //{
                //    // this is credit and other is debit so this comes first
                //    return -1;
                //}
            }
            else
            {
                return this.DueDate.CompareTo(otherAsPaymentDate.DueDate);
            }
        }
    }
}
