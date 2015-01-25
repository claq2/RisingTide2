using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace RisingTide.API.Models
{
    public class Recurrence
    {
        public static readonly string None = "None";
        public static readonly string Weekly = "Weekly";
        public static readonly string Biweekly = "Biweekly";
        public static readonly string Monthly = "Monthly";
        public static readonly string Bimonthly = "Bimonthly";
        public static readonly string LastDayOfMonth = "LastDayOfMonth";
        public static readonly IEnumerable<string> AllRecurrences = new List<string> { None, Weekly, Biweekly, Monthly, Bimonthly, LastDayOfMonth };
        [XmlRoot("RecurrenceType", Namespace="http://risingtide.com/recurrence")]
        public enum Types
        {
            None,
            Weekly,
            Biweekly,
            Monthly,
            Bimonthly,
            LastDayOfMonth
        }
    }
}