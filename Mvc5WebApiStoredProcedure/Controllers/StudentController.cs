using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mvc5WebApiStoredProcedure.Controllers
{
    public class StudentController : ApiController
    {
        StudentDBContext context = new StudentDBContext();

        [HttpGet]
        public IEnumerable<USP_Student_Select_Result> Get(string StudentName, string StudentEmail)
        {
            if (StudentName == null)
                StudentName = "";
            if (StudentEmail == null)
                StudentEmail = "";
            return context.USP_Student_Select(StudentName, StudentEmail).AsEnumerable();
        }

        [HttpGet]
        public IEnumerable<string> insertStudent(string StudentName, string StudentEmail, string Phone, string Address)
        {
            return context.USP_Student_Insert(StudentName, StudentEmail, Phone, Address).AsEnumerable();
        }

        [HttpGet]
        public IEnumerable<string> updateStudent(int stdID, string StudentName, string StudentEmail, string Phone, string Address)
        {
            return context.USP_Student_Update(stdID, StudentName, StudentEmail, Phone, Address).AsEnumerable();
        }

        [HttpGet]
        public string deleteStudent(int stdID)
        {
            context.USP_Student_Delete(stdID);
            context.SaveChanges();
            return "deleted";
        }
    }
}
