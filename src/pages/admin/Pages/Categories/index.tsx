import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } from "../../../../services/CategoryApi";
import edit from '../../../../assets/icons/edit.png';
import deleteitemicon from '../../../../assets/icons/delete.png';
import { useState, useEffect, ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import Modal from "../../../../components/admin/Modal";

export interface Category {
  id?: string;
  bookCategory: string;
  status: string;
  image?: string | File;
}

const CategoriesPage = () => {
  const { data: categoriesData, isLoading, error,refetch } = useGetCategoriesQuery();
  const categories = categoriesData?.list || [];
  const { t } = useTranslation();
  const [formattedCategories, setFormattedCategories] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<Partial<Category>>({});
  const [searchValue, setSearchValue] = useState<string>("");

  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAddCategory = async (newCategory: Partial<Category>) => {
    if (!newCategory.bookCategory) return;

    const formData = new FormData();
    formData.append( "categoryRequest", JSON.stringify({ bookCategory: newCategory.bookCategory }));
    formData.append("image", newCategory.image || new Blob([], { type: "text/plain" }))
    try {
      await addCategory(formData).unwrap();
      refetch()
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };
  const getStringOnlyData = (data: Partial<Category>): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const key in data) {
      const value = data[key as keyof Category];
      if (typeof value === 'string') {
        result[key] = value;
      }
    }
    return result;
  };
  
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setEditCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryData({
      bookCategory: category.bookCategory,
      status: category.status,
    });
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm(t("confirm_delete") || "Silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  useEffect(() => {
    const filtered = categories.filter(cat =>
      cat.bookCategory.toLowerCase().includes(searchValue.toLowerCase())
    );
    const formatted = filtered.map((cat, idx) => ({
      ...cat,
      number: idx + 1,
      edit: (
        <img
          src={edit}
          alt="edit"
          style={{ width: 20, cursor: 'pointer' }}
          onClick={() => handleEditClick(cat)}
        />
      ),
      delete: (
        <img
          src={deleteitemicon}
          alt="delete"
          style={{ width: 20, cursor: 'pointer' }}
          onClick={() => handleDeleteCategory(cat.id!)}
        />
      ),
    }));
    setFormattedCategories(formatted);
  }, [categories, searchValue, t]);

  if (isLoading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error_loading_categories")}</p>;

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
          { key: 'number', label: t('№') },
          { key: 'bookCategory', label: t('categoryname'), downFilterIcon: down_filter },
          { key: 'status', label: t('categorystatus'), downFilterIcon: down_filter },
          { key: 'edit', label: t('edit_item') },
          { key: 'delete', label: t('delete_item') },
        ]}
        formFields={[
          { name: 'bookCategory', label: t('categoryname'), type: 'text' },
          { name: 'image', label: t('image'), type: 'file' },
        ]}
        items={formattedCategories}
        onAddItem={handleAddCategory}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sortOptions={[
          [
            { value: 'newest', label: t('sortitem_newest') },
            { value: 'oldest', label: t('sortitem_oldest') },
            { value: 'title', label: t('sortitem_by_title') },
          ],
          [
            { value: 'newest', label: t('sortitem_newest') },
            { value: 'oldest', label: t('sortitem_oldest') },
            { value: 'title', label: t('sortitem_by_title') },
          ],
          [
            { value: 'newest', label: t('sortitem_newest') },
            { value: 'oldest', label: t('sortitem_oldest') },
            { value: 'title', label: t('sortitem_by_title') },
          ],
        ]}
      />

      {editingCategory && (
        <Modal
          isOpen={true}
          closeModal={() => setEditingCategory(null)}
          handleSubmit={handleSaveCategory}
          formFields={[
            { name: 'bookCategory', label: t('categoryname'), type: 'text' },
            { name: 'image', label: t('image'), type: 'file' },
          ]}
          newItem={getStringOnlyData(editCategoryData)}
          add_item={t('edit_category')}
          add_new_item={t('edit_category')}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};

export default CategoriesPage;