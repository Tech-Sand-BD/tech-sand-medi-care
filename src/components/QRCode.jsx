import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

// eslint-disable-next-line react/prop-types
export function QRCodeComponent({ data, size = 64 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        data,
        {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [data, size]);

  return <canvas ref={canvasRef} className="bg-white" />;
}