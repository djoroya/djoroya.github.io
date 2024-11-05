@REM  remove dist folder
rmdir /s /q docs

@REM copy dist folder to astro
xcopy /s /e dist docs

@REM remove dist folder
rmdir /s /q dist