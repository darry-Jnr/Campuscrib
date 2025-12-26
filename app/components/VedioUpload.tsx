"use client";

import { CldUploadWidget } from "next-cloudinary";
import { MdVideoLibrary, MdCheckCircle } from "react-icons/md"; // Added a success icon

interface VideoUploadProps {
  onChange: (url: string) => void;
  value: string; // Changed to string since it's usually 1 video per listing
}

const VedioUpload: React.FC<VideoUploadProps> = ({ onChange, value }) => {
  
  const onUpload = (result: any) => {
    // result.info.secure_url is the permanent link to the video
    onChange(result.info.secure_url);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Upload Apartment Video
      </label>

      <CldUploadWidget 
        onUpload={onUpload} 
        uploadPreset="campuscrib" 
        options={{ 
          maxFiles: 1, 
          resourceType: "video",
          clientAllowedFormats: ["mp4", "mov", "avi"], // Restrict formats for better compatibility
          maxFileSize: 50 * 1024 * 1024, // 50MB
        }}
      >
        {({ open }) => (
          <div 
            onClick={() => open?.()}
            className={`
              border-2 border-dashed rounded-lg p-10 
              text-center transition-all cursor-pointer
              flex flex-col items-center justify-center gap-3
              ${value 
                ? "border-green-500 bg-green-50" 
                : "border-slate-200 bg-slate-50 hover:border-green-400"
              }
            `}
          >
            {value ? (
              <>
                <MdCheckCircle size={48} className="text-green-500" />
                <div className="text-green-700 font-medium">Video Uploaded Successfully!</div>
                <p className="text-xs text-green-600">Click again to replace the video</p>
              </>
            ) : (
              <>
                <MdVideoLibrary size={48} className="text-slate-400" />
                <div className="text-slate-600 font-medium text-lg">
                  Click to upload apartment video
                </div>
                <p className="text-sm text-slate-400">
                  MP4, MOV or AVI (Max 1 file)
                </p>
              </>
            )}
          </div>
        )}
      </CldUploadWidget>

      {/* Optional: Show a small text link of the URL to be 100% sure */}
      {value && (
        <p className="mt-2 text-[10px] text-slate-400 truncate">
          File: {value}
        </p>
      )}
    </div>
  );
};

export default VedioUpload;