GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;

GO
PRINT N'Creating Table [dbo].[Administrators]...';


GO
CREATE TABLE [dbo].[Administrators] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (256) NOT NULL,
    [Email]    NVARCHAR (256) NOT NULL,
    [Phone]    NVARCHAR (256) NOT NULL,
    [Password] NVARCHAR (256) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Unique_Email] UNIQUE ([Email])
);


GO
PRINT N'Update complete.';


GO
