using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RisingTide.API.Models
{
    public static class DateTimeExtensions
    {
        public static DateTime LastDayOfMonth(this DateTime date)
        {
            DateTime firstDayOfTheMonth = new DateTime(date.Year, date.Month, 1);
            return firstDayOfTheMonth.AddMonths(1).AddDays(-1);
        }
    }
}
