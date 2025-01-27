import { Stethoscope } from "lucide-react";
import { QRCodeComponent } from "./QRCode";
import PrescriptionWrite from "./PrescriptionWrite";
import PrePrescription from "./PrePrescription";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center lg:p-8 lg:my-4">
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

        <div>
          <PrePrescription/>
        </div>
        

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
