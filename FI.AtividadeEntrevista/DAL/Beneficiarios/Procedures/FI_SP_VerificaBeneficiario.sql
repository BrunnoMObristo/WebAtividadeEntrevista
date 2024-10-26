IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_VerificaBeneficiario')
BEGIN
    DROP PROC FI_SP_VerificaBeneficiario
END
GO

CREATE PROC FI_SP_VerificaBeneficiario
    @ID         BIGINT,
    @CPF        VARCHAR(11),
    @IdCliente  BIGINT
AS
BEGIN
    SELECT 1 FROM BENEFICIARIOS WHERE CPF = @CPF AND ID <> @ID AND IDCLIENTE = @IdCliente
END
GO