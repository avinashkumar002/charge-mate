"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import Spinner from "@/components/Spinner/Spinner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

export default function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be less than 2MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      // Get auth params from our API
      const authRes = await fetch("/api/imagekit/auth");
      const authParams = await authRes.json();

      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
      formData.append("signature", authParams.signature);
      formData.append("expire", authParams.expire);
      formData.append("token", authParams.token);
      formData.append("fileName", `charger_${Date.now()}`);
      formData.append("folder", "/chargers");

      // Upload to ImageKit
      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadData.url) {
        onChange(uploadData.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="chip" weight={500} className="text-black-900">
        Charger Photo
      </Typography>

      {value ? (
        // Image Preview
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#E5E5E5] bg-[#F9F9F9]">
          <Image
            src={value}
            alt="Charger preview"
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        // Upload Area
        <label
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${error || uploadError
              ? "border-red-400 bg-red-50"
              : "border-[#E5E5E5] bg-[#F9F9F9] hover:border-[#365314] hover:bg-[#f5f9f0]"
            }
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" color="#365314" />
              <Typography variant="para" className="text-black-600">
                Uploading...
              </Typography>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">📷</div>
              <Typography variant="para" className="text-black-600">
                Click to upload charger photo
              </Typography>
              <Typography variant="chip" className="text-black-400">
                JPG, PNG, WebP (max 5MB)
              </Typography>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}

      {(error || uploadError) && (
        <Typography variant="chip" className="text-red-500">
          {error || uploadError}
        </Typography>
      )}
    </div>
  );
}