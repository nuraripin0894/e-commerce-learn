import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  console.log("file", file);
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="text-2xl">File Upload Title</h1>
      <label htmlFor="fileinput" className="mt-5 mb-1 ">
        Image Preview
      </label>
      <img src={base64Image} className="h-64 w-64 my-2" />
      <input
        type="file"
        name="fileinput"
        accept="image/*"
        className="bg-blue-500 border border-gray-900 shadow-sm shadow-slate-800 rounded-md ring-1 ring-gray-500"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = (onloadendEvent) => {
            setBase64Image(onloadendEvent.target.result);
          };

          reader.readAsDataURL(file);
          setFile(file);
        }}
      />
    </div>
  );
}

export default FileUpload;
