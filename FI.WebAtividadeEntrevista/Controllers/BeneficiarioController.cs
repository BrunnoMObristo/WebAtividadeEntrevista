using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.IO;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Beneficiarios(int idCliente)
        {
            BoBeneficiario bo = new BoBeneficiario();
            List<Beneficiario> beneficiario = bo.Listar(idCliente).ToList();

            List<BeneficiarioModel> model = new List<BeneficiarioModel>();           

            if (beneficiario != null)
            {
                foreach(var dado in beneficiario)
                {
                    var beneficiarios = new BeneficiarioModel
                    {
                        Id = dado.Id,
                        Nome = dado.Nome,
                        CPF = dado.CPF,
                        IdCliente = dado.IdCliente
                    };

                    model.Add(beneficiarios);
                };
            }

            return PartialView("Beneficiarios", model); // Retorna a view parcial
        }

        [HttpPost]
        public JsonResult IncluirOuAlterarBeneficiario(BeneficiarioModel beneficiarioModel)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var cpfJaRegistrado = false;
                
                cpfJaRegistrado = boBeneficiario.VerificarExistenciaCPFBeneficiario(beneficiarioModel.Id, beneficiarioModel.CPF, beneficiarioModel.IdCliente);                

                if (cpfJaRegistrado)
                {
                    Response.StatusCode = 400;
                    return Json("O CPF fornecido já está registrado.");
                }

                beneficiarioModel.Id = boBeneficiario.IncluirOuAlterarBeneficiario(new Beneficiario()
                {                    
                    Id = beneficiarioModel.Id,
                    Nome = beneficiarioModel.Nome,                                        
                    CPF = beneficiarioModel.CPF,
                    IdCliente = beneficiarioModel.IdCliente
                });

                var htmlTabela = RetornarBeneficiarios(beneficiarioModel.IdCliente);
                
                return Json(new { message = "Cadastro efetuado com sucesso", htmlTabela }, JsonRequestBehavior.AllowGet);
            }           
        }

        [HttpPost]
        public JsonResult ExcluirBeneficiario(int idBeneficiario)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            var excluiuBeneficiario = boBeneficiario.ExcluirBeneficiario(idBeneficiario);

            if (!excluiuBeneficiario)
            {
                Response.StatusCode = 400;
                return Json(new { message = "Ocorreu um erro ao excluir o beneficiário.", excluirBeneficiario = false });
            }

            return Json(new { message = "Exclusão efetuada com sucesso", excluirBeneficiario = true }, JsonRequestBehavior.AllowGet);
            
        }

        public string RetornarBeneficiarios(long idCliente)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            List<Beneficiario> beneficiario = boBeneficiario.Listar(idCliente).ToList();

            List<BeneficiarioModel> model = new List<BeneficiarioModel>();

            if (beneficiario != null)
            {
                foreach (var dado in beneficiario)
                {
                    var beneficiarios = new BeneficiarioModel
                    {
                        Id = dado.Id,
                        Nome = dado.Nome,
                        CPF = dado.CPF,
                        IdCliente = dado.IdCliente
                    };

                    model.Add(beneficiarios);
                };
            }

            var htmlTabela = RenderRazorViewToString(this, "Beneficiarios", model);

            return htmlTabela;
        }

        public string RenderRazorViewToString(Controller controller, string viewName, object model)
        {

            controller.ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData, controller.TempData, sw);
                viewResult.View.Render(viewContext, sw);
                return sw.GetStringBuilder().ToString();
            }
        }

    }
}