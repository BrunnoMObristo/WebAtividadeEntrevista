$(document).ready(function () {    

    $('#cpfBeneficiario').mask('000.000.000-00');    

    $('#btnAddBeneficiario').on("click", function (e) {

        const nomeBeneficiario = $("#nomeBeneficiario").val();
        const cpfBeneficiario = $("#cpfBeneficiario").val();
        const idBeneficiario = $('#idBeneficiario').val();
        const idCliente = $('#idCliente').val();

        if (!validarCPF(cpfBeneficiario)) {
            
            ModalDialog("Erro!", "O CPF fornecido esta invalido.");
            e.preventDefault();
            return; 
        }
        
        e.preventDefault();

        $.ajax({
            url: urlPostBeneficiario,
            method: "POST",
            data: {
                "Id": idBeneficiario || 0,
                "Nome": nomeBeneficiario,
                "CPF": cpfBeneficiario.replace(/[\.,-]/g, ''),
                "IdCliente": idCliente
            },
            success: function (r) {                
                
                ModalDialog("Sucesso!", r.message);
                var newTBody = $(r.htmlTabela).find('tbody').html();
                $('#beneficiariosListagem').html(newTBody); // Atualiza a tabela com o HTML recebido
                AplicarMascaraCPF();
                $('#idBeneficiario').val('');
                $("#formAddBeneficiario")[0].reset();
            },
            error: function (r) {
                if (r.status == 400) {
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                } else if (r.status == 500) {
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                }
            }
        });
    });
    
})

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{2})$/, '$1-$2');
}

function AplicarMascaraCPF() {    
    $('.listagem-cpf-beneficiario').each(function () {
        var cpf = $(this).text(); // Pega o texto do elemento
        $(this).text(formatarCPF(cpf)); // Aplica a formatação e atualiza o texto
    });
}

$('#beneficiariosModal').on('show.bs.modal', function () {
    AplicarMascaraCPF();
});

function editarBeneficiario(idBeneficiario, nome, cpf) {
    $('#idBeneficiario').val(idBeneficiario);
    $('#nomeBeneficiario').val(nome);
    $('#cpfBeneficiario').val(formatarCPF(cpf));
}

function excluirBeneficiario(idBeneficiario) {

    $.ajax({
        url: urlExcluirBeneficiario,
        method: "POST",
        data: {
            "idBeneficiario": idBeneficiario,
        },
        success: function (r) {
            ModalDialog("Sucesso!", r.message);
            
            if (r.excluirBeneficiario == true) {
                $('#beneficiariosListagem tr').find('input[value="' + idBeneficiario + '"]').closest('tr').remove()
            }
            $("#formAddBeneficiario")[0].reset();
        },
        error: function (r) {
            if (r.status == 400) {
                ModalDialog("Ocorreu um erro", r.responseJSON);
            } else if (r.status == 500) {
                ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            }
        }
    });
}



function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    titulo = titulo.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    texto = texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");


    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                             ';

    $('body').append(texto);
    $('#' + random).modal('show');
}