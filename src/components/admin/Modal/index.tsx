import React, { FC, useEffect } from 'react';
import './index.scss';
import { TextField } from '@mui/material';
import { t } from 'i18next';

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
    add_new_item:string;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, handleSubmit, formFields, newItem, handleInputChange, add_new_item, add_item }) => {

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

    return (
        <>
            <div className="modal open" onClick={handleOverlayClick}>
                <div className="modal__content">
                    <span className="modal__close" onClick={closeModal}>&times;</span>
                    <p className='modal__title'>{add_new_item}</p>
                    <form onSubmit={handleSubmit}>
                        <div className='modal__form'>
                            {formFields.map((field) => (
                                <div key={field.name} className="modal__form-field">
                                    <label>{field.label}:</label>
                                    <TextField
                                        id="outlined-basic"
                                        label={field.label}
                                        variant="outlined"
                                        type={field.type}
                                        name={field.name}
                                        value={newItem[field.name] || ''}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                            ))}
                        </div>
                        <div className='modal__button-container'>
                            <button type="submit" className="modal__button modal__button--confirm" role="button">{add_item}</button>
                            <button className="modal__button modal__button--cancel" role="button" onClick={closeModal}>{t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
