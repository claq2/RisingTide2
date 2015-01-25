using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RisingTide.API.Models
{
    public class ScheduledPaymentService : IScheduledPaymentService
    {
        protected static readonly string TableName = "ScheduledPaymentstest";

        private static readonly string ConnectionStringKey = "TableConnection";

        protected static CloudStorageAccount Account
        {
            get
            {
                var result = CloudStorageAccount.Parse(ConfigurationManager.AppSettings[ConnectionStringKey]);
                return result;
            }
        }

        public void Delete(string userId, Guid id)
        {
            var cloudTable = GetPaymentsTable();
            TableOperation retrieveOperation = TableOperation.Retrieve<ScheduledPaymentTableEntity>(userId, id.ToString().ToUpperInvariant());
            TableResult retrievedResult = cloudTable.Execute(retrieveOperation);
            if (retrievedResult.Result != null)
            {
                var toDelete = (ScheduledPaymentTableEntity)retrievedResult.Result;
                TableOperation deleteOperation = TableOperation.Delete(toDelete);
                cloudTable.Execute(deleteOperation);
            }
            else
            {
                throw new HttpResponseException(new HttpResponseMessage() { ReasonPhrase = "Not Found", Content = new StringContent(String.Format("Scheduled payment {0} for {1} does not exist.", id, userId)), StatusCode = HttpStatusCode.NotFound });
            }
        }

        public IEnumerable<ScheduledPayment> GetPaymentsForUser(string userId)
        {
            List<ScheduledPayment> result = new List<ScheduledPayment>();
            var entities = this.GetTableEntitiesForUser(userId);
            foreach (var entity in entities)
            {
                result.Add(new ScheduledPayment(entity));
            }

            return result;
        }

        public ScheduledPayment GetPaymentForUser(string userId, Guid id)
        {
            var entity = this.GetTableEntityForUser(userId, id);
            return new ScheduledPayment(entity);
        }

        public ScheduledPayment UpdatePayment(ScheduledPayment payment)
        {
            if (payment.Id == Guid.Empty)
            {
                throw new HttpResponseException(new HttpResponseMessage() { ReasonPhrase = "ID not specified", Content = new StringContent("You did not specify the ID on an existing payment"), StatusCode = HttpStatusCode.BadRequest });
            }

            ScheduledPaymentTableEntity paymentEntity = payment.ToEntity();
            this.UpdateScheduledPayment(paymentEntity);
            return payment;
        }

        public ScheduledPayment AddPayment(ScheduledPayment payment)
        {
            if (payment.Id != Guid.Empty)
            {
                throw new HttpResponseException(new HttpResponseMessage() { ReasonPhrase = "ID specified", Content = new StringContent("Do not specify ID on a new payment"), StatusCode = HttpStatusCode.BadRequest });
            }

            payment.Id = Guid.NewGuid();
            this.AddScheduledPaymentEntity(payment.ToEntity());
            return payment;
        }

        private void UpdateScheduledPayment(ScheduledPaymentTableEntity scheduledPaymentTableEntity)
        {
            var cloudTable = GetPaymentsTable();
            scheduledPaymentTableEntity.ETag = "*";
            TableOperation insertOperation = TableOperation.Merge(scheduledPaymentTableEntity);
            cloudTable.Execute(insertOperation);
        }

        private IEnumerable<ScheduledPaymentTableEntity> GetTableEntitiesForUser(string userId)
        {
            var cloudTable = GetPaymentsTable();
            TableQuery<ScheduledPaymentTableEntity> rangeQuery = new TableQuery<ScheduledPaymentTableEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, userId));

            var entities = cloudTable.ExecuteQuery(rangeQuery);
            List<ScheduledPaymentTableEntity> result = entities.ToList();

            return result;
        }

        private ScheduledPaymentTableEntity GetTableEntityForUser(string userId, Guid id)
        {
            ScheduledPaymentTableEntity result = null;
            TableOperation retrieveOperation = TableOperation.Retrieve<ScheduledPaymentTableEntity>(userId, id.ToString().ToUpperInvariant());
            var cloudTable = GetPaymentsTable();
            // Execute the retrieve operation.
            TableResult retrievedResult = cloudTable.Execute(retrieveOperation);
            if (retrievedResult.Result != null)
            {
                result = (ScheduledPaymentTableEntity)retrievedResult.Result;
            }
            else
            {
                throw new HttpResponseException(new HttpResponseMessage() { ReasonPhrase = "Not Found", Content = new StringContent(String.Format("Scheduled payment {0} for {1} does not exist.", id, userId)), StatusCode = HttpStatusCode.NotFound });
            }

            return result;
        }

        private void AddScheduledPaymentEntity(ScheduledPaymentTableEntity scheduledPaymentTableEntity)
        {
            var cloudTable = GetPaymentsTable();
            TableOperation insertOperation = TableOperation.Insert(scheduledPaymentTableEntity);
            cloudTable.Execute(insertOperation);
        }

        public IEnumerable<ScheduledPayment> GetAllRecords()
        {
            var result = new List<ScheduledPayment>();
            var cloudTable = GetPaymentsTable();
            TableContinuationToken tableContinuationToken = null;
            do
            {
                TableQuery<ScheduledPaymentTableEntity> rangeQuery = new TableQuery<ScheduledPaymentTableEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.GreaterThanOrEqual, "A"));
                var response = cloudTable.ExecuteQuerySegmented<ScheduledPaymentTableEntity>(rangeQuery, tableContinuationToken);
                tableContinuationToken = response.ContinuationToken;
                result.AddRange(response.Results.Select(te => new ScheduledPayment(te)));
            }
            while (tableContinuationToken != null);

            return result;
        }

        public IEnumerable<ScheduledPayment> AddRecords(IEnumerable<ScheduledPayment> records)
        {
            var result = new List<ScheduledPayment>();
            foreach (ScheduledPayment record in records)
            {
                record.Id = Guid.Empty;
                result.Add(this.AddPayment(record));
            }

            return result;
        }

        private static CloudTable GetPaymentsTable()
        {
            var cloudAccount = Account;
            var cloudClient = cloudAccount.CreateCloudTableClient();
            var cloudTable = cloudClient.GetTableReference(TableName);
            cloudTable.CreateIfNotExists();
            return cloudTable;
        }

    }
}