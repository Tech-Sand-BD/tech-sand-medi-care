import { Stethoscope } from "lucide-react";
import { QRCodeComponent } from "./QRCode";
import PrescriptionWrite from "./PrescriptionWrite";

function Prescription() {
  const doctorInfo = {
    name: "Dr.Emily Larsen",
    qualifications: "MBBS, MD (Gynecologist)",
    regNo: "A12345",
    chamber: "Medical Center",
    address: "123 Medical Street, City",
    contact: "+1 234-567-8900",
    hours: "Mon-Fri: 10:00 AM - 8:00 PM",
  };

  // Create a string with doctor's info for QR code
  const qrCodeData = JSON.stringify({
    doctor: doctorInfo.name,
    qualifications: doctorInfo.qualifications,
    regNo: doctorInfo.regNo,
    contact: doctorInfo.contact,
    chamber: doctorInfo.chamber,
    address: doctorInfo.address,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 my-4">
      <div className="w-full max-w-4xl bg-white shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-indigo-800">
              {doctorInfo.name}
            </h1>
            <div className="text-sm text-gray-600">
              <p>{doctorInfo.qualifications}</p>
              <p>Specialist in Cardiology and Medicine</p>
              <p>Reg. No: {doctorInfo.regNo}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Stethoscope className="w-12 h-12 text-indigo-800" />
            <img
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=64&h=64"
              alt="Hospital Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <label className="text-gray-600">Name:</label>
            <div className="border-b border-gray-300"></div>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Age:</label>
            <div className="border-b border-gray-300"></div>
          </div>
          <div className="space-y-1">
            <label className="text-gray-600">Date:</label>
            <div className="border-b border-gray-300"></div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-6">
            <div>
              <h2 className="font-bold mb-2">Clinical Complaints:</h2>
              <div className="border-b border-gray-300 h-32"></div>
            </div>

            <div>
              <h2 className="font-bold mb-2">Risk Factors:</h2>
              <ul className="space-y-1 text-sm">
                <li>O/E-</li>
                <li>Pulse-</li>
                <li>BP-</li>
                <li>Heart-</li>
                <li>Lung-</li>
                <li>Others-</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold mb-2">Investigations:</h2>
              <ul className="text-sm space-y-1">
                <li>ECG, CXR (P/A)</li>
                <li>Echo 2D/Doppler</li>
                <li>CBC, RBS, S. TSH</li>
                <li>S. Creatine, HbA1C</li>
              </ul>
            </div>
          </div>

          <div className="col-span-8">
            <div className="border rounded-md border-gray-200">
              <PrescriptionWrite />
              {/* <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 border-r text-sm">Medicine</th>
                    <th className="p-2 border-r text-sm">Morning</th>
                    <th className="p-2 border-r text-sm">Noon</th>
                    <th className="p-2 border-r text-sm">Night</th>
                    <th className="p-2 border-r text-sm">Before</th>
                    <th className="p-2 text-sm">After</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 border-r">&nbsp;</td>
                      <td className="p-2 border-r">&nbsp;</td>
                      <td className="p-2 border-r">&nbsp;</td>
                      <td className="p-2 border-r">&nbsp;</td>
                      <td className="p-2 border-r">&nbsp;</td>
                      <td className="p-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-right">
          __ Day / Week / Month later revisit
        </p>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t flex justify-between items-end">
          <div className="text-sm text-gray-600">
            <p>Chamber: {doctorInfo.chamber}</p>
            <p>Address: {doctorInfo.address}</p>
            <p>Contact: {doctorInfo.contact}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm text-gray-600">
              <p>Visit Hours:</p>
              <p>{doctorInfo.hours}</p>
            </div>
            <div className="w-16 h-16 bg-white p-1 border border-gray-200">
              <QRCodeComponent data={qrCodeData} size={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
