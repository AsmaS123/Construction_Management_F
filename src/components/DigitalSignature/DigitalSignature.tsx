import React, { useRef, useState } from "react";
import styles from "./DigitalSignature.module.css";
import SignatureCanvas from "react-signature-canvas";
import { BorderAll } from "@mui/icons-material";

interface DigitalSignatureProps {}

const DigitalSignature = (props: any) => {
  const sigCanvas: any = useRef({});
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    if (!sigCanvas.current.isEmpty()) {
      // debugger
      setTrimmedDataURL(sigCanvas.current.getCanvas().toDataURL("image/png"));
      props.handleClientSignature(
        sigCanvas.current.getCanvas().toDataURL("image/png"),
      );
    } else {
      alert("Please sign before saving.");
    }
  };

  return (
    <>
      {!trimmedDataURL && (
        <>
          <div style={{ border: "2px solid gray", borderRadius: "2px" }}>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="green"
              canvasProps={{ width: 250, height: 100, className: "sigCanvas" }}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Save</button>
          </div>
        </>
      )}
      {trimmedDataURL && (
        <div>
          {/* <h3>Saved Signature:</h3> */}
          <img
            src={trimmedDataURL}
            alt="Signature"
            style={{ border: "1px solid #000", width: 200, height: 100 }}
          />
        </div>
      )}
    </>
  );
};

export default DigitalSignature;
