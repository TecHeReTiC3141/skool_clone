"use client";

import {UploadCloudIcon, X} from 'lucide-react';
import * as React from 'react';
import {useDropzone} from 'react-dropzone';
import {twMerge} from 'tailwind-merge';
import {ERROR_MESSAGES, SingleInputProps, variants} from "@/app/ui/components/edgestore/config";


const SingleImageDropzone = React.forwardRef<HTMLInputElement, SingleInputProps>(
    (
        { dropzoneOptions, width, height, value, className, disabled, onChange },
        ref,
    ) => {
        const imageUrl = React.useMemo(() => {
            if (typeof value === 'string') {
                // in case a url is passed in, use it to display the image
                return value;
            } else if (value) {
                // in case a file is passed in, create a base64 url to display the image
                return URL.createObjectURL(value);
            }
            return null;
        }, [value]);

        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            acceptedFiles,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            accept: { 'image/*': [] },
            multiple: false,
            disabled,
            onDrop: (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                    void onChange?.(file);
                }
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = React.useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    imageUrl && variants.image,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                imageUrl,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = React.useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);

        return (
            <div>
                <div
                    {...getRootProps({
                        className: dropZoneClassName,
                        style: {
                            width,
                            height,
                        },
                    })}
                >
                    {/* Main File Input */}
                    <input ref={ref} {...getInputProps()} />

                    {imageUrl ? (
                        // Image Preview
                        <img
                            className="h-full w-full rounded-md object-cover"
                            src={imageUrl}
                            alt={acceptedFiles[0]?.name}
                        />
                    ) : (
                        // Upload Icon
                        <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                            <UploadCloudIcon className="mb-2 h-7 w-7" />
                            <div className="text-gray-400">drag & drop to upload</div>
                            <div className="mt-3">
                                <Button disabled={disabled}>select</Button>
                            </div>
                        </div>
                    )}

                    {/* Remove Image Icon */}
                    {imageUrl && !disabled && (
                        <div
                            className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                void onChange?.(undefined);
                            }}
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                                <X
                                    className="text-gray-500 dark:text-gray-400"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Text */}
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            </div>
        );
    },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    return (
        <button
            className={twMerge(
                // base
                'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
                // color
                'border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700',
                // size
                'h-6 rounded-md px-2 text-xs',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';



export { SingleImageDropzone };