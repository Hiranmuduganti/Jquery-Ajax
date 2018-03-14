using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using version2.Models;
using System.Data.Entity;

namespace version2.Controllers
{

    public class ProductSoldViewModel
    {

        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public string DateSold { get; set; }
    }
    public class ProductSoldsController : Controller
    {
        MvpsalesEntities db = new MvpsalesEntities();
        // GET: ProductSolds
        public ActionResult Index()
        {
            var productsold = new ProductSold();
            ViewBag.CustomerId = new SelectList(db.Customers, "CustomerId", "CustomerName", productsold.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "ProductId", "ProductName", productsold.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "StoreId", "StoreName", productsold.StoreId);
            return View();
            
        }
        public JsonResult List()
        {
            var productsold = db.ProductSolds.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store).Select(x => new
            {
                Id = x.Id,
                ProductId = x.Product.ProductName,
                CustomerId = x.Customer.CustomerName,
                StoreId = x.Store.StoreName,
                DateSold = x.DateSold.Day + "- " + x.DateSold.Month + "-" + x.DateSold.Year
            }).ToList();

            return Json(productsold, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ProductSold psold)
        {
            db.ProductSolds.Add(psold);
            db.SaveChanges();

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var ProductSold = db.ProductSolds.Where(x => x.Id == ID).Select(x => new ProductSoldViewModel
            {
                Id = ID,
                CustomerId = x.CustomerId,
                DateSold = x.DateSold.Day + "- " + x.DateSold.Month + "-" + x.DateSold.Year,
                StoreId = x.StoreId,
                ProductId = x.ProductId
            }).FirstOrDefault();
            return Json(ProductSold, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ProductSold psold)
        {
            db.Entry(psold).State = EntityState.Modified;
            db.SaveChanges();
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveProduct(long ID)
        {
            ProductSold psold = db.ProductSolds.Find(ID);
            db.ProductSolds.Remove(psold);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}