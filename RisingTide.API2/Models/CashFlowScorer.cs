using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RisingTide.API.Models
{
    public static class CashFlowScorer
    {
        public readonly static int NumberOfDaysInFirstPeriod = 30;
        public readonly static int NumberOfDaysInSecondPeriod = 90;
        public readonly static int NumberOfDaysInThirdPeriod = 180;
        public readonly static int NumberOfDaysInFourthPeriod = 365;

        public static double CalculateScore(decimal initialBalance, decimal balanceAfterFirstPeriod, decimal balanceAfter9SecondPeriod, decimal balanceAfterThirdPeriod, decimal balanceAfterFourthPeriod)
        {
            const double scoreForPositiveBalanceAfterFirstPeriod = 0.5;
            const double scoreForPositiveBalanceAfterSecondPeriod = 1.0;
            const double scoreForPositiveBalanceAfterThirdPeriod = 1.5;
            const double scoreForPositiveBalanceAfterFourthPeriod = 2.0;

            double score = 0;
            if (balanceAfterFirstPeriod >= initialBalance)
            {
                score += scoreForPositiveBalanceAfterFirstPeriod;
            }
            else
            {
                score -= scoreForPositiveBalanceAfterFirstPeriod;
            }

            if (balanceAfter9SecondPeriod >= initialBalance)
            {
                score += scoreForPositiveBalanceAfterSecondPeriod;
            }
            else
            {
                score -= scoreForPositiveBalanceAfterSecondPeriod;
            }

            if (balanceAfterThirdPeriod >= initialBalance)
            {
                score += scoreForPositiveBalanceAfterThirdPeriod;
            }
            else
            {
                score -= scoreForPositiveBalanceAfterThirdPeriod;
            }

            if (balanceAfterFourthPeriod >= initialBalance)
            {
                score += scoreForPositiveBalanceAfterFourthPeriod;
            }
            else
            {
                score -= scoreForPositiveBalanceAfterFourthPeriod;
            }

            return score;
        }
    }
}
