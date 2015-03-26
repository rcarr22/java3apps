@echo off
cd source
javac *.java -d ..\classes
if not %errorlevel%==0 goto CompileError 
echo Great, no Compiler errors!
cd ..\classes
::
del Main.jar
jar -cvmf manifest.mf Main.jar *.class img
if %errorlevel%==0 goto Pause
echo.
echo Probably a JAR error occured!
echo Press any key to retrun and fix...
pause > nul
goto end
::
:CompileError
echo.
echo Probably a Bad Compile!
echo Press any key to retrun and fix...
pause > nul
goto end
:Pause
echo press key of click exit
pause > nul
goto end
:end
cd source
exit