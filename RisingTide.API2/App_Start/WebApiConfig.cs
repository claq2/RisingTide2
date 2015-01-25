using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace RisingTide.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
             
            // Web API routes
            config.MapHttpAttributeRoutes(); 

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{userId}",
                defaults: new { userId = RouteParameter.Optional });

            config.Routes.MapHttpRoute(
            name: "UserIdAndPaymentId",
            routeTemplate: "api/{controller}/{userId}/{id}");

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
