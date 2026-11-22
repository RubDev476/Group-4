'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { UserFormType } from '@/src/types';

interface PostFieldsProps {
    register: UseFormRegister<UserFormType>;
    errors: FieldErrors<UserFormType>;
    defaultTitle?: string;
    defaultDescription?: string;
    requiredTitleMessage?: string;
    requiredDescriptionMessage?: string;
}

export default function PostFields({
    register,
    errors,
    defaultTitle,
    defaultDescription,
    requiredTitleMessage = 'Title required*',
    requiredDescriptionMessage = 'Description required*',
}: PostFieldsProps) {
    return (
        <>
            <p>Title:</p>

            <input
                className="bg-input"
                type="text"
                id="title-post"
                placeholder="Post title"
                {...register('title', {
                    value: defaultTitle,
                    required: {
                        value: true,
                        message: requiredTitleMessage,
                    },
                    maxLength: {
                        value: 60,
                        message: 'Max. 60 chars.*',
                    },
                })}
            />

            {errors.title && (
                <span className="error-input">{errors.title.message}</span>
            )}

            <div className="relative">
                <p>Description:</p>

                <textarea
                    {...register('description', {
                        value: defaultDescription,
                        required: {
                            value: true,
                            message: requiredDescriptionMessage,
                        },
                        maxLength: {
                            value: 300,
                            message: 'Max. 300 chars.*',
                        },
                    })}
                    className="w-full bg-input"
                    id="description-post"
                    placeholder="Post description"
                />

                {errors.description && (
                    <span className="error-input">{errors.description.message}</span>
                )}
            </div>
        </>
    );
}
