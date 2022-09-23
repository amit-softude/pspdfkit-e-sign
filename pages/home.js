import React, {useRef, useEffect}  from 'react'
import WebViewer from '@pdftron/pdfjs-express';

const Home = () => {
    const viewer = useRef(null);
  
    useEffect(() => {
        let docUrl = "https://vslfileupload.s3.amazonaws.com/usercontent/626f6f85520ef2c9abc87ce1/images/document.pdf";
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: docUrl,
        },
        viewer.current,
      ).then((instance) => {
  
        });
    }, []);
  
    return (
      <div className="MyComponent">
        <div className="header">React sample</div>
        <div className="webviewer" ref={viewer}></div>
      </div>
    );
  };
  
  export default Home;