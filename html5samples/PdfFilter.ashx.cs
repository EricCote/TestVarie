using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace TestVarie
{
    /// <summary>
    /// Summary description for PdfFilter
    /// </summary>
    public class PdfFilter : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            string url = context.Request.Params["pdfUrl"];


            WebClient wc = new WebClient();
            byte[] contenu = wc.DownloadData(url);

            context.Response.ContentType = "application/pdf";

            context.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            context.Response.AppendHeader("Pragma", "no-cache"); // HTTP 1.0.
            context.Response.AppendHeader("Expires", "0"); // Proxies.

            context.Response.OutputStream.Write(contenu,0,contenu.Length);
            context.Response.Flush();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}