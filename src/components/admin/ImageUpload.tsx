"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { HiOutlinePhotograph, HiOutlineX, HiOutlinePlus, HiOutlineDocumentText } from "react-icons/hi";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export function ImageUpload({ value, onChange, folder = "images", label, accept = "image/*" }: ImageUploadProps) {
  const isPdf = value?.toLowerCase().endsWith('.pdf');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    
    try {
      // Upload direto para Vercel Blob (bypassa limite de 4.5MB)
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

      const blob = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/upload/client",
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      onChange(blob.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">
          {label}
        </label>
      )}
      <div className="relative">
        {value ? (
          <div className="group relative h-48 w-full overflow-hidden rounded-[1.3rem] border border-[var(--admin-border)]">
            {isPdf ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-[color:rgba(198,161,91,0.08)]">
                <HiOutlineDocumentText className="h-12 w-12 text-[var(--admin-accent-strong)]" />
                <span className="mt-2 text-sm text-[var(--admin-muted)]">PDF carregado</span>
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-1 text-xs text-[var(--color-primary)] hover:underline"
                >
                  Visualizar PDF
                </a>
              </div>
            ) : (
              <Image src={value} alt="Preview" fill className="object-cover" />
            )}
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--admin-overlay)] text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-[1.3rem] border-2 border-dashed border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.18)] transition-colors hover:border-[var(--admin-accent)]"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--admin-ink)] border-t-transparent" />
                {progress > 0 && <span className="text-sm text-[var(--admin-muted)]">{progress}%</span>}
              </div>
            ) : (
              <>
                <HiOutlinePhotograph className="h-8 w-8 text-[var(--admin-muted)]" />
                <span className="text-sm text-[var(--admin-muted)]">Clique para enviar</span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  max?: number;
}

export function GalleryUpload({ value = [], onChange, folder = "gallery", label, max = 10 }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of files) {
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const filename = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

        const blob = await upload(filename, file, {
          access: "public",
          handleUploadUrl: "/api/upload/client",
        });

        newUrls.push(blob.url);
      }
      onChange([...value, ...newUrls].slice(0, max));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">
          {label}
        </label>
      )}
      <div className="grid grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={index} className="group relative aspect-square overflow-hidden rounded-[1rem] border border-[var(--admin-border)]">
            <Image src={url} alt={`Gallery ${index}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--admin-overlay)] text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <HiOutlineX className="h-3 w-3" />
            </button>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square items-center justify-center rounded-[1rem] border-2 border-dashed border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.18)] transition-colors hover:border-[var(--admin-accent)]"
          >
            {uploading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--admin-ink)] border-t-transparent" />
            ) : (
              <HiOutlinePlus className="h-6 w-6 text-[var(--admin-muted)]" />
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
