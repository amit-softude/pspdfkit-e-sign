import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function pdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(params) {
    let numPages = params.numPages;
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="https://amit-softude.github.io/dummy.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default pdfViewer;
