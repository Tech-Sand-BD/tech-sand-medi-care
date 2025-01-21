const PrescriptionWrite = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5 p-5">
        <img src="/clinic-logo.png" alt="" className="w-32 h-3w-32" />
        <div>
          <h1 className="text-[20px] font-medium">Doctor Name</h1>
          <h2 className="font-medium">Chamber Name</h2>
          <h3 className="text-[16px]">Address</h3>
          <p className="text-[12px]">Mb. 0XXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionWrite;
