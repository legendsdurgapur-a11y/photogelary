Set oShell = CreateObject("WScript.Shell")
Set oFSO = CreateObject("Scripting.FileSystemObject")

Dim scriptDir
scriptDir = oFSO.GetParentFolderName(WScript.ScriptFullName)

Dim nodeExe, serverJs
nodeExe = "C:\Photo gallery(REACT)\.nodejs\node.exe"
serverJs = scriptDir & "\backend\server.js"

' Check files exist
If Not oFSO.FileExists(nodeExe) Then
    MsgBox "ERROR: node.exe not found at:" & vbNewLine & nodeExe, 16, "LUMINA - Error"
    WScript.Quit 1
End If

If Not oFSO.FileExists(serverJs) Then
    MsgBox "ERROR: server.js not found at:" & vbNewLine & serverJs, 16, "LUMINA - Error"
    WScript.Quit 1
End If

' Start server in a visible cmd window
Dim cmd
cmd = "cmd /k """ & nodeExe & """ """ & serverJs & """"
oShell.Run cmd, 1, False

' Wait 3 seconds for server to start
WScript.Sleep 3000

' Open browser
oShell.Run "http://localhost:5000", 1, False

MsgBox "LUMINA Gallery is running!" & vbNewLine & vbNewLine & _
       "Website: http://localhost:5000" & vbNewLine & _
       "API:     http://localhost:5000/api/photos" & vbNewLine & vbNewLine & _
       "Close the black server window to stop.", 64, "LUMINA Gallery"

