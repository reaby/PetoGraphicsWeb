echo Building project...

:: Client
echo Building client...
cd client
call npm install
call npm run build

:: Server
echo Building server...
cd ../server
call npm install
call nexe index.js -b -o PetoGraphicsWeb.exe --ico ..\client\public\Icon.ico

:: Dist
cd ..
echo Creating distribution...
rmdir /s /q dist
Xcopy /E /I server dist
move client\build dist\client

:: Cleanup
rmdir /s /q dist\configs
del dist\.gitignore
del dist\.eslintrc.json
del dist\Icon.ico
