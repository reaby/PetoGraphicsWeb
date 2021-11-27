
:: Build client
cd client
call npm install
call npm run build
cd ..

:: Create executable
Xcopy /E /I server dist /EXCLUDE:buildExclude.txt
move client\build dist\client
cd dist
call npm install --only=prod
call nexe index.js -b -o PetoGraphicsWeb.exe --ico ..\client\public\Icon.ico
cd ..
