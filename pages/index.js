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
      let docUrl = "https://amit-softude.github.io/dummy.pdf";
      await PSPDFKit.load({
        container,
        document: docUrl,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
      <div className="containerEl" ref={containerRef} style={{ height: "100vh" }} />
  );
}
