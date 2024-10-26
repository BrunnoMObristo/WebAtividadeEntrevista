IF OBJECT_ID('dbo.FI_SP_AltBenef', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.FI_SP_AltBenef;
END
GO

CREATE PROC FI_SP_AltBenef
    @NOME          VARCHAR(50),
    @CPF           VARCHAR(11),
    @ID            BIGINT
AS
BEGIN
    UPDATE BENEFICIARIOS 
    SET 
        CPF = @CPF,
        NOME = @NOME
    WHERE ID = @ID
END
GO