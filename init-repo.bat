@echo off
chcp 65001 >nul
echo ==========================================
echo   2026年政策文件汇编 - GitHub仓库初始化
echo ==========================================
echo.

set /p username=请输入GitHub用户名: 
set /p repo=请输入仓库名称(默认: policy-assembly-2026): 
if "%repo%"=="" set repo=policy-assembly-2026

echo.
echo 正在初始化Git仓库...
git init

echo.
echo 正在添加文件...
git add .

echo.
echo 正在提交代码...
git commit -m "Initial commit: 2026年政策文件汇编"

echo.
echo 正在添加远程仓库...
git remote add origin https://github.com/%username%/%repo%.git

echo.
echo 正在推送代码...
git branch -M main
git push -u origin main

echo.
echo ==========================================
echo 代码已推送到GitHub!
echo 仓库地址: https://github.com/%username%/%repo%
echo.
echo 下一步:
echo 1. 访问 https://github.com/%username%/%repo%/settings/pages
echo 2. Source 选择 "GitHub Actions"
echo 3. 等待部署完成
echo ==========================================
pause
