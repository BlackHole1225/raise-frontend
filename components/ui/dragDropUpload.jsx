'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloud, File } from 'lucide-react';

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
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <Cloud className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-2 text-lg font-semibold text-gray-700">{label}</h2>
        <p className="mt-1 text-sm text-gray-500">Drag & Drop or Browse</p>
        {files.length > 0 && (
          <div className="mt-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <File className="mr-2 h-4 w-4" />
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropUpload;
