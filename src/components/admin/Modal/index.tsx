import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { t } from 'i18next';

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
    handleSubmit: (e: React.FormEvent) => void;
    formFields: FormField[];
    newItem: Record<string, string>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    add_item: string;
    add_new_item: string;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, handleSubmit, formFields, newItem, handleInputChange, add_new_item, add_item }) => {
    const [fileName, setFileName] = useState<string>('');
    const [imageFileName, setImageFileName] = useState<string>('')

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeModal();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeModal]);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) closeModal();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            if (fieldName === "image") {
                setImageFileName(file.name);
            } else {
                setFileName(file.name);
            }
        }
    };

    return (
        <div className="modal open" onClick={handleOverlayClick}>
            <div className="modal__content">
                <span className="modal__close" onClick={closeModal}>&times;</span>
                <p className='modal__title'>{add_new_item}</p>
                <form onSubmit={handleSubmit}>
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
                                                        multiple
                                                    />
                                                </Button>
                                                <div className="modal__file-preview-container">
                                                    {field.name === "image" ? (
                                                        imageFileName && (
                                                            <div className="modal__image-preview">
                                                                <p>{imageFileName}</p>
                                                            </div>
                                                        )
                                                    ) : (
                                                        fileName &&
                                                        <div className="modal__image-preview">
                                                            <p>{fileName}</p>
                                                        </div>
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
