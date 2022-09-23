import React, { useEffect, useRef } from "react";

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      console.log('PSPDFKit',PSPDFKit);
      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }
      let docUrl = "https://vslfileupload.s3.amazonaws.com/usercontent/626f6f85520ef2c9abc87ce1/images/document.pdf";
      // let docBlob = fetch(docUrl).then(e => e.blob());
      // let documentBlobObjectUrl = URL.createObjectURL(docBlob);
      await PSPDFKit.load({
        container,
        document: docUrl,
        // document: "/document.pdf",
        // baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
      <div className="containerEl" ref={containerRef} style={{ height: "100vh" }} />
  );
}