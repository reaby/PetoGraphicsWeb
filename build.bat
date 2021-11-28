
:: Build client
cd client
call npm install
call npm run build
cd ..

:: Create dist
Xcopy /E /I server dist /EXCLUDE:buildExclude.txt
move client\build dist\client
cd dist
call npm install --only=prod

:: Create executable
call nexe bundle.js -b -o PetoGraphicsWeb.exe --ico ..\client\public\Icon.ico
cd ..
