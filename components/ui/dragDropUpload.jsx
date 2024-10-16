'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { File } from 'lucide-react';
import { SlCloudUpload } from "react-icons/sl";

const DragDropUpload = ({ acceptedFormats, isMultiple, label, onChange }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
      if (onChange) {
        onChange(acceptedFiles); // Notify parent component
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    multiple: isMultiple
  });

  useEffect(() => {
    if (onChange) {
      onChange(files);
    }
  }, [files, onChange]);

  return (
    <div className="w-full mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-14 text-center cursor-pointer transition-colors text-brand-olive-green
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-brand-olive-green hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <SlCloudUpload size={40} className='mx-auto' />
        <h2 className="mt-2 text-lg font-semibold ">{label}</h2>
        {files.length > 0 && (
          <div className="mt-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-center text-xl font-bold ">
                <File className="mr-2 h-4 w-4" />
                {file.name} is selected
              </div>
            ))}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-600">Drag & Drop or Browse</p>
      </div>
    </div>
  );
};

export default DragDropUpload;
