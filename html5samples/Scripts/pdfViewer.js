/// <reference path="jquery-3.1.1.intellisense.js" />
/// <reference path="C:\code\TestVarie\TestVarie\PdfViewer.html" />

var listePdf = ["Doc/Doc1.pdf", "Doc/Doc2.pdf", "Doc/Doc3.pdf", "http://www.nyc.gov/html/nycppf/downloads/pdf/pension_sample_letter.pdf"]

$(function () {
    $("button").click(function () {
        console.log(this.id.substring(3, 4) - 1);
        var doc = listePdf[this.id.substring(3, 4) - 1];
        console.log(doc);


        var url = doc;

        //
        // Disable workers to avoid yet another cross-origin issue (workers need
        // the URL of the script to be loaded, and dynamically loading a cross-origin
        // script does not work).
        //
        //PDFJS.disableWorker = true;

        //
        // The workerSrc property shall be specified.
        //
        PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

        //
        // Asynchronous download PDF
        //
        PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
            //
            // Fetch the first page
            //
            pdf.getPage(1).then(function getPageHelloWorld(page) {
                var scale = 1.5;
                var viewport = page.getViewport(scale);

                //
                // Prepare canvas using PDF page dimensions
                //
                var canvas = document.getElementById('cvs');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                //
                // Render PDF page into canvas context
                //
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        });


        //var myEmbed = ifrm.contentDocument.getElementById("myEmbed");
        //var myEmbed2 = myEmbed.cloneNode;
        //myEmbed2.src = doc;
        //myEmbed.parentNode.replaceChild(myEmbed2, myEmbed);


       
        //ifrm.src = doc;
        //ifrm.contentDocument.location = doc;
    });
});