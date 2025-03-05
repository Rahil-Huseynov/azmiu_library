import React, { useState, useEffect } from "react";
import Modal from "../../../components/admin/Modal";
import "./index.scss";
import DataTable from "../../common/DataTable";
import { useSidebar } from "../../../hooks/usedSidebar.ts";
import { useTranslation } from "react-i18next";
import Sort from "../../common/Sort/index.tsx";
import { Column } from "../../common/DataTable/index.tsx";
import Button from "../../common/Button/index.tsx";

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
    onAddItem: (newItem: Record<string, any>) => void;
    sortOptions?: { value: string; label: string }[];
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({
    resourceName,
    searchtag,
    columns,
    all_item,
    add_item,
    formFields,
    items,
    add_new_item,
    onAddItem,
    sortOptions = [],
}) => {
    const { isSidebarOpen } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const initialItem = formFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>);
        setNewItem(initialItem);
    }, [formFields]);

    const handleAddClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddItem(newItem);
        setIsModalOpen(false);
        setNewItem(
            formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
        );
    };

    const filteredItems = items.filter((item) =>
        columns.some((col) =>
            String(item[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    const { t } = useTranslation();

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
                                placeholder={`${searchtag}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="AdminPageWrapperContainer__content__sort_container">
                        <div className="AdminPageWrapperContainer__content__sort_container__item">
                            <p>{all_item}</p>
                        </div>
                        <div className="AdminPageWrapperContainer__content__sort_container__sort__items">
                            {sortOptions.map((option) => (
                                <Sort key={option.value} t={t} sortOptions={sortOptions} />
                            ))}
                            <div className="AdminPageWrapperContainer__content__sort_container__sort__items__addbook">
                                <Button text_button={add_item} onClick={handleAddClick} />
                            </div>
                        </div>
                    </div>

                    <DataTable columns={columns} data={filteredItems} />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                closeModal={handleModalClose}
                handleSubmit={handleSubmit}
                formFields={formFields}
                newItem={newItem}
                handleInputChange={handleInputChange}
                add_item={add_item}
                add_new_item={add_new_item}
            />
        </div>
    );
};

export default AdminPageWrapper;
