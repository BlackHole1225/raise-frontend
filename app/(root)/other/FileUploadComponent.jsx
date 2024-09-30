import React from 'react';

const FileUploadComponent = () => {
  return (
    <section className="font-bold rounded-md max-w-[508px] text-zinc-800">
      <div className="flex flex-col justify-center items-center p-14 w-full rounded-md border border-dashed border-zinc-800">
        <figure className="flex flex-col items-center w-[153px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcbef75d12622dadccbb488bca8df3f3f10460dce3ec404b722200af59a32201?placeholderIfAbsent=true&apiKey=766be46e9945400fb0d82367510acded"
            alt="File icon"
            className="w-10 h-10"
          />
          <figcaption className="mt-2.5 text-xl text-center">
            &quot;a.png&quot; is selected
          </figcaption>
        </figure>
        <p className="mt-2.5 text-sm text-center">Drag & Drop or Browse</p>
      </div>
    </section>
  );
};

export default FileUploadComponent;
