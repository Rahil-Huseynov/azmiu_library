// src/components/admin/Modal.tsx
import React, { ChangeEvent, FC, useState } from 'react';
import './index.scss';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
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

export interface FormField {
    name: string;
    label: string;
    type: string;
    selectOptions?: { value: string; label: string }[];  // for select fields
}

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    handleSubmit: (newBook: Partial<Book>, file?: File, image?: File) => void;
    formFields: FormField[];
    newItem: Record<string, string>;
    add_item: string;
    add_new_item: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, handleSubmit, formFields, newItem, handleInputChange, add_new_item, add_item }) => {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            if (fieldName === 'image') {
                setImage(selectedFile);
            } else {
                setFile(selectedFile);
            }
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(newItem, file || undefined, image || undefined);
        // reset inputs
        formFields.forEach(field => {
            handleInputChange({ target: { name: field.name, value: '' } } as any);
        });
        setFile(null);
        setImage(null);
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="modal open" onClick={e => e.target === e.currentTarget && closeModal()}>
            <div className="modal__content">
                <span className="modal__close" onClick={closeModal}>&times;</span>
                <p className='modal__title'>{add_new_item}</p>
                <form onSubmit={handleFormSubmit}>
                    <div className='modal__form'>
                        {formFields.map(field => (
                            <div key={field.name} className="modal__form-field">
                                <div className='modal__form-field__item-container'>
                                    <div className='modal__form-field__item-container__label'>
                                        <label htmlFor={field.name}>{field.label}:</label>
                                    </div>
                                    <div>
                                        {field.type === 'file' ? (
                                            <div className="modal__file-upload">
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    {t('upload_file')}
                                                    <VisuallyHiddenInput
                                                        type="file"
                                                        name={field.name}
                                                        onChange={e => handleFileChange(e, field.name)}
                                                    />
                                                </Button>
                                                <div className="modal__file-preview-container">
                                                    {(field.name === 'image' ? image : file)
                                                        ? <p>{(field.name === 'image' ? image : file)!.name}</p>
                                                        : newItem[field.name] && <p>{newItem[field.name]}</p>
                                                    }
                                                </div>
                                            </div>
                                        ) : field.type === 'select' ? (
                                            <FormControl sx={{ minWidth: 165 }}>
                                                <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                                <Select
                                                    labelId={`${field.name}-label`}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={newItem[field.name] || ''}
                                                    label={field.label}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    {field.selectOptions?.map(opt => (
                                                        <MenuItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <TextField
                                                id={field.name}
                                                label={field.label}
                                                variant="outlined"
                                                type={field.type}
                                                name={field.name}
                                                value={newItem[field.name] || ''}
                                                onChange={handleInputChange as any}
                                                fullWidth
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
                        <button type="button" className="modal__button modal__button--cancel" onClick={closeModal}>{t('cancel')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
