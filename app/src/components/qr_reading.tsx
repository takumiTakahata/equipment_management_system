import jsQR from "jsqr";
import React, { useRef, useState, useEffect, useCallback, FC } from "react";
import "./qr_reading.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
type Props = {};
const Inventory: FC<Props> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState("");
  const [qrresult, setQrresult] = useState<string[]>(() => {
    const savedQrresult = localStorage.getItem("qrresult");
    return savedQrresult ? JSON.parse(savedQrresult) : [];
  });
  const [error, setError] = useState("");
  const isInitialMount = useRef(true); // 初回実行を制御するためのuseRef
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const scanQrCode = useCallback(() => {
    setOpen(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCodeData = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (qrCodeData) {
          console.log(qrCodeData.data);
          if (!qrresult.includes(qrCodeData.data)) {
            localStorage.setItem("qrresult", JSON.stringify(qrCodeData.data));
            navigate("/lending_request");
            return;
          } else {
            console.log("読めません");
          }
        }
        setTimeout(scanQrCode, 100);
      }
    }
  }, []);
  const handleClose = () => {
    localStorage.removeItem("qrresult");
    setQrresult([]);
    setOpen(false);
  };
  const continueRead = () => {
    console.log("押された");
    setQrresult((prevQrresult) => {
      const newQrresult = [...prevQrresult, result];
      localStorage.setItem("qrresult", JSON.stringify(newQrresult));
      return newQrresult;
    }); // 配列に新しい要素を追加
    console.log("処理終わり");
    setResult(""); // 結果をリセット
    setOpen(false); // ダイアログを閉じる
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 3840 },
        height: { ideal: 2160 },
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            scanQrCode();
          };
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  };
  useEffect(() => {
    if (!isInitialMount.current) return;
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 3840 },
        height: { ideal: 2160 },
      },
    };
    let stream: MediaStream;
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            scanQrCode();
          };
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));
    isInitialMount.current = false; // 初回実行を記録
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [scanQrCode]);
  return (
    <div id="inventory">
      {!result && (
        <div className="qr_display">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="reading_video"
          />
          <canvas ref={canvasRef} className="canvas" />
          {/* <p>
            {qrresult.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </p> */}
        </div>
      )}
      {result && (
        <div className="flex justify-center">
          <Dialog open={open} onClose={handleClose}>
            <DialogActions>
              <button onClick={continueRead}>続けて読む</button>
              <button onClick={handleClose}>終了する</button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {error && <p className="text-center text-xs text-red-500">{error}</p>}
    </div>
  );
};
export default Inventory;
