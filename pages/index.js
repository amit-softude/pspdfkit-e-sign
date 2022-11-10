import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';

export default function App() {
  const containerRef = useRef(null);

  let [pdfUrl, setPdfUrl] = useState("https://amit-softude.github.io/dummy.pdf");
  let [urlValue, setUrlValue] = useState("https://amit-softude.github.io/dummy.pdf");
  let [selectedOption, setSelectedOption] = useState(null);


  const options = [
    { value: 'https://amit-softude.github.io/dummy.pdf', label: 'https://amit-softude.github.io/dummy.pdf' },
    { value: 'https://amit-softude.github.io/dummy2.pdf', label: 'https://amit-softude.github.io/dummy2.pdf' },
    { value: 'https://amit-softude.github.io/example.pdf', label: 'https://amit-softude.github.io/example.pdf' },
  ];

  useEffect(() => {

    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      console.log('PSPDFKit',PSPDFKit);
      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }
      await PSPDFKit.load({
        container,
        document: pdfUrl,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      }).then(instance => {
        let items = instance.toolbarItems;
        console.log('PSPDFKit instance', instance)
        let filteredItems = items.filter(item => {
          if(item.type === 'signature'){
            return item;
          }          
          if(item.type === 'export-pdf'){
            return item;
          }          
          if(item.type === 'search'){
            return item;
          }
        } )
        console.log('filteredItems', filteredItems);
        instance.setToolbarItems(filteredItems);
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [pdfUrl]);

  const loadPdf = (e) => {
    e.preventDefault();

    setPdfUrl(urlValue);
    setSelectedOption({value: urlValue, label: urlValue})

  }  
  const handleSelectedOption = (option) => {
    console.log('handleSelectedOption', option.value);
    setSelectedOption(option)
    setPdfUrl(option.value);
    setUrlValue(option.value);
  }
  
  return (
    <>
      <input type="text" value={urlValue} onChange={e => setUrlValue(e.target.value)} style={{width: "400px", height: "30px"}}/>
      <button style={{width: "100px", height: "30px"}} onClick={loadPdf}>Load</button>
      <Select
        defaultValue={selectedOption}
        onChange={handleSelectedOption}
        options={options}
      />
      <br />
      <br />
      <br />
      <div className="containerEl" ref={containerRef} style={{ height: "100vh" }} />
    </>
  );
}
