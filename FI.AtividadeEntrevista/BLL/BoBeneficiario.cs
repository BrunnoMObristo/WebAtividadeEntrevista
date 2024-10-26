using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public List<DML.Beneficiario> Listar(long idCliente)
        {
            DAL.Beneficiarios.DaoBeneficiario ben = new DAL.Beneficiarios.DaoBeneficiario();
            return ben.Listar(idCliente);
        }

        public bool VerificarExistenciaCPFBeneficiario(long id, string CPF, long idCliente)
        {
            DAL.Beneficiarios.DaoBeneficiario ben = new DAL.Beneficiarios.DaoBeneficiario();
            return ben.VerificarExistenciaCPFBeneficiario(id, CPF, idCliente);
        }

        public long IncluirOuAlterarBeneficiario(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario ben = new DAL.Beneficiarios.DaoBeneficiario();
            return ben.IncluirOuAlterarBeneficiario(beneficiario);
        }

        public bool ExcluirBeneficiario(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario ben = new DAL.Beneficiarios.DaoBeneficiario();
            return ben.ExcluirBeneficiario(id);
        }

    }
}
