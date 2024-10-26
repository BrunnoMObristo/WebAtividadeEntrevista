IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_IncAltBeneficiario')
BEGIN
    DROP PROC FI_SP_IncAltBeneficiario
END
GO

CREATE PROCEDURE FI_SP_IncAltBeneficiario
    @Id INT,
    @Nome VARCHAR(100),
    @CPF VARCHAR(11),
    @IdCliente INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id = 0
    BEGIN
        INSERT INTO BENEFICIARIOS(NOME, CPF, IDCLIENTE)
        VALUES (@Nome, @CPF, @IdCliente);
        
        -- Retorna o ID do novo beneficiário
        SELECT SCOPE_IDENTITY() AS IdBeneficiario;
    END
    ELSE
    BEGIN
        UPDATE BENEFICIARIOS
        SET NOME = @Nome, CPF = @CPF
        WHERE ID = @Id;

        -- Retorna o ID do beneficiário atualizado
        SELECT @Id AS IdBeneficiario;
    END
END
GO