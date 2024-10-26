﻿
$(document).ready(function () {
    $('#formCadastro #CPF').mask('000.000.000-00');

    //Brunno Martyres Obristo:
    //Há duas aproximações nesse caso:
    //1 - O usuário quer adicionar os beneficiários logo após incluir o cliente, então o formulário deveria manter todos os dados carregados (inclusive o ID gerado).
    //2 - O usuário quer adicionar mais clientes logo após o primeiro cadastro, então o formulário deve ser limpo para o novo cadastro.
    //As duas fazem sentido, mas utilizei a segunda aproximação, pois faz mais sentido para mim, dessa forma, os beneficiários 
    //podem ser cadastrados ao entrar na tela de alteração do cliente.
    if (acao == 'Incluir') {
        $('#abrirBeneficiarios').hide()
    }

    $('#formCadastro').submit(function (e) {
        
        // Validação do CPF
        if (!validarCPF($('#formCadastro #CPF').val())) {
            ModalDialog("Erro!", "O CPF fornecido está inválido.");
            e.preventDefault(); // Impede o envio do formulário
            return; // Saia da função se o CPF for inválido
        }

        // Se o CPF for válido, continue com o envio do formulário
        e.preventDefault(); // Impede o comportamento padrão
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val().replace(/[\.,-]/g, '')
            },
            error: function (r) {
                if (r.status == 400) {
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                } else if (r.status == 500) {
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                }
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
                $("#formCadastro")[0].reset();
            }
        });
    });
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
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