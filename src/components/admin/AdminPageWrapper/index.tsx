import React, { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import "./index.scss";
import DataTable from "../../common/DataTable";
import { useSidebar } from "../../../hooks/usedSidebar.ts";
import { useTranslation } from "react-i18next";
import Sort from "../../common/Sort/index.tsx";
import { Column } from "../../common/DataTable/index.tsx";
import Button from "../../common/Button/index.tsx";
import { Book } from '../../../pages/admin/Pages/Book';

interface AdminPageWrapperProps {
    resourceName: string;
    searchtag: string;
    all_item: string;
    add_item: string;
    text_button: string;
    add_new_item: string;
    columns: Column[];
    formFields: { name: string; label: string; type: string }[];
    items: Record<string, any>[];
    onAddItem: (newItem: Record<string, any>, file?: File, image?: File) => void;
    sortOptions?: { value: string; label: string }[][]
    searchValue: string;
    onSearchChange: (value: string) => void;
    editingItem?: Book | null;
    onAddClick?: () => void;
    pagination?: {
        count: number;
        page: number;
        onChange: (page: number) => void;
    };
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({
    resourceName,
    searchtag,
    all_item,
    add_item,
    add_new_item,
    columns,
    formFields,
    items,
    onAddItem,
    sortOptions = [],
    searchValue,
    onSearchChange,
    editingItem,
    onAddClick,
    pagination,
}) => {
    const { isSidebarOpen } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Record<string, string>>({});
    const { t } = useTranslation();

    useEffect(() => {
        if (editingItem) {
            const prefill = formFields.reduce((acc, field) => {
                const value = editingItem[field.name as keyof Book];
                acc[field.name] = value !== undefined ? String(value) : "";
                return acc;
            }, {} as Record<string, string>);
            setNewItem(prefill);
            setIsModalOpen(true);
        } else {
            const initial = formFields.reduce((acc, field) => {
                acc[field.name] = "";
                return acc;
            }, {} as Record<string, string>);
            setNewItem(initial);
        }
    }, [editingItem, formFields]);

    const handleAddClick = () => onAddClick ? onAddClick() : setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };
    const displayedItems = items;

    return (
        <div className={`table-container ${isSidebarOpen ? "table-container--open" : "table-container--closed"}`}>
            <div className="AdminPageWrapperContainer">
                <div className="AdminPageWrapperContainer__header">
                    <p className="AdminPageWrapperContainer__header__title">{resourceName}</p>
                </div>
                <div className="AdminPageWrapperContainer__content">
                    <div className="AdminPageWrapperContainer__content__section">
                        <div className="AdminPageWrapperContainer__content__section__book__list">
                            <p className="AdminPageWrapperContainer__content__section__book__list__subtitle">
                                {resourceName} {t('list')}
                            </p>
                        </div>
                        <div className="AdminPageWrapperContainer__content__section__subsection">
                            <input
                                type="text"
                                className="AdminPageWrapperContainer__content__section__subsection__input"
                                placeholder={searchtag}
                                value={searchValue}
                                onChange={e => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="AdminPageWrapperContainer__content__sort_container">
                        <div className="AdminPageWrapperContainer__content__sort_container__item">
                            <p>{all_item}</p>
                        </div>
                        <div className="AdminPageWrapperContainer__content__sort_container__sort__items">
                            {sortOptions.map((group, idx) => (
                                <Sort key={idx} t={t} sortOptions={group} />
                            ))}
                            <div className="AdminPageWrapperContainer__content__sort_container__sort__items__addbook">
                                <Button text_button={add_item} onClick={handleAddClick} />
                            </div>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={displayedItems}
                        pagination={pagination}
                    />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={handleModalClose}
                handleSubmit={(book, file, image) => {
                    onAddItem(book, file, image);
                    setIsModalOpen(false);
                    setNewItem(formFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {} as Record<string, string>));
                }}
                formFields={formFields}
                newItem={newItem}
                handleInputChange={handleInputChange}
                add_item={add_item}
                add_new_item={editingItem ? t('edit_book') : add_new_item}
            />
        </div>
    );
};

export default AdminPageWrapper;
