"use client";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

const PrescriptionWrite = () => {
  const [dataList, setDataList] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [isShow, setIsShow] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dataList")) || [];
    setDataList(savedData);
  }, []);

  // Save data to localStorage whenever dataList changes
  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(dataList));
  }, [dataList]);

  const handleAddMore = () => {
    setInputs([...inputs, { id: Date.now(), value: "" }]);
  };

  const handleInputChange = (id, value) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handleSave = (id) => {
    const inputToSave = inputs.find((input) => input.id === id);
    if (inputToSave && inputToSave.value.trim() !== "") {
      setDataList([...dataList, inputToSave.value]);
      setInputs(inputs.filter((input) => input.id !== id));
    }
  };

  const handleCancel = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleDelete = (index) => {
    const updatedData = [...dataList];
    updatedData.splice(index, 1);
    setDataList(updatedData);
  };

  const [value, setValue] = useState("No content added yet.");
  const [tempValue, setTempValue] = useState("");

  const handleSaveField = () => {
    setValue(tempValue);
    setIsShow(false);
  };

  const handleCancelFiled = () => {
    setTempValue(value);
    setIsShow(false);
  };

  const [isEditing, setEditing] = useState(false); // Controls visibility of textarea
  const [savedContent, setSavedContent] = useState("No content added yet."); // Stores saved data
  const [currentInput, setCurrentInput] = useState(""); // Temporary value for editing

  const saveContent = () => {
    setSavedContent(currentInput); // Save the temporary value
    setEditing(false); // Hide the textarea
  };

  const cancelEdit = () => {
    setCurrentInput(savedContent); // Reset to the saved value
    setEditing(false); // Hide the textarea
  };

  const [isVisible, setVisibility] = useState(false); // Controls the visibility of textarea and buttons
  const [storedValue, setStoredValue] = useState("No content available."); // Stores the saved value
  const [draftValue, setDraftValue] = useState(""); // Temporary value for editing

  const handleSaveClick = () => {
    setStoredValue(draftValue); // Save the temporary value
    setVisibility(false); // Hide textarea and buttons
  };

  const handleCancelClick = () => {
    setDraftValue(storedValue); // Revert to the saved value
    setVisibility(false); // Hide textarea and buttons
  };

  return (
    <div>
      <div className="grid border-b place-items-center lg:place-items-start grid-cols-1 lg:grid-cols-2 gap-5 p-2 lg:p-5">
        <img src="/clinic-logo.png" alt="" className="lg:w-32 lg:h-32 size-20 " />
        <div>
          <h1 className="text-[20px] font-medium">Doctor Name</h1>
          <h2 className="font-medium">Chamber Name</h2>
          <h3 className="text-[16px]">Address</h3>
          <p className="text-[12px]">Mb. 0XXXXXXXXX</p>
        </div>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div>
            <h1 className="bg-[#3CB371] font-semibold text-white  py-1 text-center text-2xl">
              Symptoms
            </h1>
            <div>
              {!isShow && (
                <div
                  onClick={() => {
                    setIsShow(true);
                    setTempValue(value);
                  }}
                  className="cursor-pointer mt-2 h-20 lg:h-40 p-2"
                >
                  <p>{value}</p>
                </div>
              )}

              {isShow && (
                <div className="transition-opacity duration-300 opacity-100">
                  <textarea
                    className="border outline-none p-2 w-full my-2"
                    rows="4"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveField}
                      className="bg-[#3CB371] text-white font-medium py-1 px-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelFiled}
                      className="bg-red-500 text-white font-medium py-1 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-5">
            <h1 className="bg-[#3CB371] font-semibold text-white py-1 text-center text-2xl">
              Tests
            </h1>
            <div>
              {/* Display saved content */}
              {!isEditing && (
                <div
                  onClick={() => {
                    setEditing(true);
                    setCurrentInput(savedContent); // Initialize textarea with saved content
                  }}
                  className="cursor-pointer p-2 mt-2 h-20 lg:h-40"
                >
                  <p>{savedContent}</p>
                </div>
              )}

              {/* Editable textarea and buttons */}
              {isEditing && (
                <div>
                  <textarea
                    className="border outline-none p-2 w-full my-2"
                    rows="4"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      onClick={saveContent}
                      className="bg-[#3CB371] text-white font-medium py-1 px-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-red-500 text-white font-medium py-1 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="bg-[#3CB371] font-semibold text-white py-1 text-center text-2xl">
              Advice
            </h1>
            <div>
              {/* Display saved value */}
              {!isVisible && (
                <div
                  onClick={() => {
                    setVisibility(true);
                    setDraftValue(storedValue); // Initialize draftValue with storedValue
                  }}
                  className="cursor-pointer p-2 mt-2 h-20 lg:h-40"
                >
                  <p>{storedValue}</p>
                </div>
              )}

              {/* Editable textarea and buttons */}
              {isVisible && (
                <div>
                  <textarea
                    className="border outline-none p-2 w-full my-2"
                    rows="4"
                    value={draftValue}
                    onChange={(e) => setDraftValue(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveClick}
                      className="bg-[#3CB371] text-white font-medium py-1 px-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-500 text-white font-medium py-1 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Rx</h1>
          <div className="mt-2">
            {/* Existing data */}
            {dataList.map((data, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-2 mb-2"
              >
                <p>{data}</p>
                <Trash
                  size={18}
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}

            {/* Input fields */}
            {inputs.map((input) => (
              <div key={input.id} className="border mt-4 px-2 py-2">
                <input
                  type="text"
                  className="border px-2 outline-none w-full py-1"
                  value={input.value}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-[#3CB371] text-white font-medium py-1 px-4"
                      onClick={() => handleSave(input.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white font-medium py-1 px-4"
                      onClick={() => handleCancel(input.id)}
                    >
                      Cancel
                    </button>
                  </div>
                  <Trash
                    size={18}
                    className="cursor-pointer"
                    onClick={() => handleCancel(input.id)}
                  />
                </div>
              </div>
            ))}

            {/* Add more button */}
            <p
              className="text-[14px] py-2 cursor-pointer"
              onClick={handleAddMore}
            >
              Click to add...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionWrite;
