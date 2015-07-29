

function Replace-Text($filetype, $FindText, $ReplaceText)
{
Get-ChildItem $filetype -recurse -file  | 
  ForEach-Object {  (Get-Content $_) -replace
                      $FindText,
                      $ReplaceText | 
                      Set-Content -path $_ 
                 }
}


Get-ChildItem *   -recurse | Where-Object {$_.Attributes -ne "Directory"}  |
    ForEach-Object {  
                    $_.IsReadOnly=$false 
                   }

Replace-Text *.csproj "System.Web.Mvc, Version=3.0.0.0" `
                      "System.Web.Mvc, Version=4.0.0.0"


Replace-Text web.config  "System.Web.Mvc, Version=3.0.0.0"  `
                         "System.Web.Mvc, Version=4.0.0.0"

Replace-Text web.config  "System.Web.Helpers, Version=1.0.0.0"  `
                         "System.Web.Helpers, Version=2.0.0.0"

Replace-Text web.config  "System.Web.WebPages, Version=1.0.0.0"  `
                         "System.Web.WebPages, Version=2.0.0.0"


Replace-Text *.css  "flexbox"  `
                    "flex"


Replace-Text *.css  "column-count: 3;"  `
                    @"
-webkit-column-count: 3;
                    column-count: 3;                        
"@

Replace-Text *.css  "column-gap: 5rem;"  `
                    @"
-webkit-column-gap: 5rem;
                    column-gap: 5rem;                        
"@


Replace-Text *.css  "display: box;" "display: flex;"
Replace-Text *.css  "box-flex:" "flex:"
Replace-Text *.css  "flex-pack: center;" "justify-content: center;"
Replace-Text *.css  "box-align: center;" "align-items: center;"

Replace-Text *.css "linear-gradient\(top" `
                   "linear-gradient(to bottom"