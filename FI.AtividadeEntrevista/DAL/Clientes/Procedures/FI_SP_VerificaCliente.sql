IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_VerificaCliente')
BEGIN
    DROP PROC FI_SP_VerificaCliente
END
GO

CREATE PROC FI_SP_VerificaCliente
    @ID  BIGINT,
    @CPF VARCHAR(11)
AS
BEGIN
    SELECT 1 FROM CLIENTES WHERE CPF = @CPF AND ID <> @ID
END
GO
