import { Stethoscope } from "lucide-react";
import { QRCodeComponent } from "./QRCode";
import PrescriptionWrite from "./PrescriptionWrite";
import PrePrescription from "./PrePrescription";

function Prescription({ docInfo }) {
  const doctorInfo = {
    name: docInfo.name,
    qualifications: docInfo.degree,
    regNo: docInfo.regNo,
    chamber: docInfo.address.line1,
    address: `${docInfo.address.line1}, ${docInfo.address.line2}`,
    contact: docInfo.phone,
    hours: docInfo.hours,
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

  const printWithoutHeaderFooter = () => {
    const content = document.querySelector(".w-full.max-w-4xl.bg-white.shadow-lg.p-8").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const printWithHeaderFooter = () => {
    const content = document.querySelector(".prescription").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

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
              <p>Specialist in {docInfo.speciality}</p>
              <p>Reg. No: {doctorInfo.regNo}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Stethoscope className="w-12 h-12 text-indigo-800" />
            <img
              src=""
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

        <div className="prescription">
          <PrePrescription />
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
        <div className="p-4 flex justify-end space-x-4">
          <button
            onClick={printWithoutHeaderFooter}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Print Without Header/Footer
          </button>
          <button
            onClick={printWithHeaderFooter}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Print With Header/Footer
          </button>
        </div>
      </div>


    </div>
  );
}

export default Prescription;
