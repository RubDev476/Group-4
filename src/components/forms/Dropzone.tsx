'use client';

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Collections } from "@mui/icons-material";

import type { DZProps } from "@/src/types/components-props";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function Dropzone({ getImg, img, setErrorImg, errorImg }: DZProps) {
    const [previewImg, setPreviewImg] = useState<string>('');

    useEffect(() => {
        return () => {
            if (previewImg && typeof URL.revokeObjectURL === 'function') {
                URL.revokeObjectURL(previewImg);
            }
        };
    }, [previewImg]);

    const onDropRejected = () => setErrorImg("Error (Max. 10Mb, 'jpeg/png')*");

    const onDropAccepted = useCallback((acceptedFiles: Array<File>) => {
        if (acceptedFiles.length > 0) {
            getImg(acceptedFiles[0]);

            const url = URL.createObjectURL(acceptedFiles[0]);

            setPreviewImg(url);
            setErrorImg('');
        }
    }, [getImg, setErrorImg]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
        maxSize: MAX_IMAGE_SIZE_BYTES,
    });

    return (
        <div className="dropzone-container w-full bg-input">
            {errorImg !== '' && (
                <span className="error-input">{errorImg}</span>
            )}

            {img ? (
                <div className="preview-img-container w-full all-center relative">
                    {typeof img === 'string' ? (
                        <Image
                            src={img}
                            fill
                            alt="img-preview"
                            priority
                        />
                    ) : (
                        <Image
                            src={previewImg}
                            fill
                            alt="img-preview"
                            priority
                        />
                    )}
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full bg-input all-center' })}>
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <p>Drop image to upload</p>
                    ) : (
                        <div className="instructions-container">
                            <p>Drag and drop an image or click here to choose one</p>

                            <Collections className="icon" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}