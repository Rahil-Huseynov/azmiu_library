import React, { FC, useState } from 'react';
import './index.scss';
import { TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { t } from 'i18next';
import { Book } from '../../../pages/admin/Pages/Book';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

interface FormField {
    name: string;
    label: string;
    type: string;
}

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    handleSubmit: (newBook: Partial<Book>, file?: File, image?: File) => void;
    formFields: FormField[];
    newItem: Record<string, string>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    add_item: string;
    add_new_item: string;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, handleSubmit, formFields, newItem, handleInputChange, add_new_item, add_item }) => {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            if (fieldName === "image") {
                setImage(selectedFile);
            } else {
                setFile(selectedFile);
            }
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(newItem, file || undefined, image || undefined);

        const initialItem = formFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>);

        Object.keys(initialItem).forEach((key) => {
            handleInputChange({
                target: { name: key, value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        setFile(null);
        setImage(null);
    };

    if (!isOpen) return null;

    return (
        <div className="modal open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className="modal__content">
                <span className="modal__close" onClick={closeModal}>&times;</span>
                <p className='modal__title'>{add_new_item}</p>
                <form onSubmit={handleFormSubmit}>
                    <div className='modal__form'>
                        {formFields.map((field) => (
                            <div key={field.name} className="modal__form-field">
                                <div className='modal__form-field__item-container'>
                                    <div className='modal__form-field__item-container__label'>
                                        <label>{field.label}:</label>
                                    </div>
                                    <div>
                                        {field.type === "file" ? (
                                            <div className="modal__file-upload">
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    {t("upload_file")}
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        name={field.name}
                                                        onChange={(event) => handleFileChange(event, field.name)}
                                                    />
                                                </Button>

                                                <div className="modal__file-preview-container">
                                                    {field.name === "image" ? (
                                                        <>
                                                            {image && <p>{image.name}</p>}
                                                            {!image && newItem.image && <p>{newItem.image}</p>}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {file && <p>{file.name}</p>}
                                                            {!file && newItem.file && <p>{newItem.file}</p>}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <TextField
                                                id="outlined-basic"
                                                label={field.label}
                                                variant="outlined"
                                                type={field.type}
                                                name={field.name}
                                                value={newItem[field.name] || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='modal__button-container'>
                        <button type="submit" className="modal__button modal__button--confirm">{add_item}</button>
                        <button className="modal__button modal__button--cancel" onClick={closeModal}>{t('cancel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;