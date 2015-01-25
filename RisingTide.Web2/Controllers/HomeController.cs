using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RisingTide.Web.Controllers
{
    public class HomeController : Controller
    {
#if !DEBUG
        [RequireHttps]
#endif
        public ActionResult Index()
        {
            return View();
        }
    }
}