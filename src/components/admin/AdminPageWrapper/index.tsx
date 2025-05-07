"use client"

import React, { useState, useEffect, ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import Modal from "../../../components/admin/Modal";
import "./index.scss";
import DataTable from "../../common/DataTable";
import { Column } from "../../common/DataTable";
import { useSidebar } from "../../../hooks/usedSidebar";
import { useTranslation } from "react-i18next";
import Sort from "../../common/Sort";
import Button from "../../common/Button";
import type { Book } from "../../../pages/admin/Pages/Book";

interface FormField {
    name: string;
    label: string;
    type: "text" | "number" | "file" | "select";
    selectOptions?: { value: string; label: string }[];
}

interface AdminPageWrapperProps {
    resourceName: string;
    searchtag: string;
    all_item: string;
    add_item: string;
    text_button: string;
    add_new_item: string;
    columns: Column[];
    formFields: FormField[];
    items: Record<string, any>[];
    onAddItem: (newItem: Record<string, any>, file?: File, image?: File) => void;
    sortOptions?: { value: string; label: string }[][];
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
                const val = editingItem[field.name as keyof Book];
                acc[field.name] = val != null ? String(val) : "";
                return acc;
            }, {} as Record<string, string>);
            setNewItem(prefill);
            setIsModalOpen(true);
        } else {
            setNewItem(
                formFields.reduce((acc, field) => {
                    acc[field.name] = "";
                    return acc;
                }, {} as Record<string, string>)
            );
        }
    }, [editingItem, formFields]);

    const handleAddClick = () =>
        onAddClick ? onAddClick() : setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
    ) => {
        const name = e.target.name!;
        const value = String(e.target.value);
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className={`table-container ${isSidebarOpen
                    ? "table-container--open"
                    : "table-container--closed"
                }`}
        >
            <div className="AdminPageWrapperContainer">
                <div className="AdminPageWrapperContainer__header">
                    <p className="AdminPageWrapperContainer__header__title">
                        {resourceName}
                    </p>
                </div>

                <div className="AdminPageWrapperContainer__content">
                    <div className="AdminPageWrapperContainer__content__section">
                        <div className="AdminPageWrapperContainer__content__section__book__list">
                            <p className="AdminPageWrapperContainer__content__section__book__list__subtitle">
                                {resourceName} {t("list")}
                            </p>
                        </div>
                        <div className="AdminPageWrapperContainer__content__section__subsection">
                            <input
                                type="text"
                                className="AdminPageWrapperContainer__content__section__subsection__input"
                                placeholder={searchtag}
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
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

                    <DataTable columns={columns} data={items} pagination={pagination} />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                closeModal={handleModalClose}
                handleSubmit={(book, file, image) => {
                    onAddItem(book, file, image);
                    setIsModalOpen(false);
                    setNewItem(
                        formFields.reduce((acc, f) => {
                            acc[f.name] = "";
                            return acc;
                        }, {} as Record<string, string>)
                    );
                }}
                formFields={formFields}
                newItem={newItem}
                handleInputChange={handleInputChange}
                add_item={add_item}
                add_new_item={editingItem ? t("edit_book") : add_new_item}
            />
        </div>
    );
};

export default AdminPageWrapper;
