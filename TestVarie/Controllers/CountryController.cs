using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TestVarie.Models;

namespace TestVarie.Controllers
{
    public class CountryController : ApiController
    {
        private AW db = new AW();

        // GET: api/Country
 
        public string[] GetCountryRegions()
        {
            return db.CountryRegions.Select(c => c.Name).ToArray();
        }

        // GET: api/Country/5
        [ResponseType(typeof(CountryRegion))]
        public IHttpActionResult GetCountryRegion(string id)
        {
            CountryRegion countryRegion = db.CountryRegions.Find(id);
            if (countryRegion == null)
            {
                return NotFound();
            }

            return Ok(countryRegion);
        }

        // PUT: api/Country/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCountryRegion(string id, CountryRegion countryRegion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != countryRegion.CountryRegionCode)
            {
                return BadRequest();
            }

            db.Entry(countryRegion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryRegionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Country
        [ResponseType(typeof(CountryRegion))]
        public IHttpActionResult PostCountryRegion(CountryRegion countryRegion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CountryRegions.Add(countryRegion);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CountryRegionExists(countryRegion.CountryRegionCode))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = countryRegion.CountryRegionCode }, countryRegion);
        }

        // DELETE: api/Country/5
        [ResponseType(typeof(CountryRegion))]
        public IHttpActionResult DeleteCountryRegion(string id)
        {
            CountryRegion countryRegion = db.CountryRegions.Find(id);
            if (countryRegion == null)
            {
                return NotFound();
            }

            db.CountryRegions.Remove(countryRegion);
            db.SaveChanges();

            return Ok(countryRegion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CountryRegionExists(string id)
        {
            return db.CountryRegions.Count(e => e.CountryRegionCode == id) > 0;
        }
    }
}