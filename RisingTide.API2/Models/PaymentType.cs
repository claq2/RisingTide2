using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace RisingTide.API.Models
{
    public class PaymentType
    {
        public static readonly string Credit = "Credit";
        public static readonly string Debit = "Debit";
        [XmlRoot("PaymentType", Namespace = "http://risingtide.com/paymenttype")]
        public enum Types
        {
            Credit,
            Debit
        }
    }
}
