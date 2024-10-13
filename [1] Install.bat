@echo off
chcp 65001 > nul
color A
title Lofy Clean
echo.
echo                   ----------------------------------------------------
echo                     Bem-vindo ao instalador do Lofy Clean       
echo                     Você está prestes a instalar todos os requisitos 
echo                   ----------------------------------------------------
echo.
echo.
pause nul
cls
color B

:: Instala os pacotes necessários usando npm
call npm install colors discord.js-selfbot-v11 axios
if %errorlevel% neq 0 (
    echo.
    echo Erro ao instalar os pacotes. Verifique se o Node.js está instalado corretamente.
    pause
    exit /b
)

cls
color C
echo.
echo                   ----------------------------------------------------
echo                     Prontinho! Agora você pode fechar o arquivo.
echo                   ----------------------------------------------------
echo.
pause nul
exit