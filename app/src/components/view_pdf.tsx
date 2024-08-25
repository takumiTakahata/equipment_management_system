import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";

const ViewPDF = () => {
  const location = useLocation();
  const { pdfUrl } = location.state || {};

  return (
    <div>
      <Header />
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
