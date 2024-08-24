import React from "react";
import { useLocation } from "react-router-dom";

const ViewPDF = () => {
  const location = useLocation();
  const { pdfUrl } = location.state || {};

  return (
    <div>
      <h1>QRコードPDF</h1>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="QRコードPDF"
        ></iframe>
      ) : (
        <p>PDFデータがありません。</p>
      )}
    </div>
  );
};

export default ViewPDF;
