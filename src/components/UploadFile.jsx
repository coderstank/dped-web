import React from "react";
import { Button, message } from "antd";
import { UploadOutlined, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";

function UploadFile({
  file = "",
  setFile,
  type,
  id,
  showFile = true,
  meta = null,
}) {
  const onSelectFile = () => {
    const input = document.getElementById("file");
    input.click();
    input.onchange = async (e) => {
      const files = e.target.files;

      if (!validateFile(files)) {
        e.target.value = null;
        return;
      }
      // const targetWidth = meta.width * 96; // Convert cm to pixels assuming 1 inch = 96 pixels
      // const targetHeight = meta.height * 96; // Convert cm to pixels assuming 1 inch = 96 pixels

      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = async () => {

        try {
          const formData = new FormData();
          formData.append("type", type);
          formData.append("id",new Date().getTime().toString());
          formData.append("file", files[0]);

          const {
            data: {
              data: { location },
            },
          } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          message.success("File uploaded successfully");
          e.target.value = null;
          setFile(`${location}?${performance.now()}`);
        } catch (error) {
          console.log(error);
          message.error("something went wrong");
          setFile("");
        }
      };
    };
  };

  /**
   * Validates the selected file based on the provided metadata.
   * @param {Array<File>} files - The selected file(s) to be validated.
   * @returns {boolean} - Returns true if the file(s) pass the validation, otherwise false.
   */
  const validateFile = ([file]) => {
    const isFileTypeCorrect = meta?.fileTypes.includes(file.type);
    const fileSizeInKB = file.size / 1000;
    const isFileSizeCorrect =
      fileSizeInKB >= meta?.minSize && fileSizeInKB <= meta?.maxSize;
    if (!isFileTypeCorrect) {
      message.error(
        `File type must be ${meta?.fileTypes
          .map((t) => t.split("/")[1])
          .join(", ")}`
      );
      return false;
    }
    if (meta?.minSize && meta?.maxSize && !isFileSizeCorrect) {
      message.error(
        `File size must be between ${meta?.minSize} and ${meta?.maxSize} KB`
      );
      return false;
    }
    if (meta?.maxSize && meta.maxSize < fileSizeInKB) {
      message.error(`File size must be less than ${meta?.maxSize} KB`);
      return false;
    }
    return true;
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        // accept={meta?.fileTypes.map((f) => `.${f.split("/")[1]}`).join(",")}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button icon={<UploadOutlined />} onClick={onSelectFile}>
          Upload
        </Button>
        {file && showFile && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a download href={file} target="_self">
              view
            </a>
            <DeleteTwoTone onClick={() => setFile("")} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
