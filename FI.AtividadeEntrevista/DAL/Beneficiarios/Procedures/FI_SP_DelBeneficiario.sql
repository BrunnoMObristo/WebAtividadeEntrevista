IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_DelBeneficiario')
BEGIN
    DROP PROC FI_SP_DelBeneficiario
END
GO

CREATE PROCEDURE FI_SP_DelBeneficiario
    @ID BIGINT,
    @Resultado INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM BENEFICIARIOS WHERE ID = @ID;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @Resultado = 0; -- Não excluiu
    END
    ELSE
    BEGIN
        SET @Resultado = 1; -- Excluiu com sucesso
    END
END
GO