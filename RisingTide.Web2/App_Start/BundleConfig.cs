using System.Configuration;
using System.Web;
using System.Web.Optimization;
using System.Linq;
using System.Collections.Generic;

namespace RisingTide.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/flot/jquery.flot.js",
                        "~/Scripts/flot/jquery.flot.time.js",
                        "~/Scripts/toastr.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            var risingTideFiles = new List<string>
            {
                "~/Scripts/App/*.js",
                "~/Scripts/App/Services/DataService.js",
                "~/Scripts/App/Services/LoggerService.js",
                "~/Scripts/App/Services/bootstrap.dialog.js",
                "~/Scripts/App/Directives/*.js",
                "~/Scripts/App/Login/*.js",
                "~/Scripts/App/ScheduledPayments/*.js",
                "~/Scripts/App/UpcomingPayments/*.js",
                "~/Scripts/App/CashFlow/*.js" 
            };

            var localServices = new List<string>
            { 
                "~/Scripts/App/Services/LocalDataService.js",
                "~/Scripts/App/Services/LocalLoginService.js",
            };

            var localAzureServices = new List<string>
            { 
                "~/Scripts/App/Services/AzureDataService.js",
                "~/Scripts/App/Services/AzureLocalhostLoginService.js",
            };

            var localAzureNetServices = new List<string>
            { 
                "~/Scripts/App/Services/LocalAzureNetDataService.js",
                "~/Scripts/App/Services/LocalAzureNetLoginService.js",
            };

            var azureNetServices = new List<string>
            { 
                "~/Scripts/App/Services/AzureNetDataService.js",
                "~/Scripts/App/Services/AzureNetLoginService.js",
            };


            var azureServices = new List<string>
            { 
                "~/Scripts/App/Services/AzureDataService.js",
                "~/Scripts/App/Services/AzureLoginService.js",
            };

            string dataService = ConfigurationManager.AppSettings["dataService"];
            if (dataService == "Local")
            {
                risingTideFiles.AddRange(localServices);
            }
            else if (dataService == "LocalAzure")
            {
                risingTideFiles.AddRange(localAzureServices);
            }
            else if (dataService == "Azure")
            {
                risingTideFiles.AddRange(azureServices);
            }
            else if (dataService == "LocalAzureNet")
            {
                risingTideFiles.AddRange(localAzureNetServices);
            }
            else if (dataService == "AzureNet")
            {
                risingTideFiles.AddRange(azureNetServices);
            }

            bundles.Add(new ScriptBundle("~/bundles/RisingTide").Include(risingTideFiles.ToArray()));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/main.css",
                      "~/Content/bootstrap-theme.css",
                      "~/Content/toastr.css"));

            bundles.Add(new ScriptBundle("~/bundles/MobileServices").Include(
                      "~/Scripts/MobileServices.Web-1.1.5.js"));
        }
    }
}
