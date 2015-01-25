using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RisingTide.API.Models
{
    public class CalendarDay
    {
        public DateTime Date { get; set; }
        public decimal EndOfDayBalance { get; set; }
        public List<SinglePayment> Payments { get; set; }

        public CalendarDay()
        {
            this.Payments = new List<SinglePayment>();
        }
    }
}
