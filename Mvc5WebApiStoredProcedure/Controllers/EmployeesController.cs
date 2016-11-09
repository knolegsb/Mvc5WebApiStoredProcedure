using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mvc5WebApiStoredProcedure.Controllers
{
    public class EmployeesController : ApiController
    {
        StudentDBContext db = new StudentDBContext();
        
        // GET: api/Employees
        [HttpGet]
        public IEnumerable<Employee> GetAllEmployess()
        {
            return db.Employees.ToList();
        }

        [HttpGet]
        public IEnumerable<ReadAllEmployee_Result> ListAllEmployees(string name, string country, string managerName)
        {
            return db.ReadAllEmployee(name, country, managerName).AsEnumerable();
        }

        [HttpGet]
        public void addNewEmployee(string name, string email, string country, string managerName)
        {
            db.AddNewEmployee(name, email, country, 1, managerName, "Profile.jpg");
        }

        [HttpGet]
        public void updateEmployee(int? id, string name, string email, string country, string managerName)
        {
            db.UpdateEmployee(id, name, email, country, managerName);
        }

        [HttpGet]
        public void deleteEmployee(int id)
        {
            db.DeleteEmploye(id);
            db.SaveChanges();
        }

        // GET: api/Employees/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Employees
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Employees/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Employees/5
        public void Delete(int id)
        {
        }
    }
}
