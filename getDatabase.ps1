
$zipfile = "aw.zip"
$DestinationZip = "."


$web = new-object net.webclient
$web.DownloadFile( 'http://download-codeplex.sec.s-msft.com/Download/Release?ProjectName=msftdbprodsamples&DownloadId=880661&FileTime=130507138100830000&Build=21031', $zipfile)

$web.Dispose()




Add-Type -assembly "system.io.compression.filesystem"

[io.compression.zipfile]::ExtractToDirectory($zipfile, $destinationZip)


md testvarie\App_Data

sqllocaldb c tmp -s


&"C:\Program Files\Microsoft SQL Server\110\Tools\Binn\sqlcmd.exe" -E -S "(localdb)\tmp"  -v "currentFolder=`"$pwd`"" -Q `
 "RESTORE DATABASE AdventureWorks2014 FROM DISK='`$(currentFolder)\AdventureWorks2014.bak' WITH MOVE 'AdventureWorks2014_data' TO '`$(currentFolder)\testVarie\app_data\adventureWorks2014_data.mdf', MOVE 'AdventureWorks2014_log' TO '`$(currentFolder)\testVarie\app_data\adventureWorks2014_log.ldf', REPLACE"


sqllocaldb p tmp

sqllocaldb d tmp
