import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } from "../../../../services/CategoryApi";
import edit from '../../../../assets/icons/edit.png';
import deleteitemicon from '../../../../assets/icons/delete.png';
import { useState, useEffect } from "react";
import Modal from "../../../../components/admin/Modal";

export interface Category {
    id?: string;
    bookCategory: string;
    status: string;
}

const CategoriesPage = () => {
    const { data: categories = [] } = useGetCategoriesQuery();
    const { t } = useTranslation();
    const [formattedCategories, setFormattedCategories] = useState<any[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editCategoryData, setEditCategoryData] = useState<Partial<Category>>({});

    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleAddCategory = async (newCategory: Partial<Category>) => {
        if (!newCategory.bookCategory) {
            console.error("Missing bookCategory in newCategory");
            return;
        }

        try {
            const response = await addCategory(newCategory).unwrap();
            console.log("Category added successfully:", response);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditCategoryData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setEditCategoryData({
            bookCategory: category.bookCategory,
            status: category.status
        });
    };

    const handleSaveCategory = () => {
        if (editingCategory) {
            console.log("Saving updated category:", editCategoryData);
            setEditingCategory(null);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (window.confirm(t("confirm_delete") || "Silmək istədiyinizə əminsiniz?")) {
            try {
                await deleteCategory(id).unwrap();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    useEffect(() => {
        if (categories) {
            const formatted = categories.map((category, index) => ({
                ...category,
                number: index + 1,
                edit: (
                    <img
                        src={edit}
                        alt="edit"
                        style={{ width: "20px", cursor: "pointer" }}
                        onClick={() => handleEditClick(category)}
                    />
                ),
                delete: (
                    <img
                        src={deleteitemicon}
                        alt="delete"
                        style={{ width: "20px", cursor: "pointer" }}
                        onClick={() => handleDeleteCategory(category.id!)}
                    />
                )
            }));
            setFormattedCategories(formatted);
        }
    }, [categories, t]);

    return (
        <>
            <AdminPageWrapper
                resourceName={t('categories')}
                searchtag={t('search_categories')}
                all_item={t('allCategories')}
                text_button={t('add_item')}
                add_item={t('add_categories')}
                add_new_item={t('add_new_categories')}
                columns={[
                    { key: "number", label: t("№") },
                    { key: "bookCategory", label: t("categoryname"), downFilterIcon: down_filter },
                    { key: "status", label: t("categorystatus"), downFilterIcon: down_filter },
                    { key: "edit", label: t("edit_item") },
                    { key: "delete", label: t("delete_item") },
                ]}
                formFields={[
                    { name: "bookCategory", label: t("categoryname"), type: "text" },
                ]}
                items={formattedCategories}
                onAddItem={handleAddCategory}
                sortOptions={[
                    { value: "bookCategory_asc", label: t("az") },
                    { value: "bookCategory_desc", label: t("za") },
                ]}
            />

            {editingCategory && (
                <Modal
                    isOpen={true}
                    closeModal={() => setEditingCategory(null)}
                    handleSubmit={handleSaveCategory}
                    formFields={[
                        {
                            name: "bookCategory",
                            label: t("categoryname"),
                            type: "text"
                        },
                        {
                            name: "status",
                            label: t("categorystatus"),
                            type: "text"
                        },
                    ]}
                    newItem={editCategoryData}
                    add_item={t("save_changes")}
                    add_new_item={t("save_changes")}
                    handleInputChange={handleInputChange}
                />
            )}
        </>
    );
};

export default CategoriesPage;
