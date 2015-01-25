using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RisingTide.API.Models
{
    public static class ICollectionScheduledPaymentsExtensions
    {
        public static List<CalendarDay> GetDayRangeWithPaymentsFor(this IEnumerable<ScheduledPayment> payments, DateTime startDate, int numberOfDays, decimal initialBalance)
        {
            List<CalendarDay> result = new List<CalendarDay>();
            decimal currentBalance = initialBalance;
            for (int i = 0; i < numberOfDays; i++)
            {
                DateTime currentDate = startDate.AddDays(i).Date;
                result.Add(new CalendarDay() { Date = currentDate, Payments = new List<SinglePayment>() });
                result[i].EndOfDayBalance = currentBalance;
                foreach (ScheduledPayment scheduledPayment in payments)
                {
                    if (scheduledPayment.Recurrence == Recurrence.Types.None && scheduledPayment.DueDate != currentDate)
                    {
                        continue;
                    }

                    DateTime nextPaymentDate = scheduledPayment.NextDueDateAsOf(currentDate);
                    if (nextPaymentDate == currentDate)
                    {
                        SinglePayment singlePayment = new SinglePayment()
                        {
                            Amount = scheduledPayment.Amount * (scheduledPayment.PaymentType == PaymentType.Types.Debit ? -1 : 1),
                            Subject = scheduledPayment.Subject,
                            ScheduledPaymentId = scheduledPayment.Id,
                            IncludeInCashFlowAnalysis = scheduledPayment.IncludeInCashFlowAnalysis
                        };

                        result[i].Payments.Add(singlePayment);

                        if (scheduledPayment.IncludeInCashFlowAnalysis)
                        {
                            result[i].EndOfDayBalance += singlePayment.Amount;
                        }
                    }
                }

                result[i].Payments.Sort();
                currentBalance = result[i].EndOfDayBalance;
            }

            return result;
        }

        public static List<SinglePaymentWithDate> GetUpcomingPayments(this IEnumerable<ScheduledPayment> payments, DateTime startDate)
        {
            return payments.GetUpcomingPayments(startDate, 0);
        }

        public static List<SinglePaymentWithDate> GetUpcomingPayments(this IEnumerable<ScheduledPayment> payments, DateTime startDate, decimal startingBalance)
        {
            DateTime dateOfStartDate = startDate.Date;
            List<SinglePaymentWithDate> result = new List<SinglePaymentWithDate>();
            foreach (var scheduledPayment in payments)
            {
                if (scheduledPayment.Recurrence == Recurrence.Types.None && scheduledPayment.DueDate < dateOfStartDate)
                {
                    continue;
                }

                result.Add(new SinglePaymentWithDate()
                {
                    Amount = scheduledPayment.Amount * (scheduledPayment.PaymentType == PaymentType.Types.Debit ? -1 : 1),
                    Subject = scheduledPayment.Subject,
                    IncludeInCashFlowAnalysis = scheduledPayment.IncludeInCashFlowAnalysis,
                    DueDate = scheduledPayment.NextDueDateAsOf(dateOfStartDate),
                    PaymentType = scheduledPayment.PaymentType,
                    ScheduledPaymentId = scheduledPayment.Id,
                });
            }

            result.Sort();

            var currentBalance = startingBalance;
            foreach (SinglePaymentWithDate singlePaymentWithDate in result)
            {
                currentBalance += singlePaymentWithDate.Amount;
                singlePaymentWithDate.Balance = currentBalance;
            }

            return result;
        }

        public static bool IsCashFlowScorePositive(this IEnumerable<ScheduledPayment> payments)
        {
            decimal balanceOnFirstDay = payments.GetDayRangeWithPaymentsFor(DateTime.Now.Date, 1, 0).First().EndOfDayBalance;
            decimal balanceAfterFirstPeriod = payments.GetDayRangeWithPaymentsFor(DateTime.Now.Date, CashFlowScorer.NumberOfDaysInFirstPeriod, 0).Last().EndOfDayBalance;
            decimal balanceAfterSecondPeriod = payments.GetDayRangeWithPaymentsFor(DateTime.Now.Date, CashFlowScorer.NumberOfDaysInSecondPeriod, 0).Last().EndOfDayBalance;
            decimal balanceAfterThirdPeriod = payments.GetDayRangeWithPaymentsFor(DateTime.Now.Date, CashFlowScorer.NumberOfDaysInThirdPeriod, 0).Last().EndOfDayBalance;
            decimal balanceAfterFourthPeriod = payments.GetDayRangeWithPaymentsFor(DateTime.Now.Date, CashFlowScorer.NumberOfDaysInFourthPeriod, 0).Last().EndOfDayBalance;

            return CashFlowScorer.CalculateScore(balanceOnFirstDay, balanceAfterFirstPeriod, balanceAfterSecondPeriod, balanceAfterThirdPeriod, balanceAfterFourthPeriod) > 0;
        }
    }
}
