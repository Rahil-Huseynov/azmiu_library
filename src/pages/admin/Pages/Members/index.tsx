import { useState } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png'
interface Category {
    id: number;
    name: string;
    description: string;
}

const MembersPage = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Science Fiction", description: "Books that explore futuristic and scientific themes." },
        { id: 2, name: "Mystery", description: "Books with suspenseful and intriguing storylines." },
        { id: 3, name: "History", description: "Books that delve into historical events and narratives." },
    ]);

    const handleAddCategory = (newCategory: Partial<Category>) => {
        if (!newCategory.name || !newCategory.description) {
            console.error("Missing fields in newCategory");
            return;
        }

        const newCategoryWithId: Category = {
            id: categories.length + 1,
            name: newCategory.name,
            description: newCategory.description,
        };

        setCategories((prevCategories) => [...prevCategories, newCategoryWithId]);
    };
    const { t } = useTranslation();


    return (
        <>
            <AdminPageWrapper
                resourceName={t('members')}
                searchtag={t('search_members')}
                all_item={t('allmembers')}
                text_button={t('add_item')}
                add_item={t('add_members')}
                add_new_item={t('add_new_members')}
                columns={[
                    { key: "name", label: t("membersname"), downFilterIcon: down_filter },
                    { key: "description", label: t("membersdescription"), downFilterIcon: down_filter },
                ]}

                formFields={[
                    { name: "name", label: t("membersname"), type: "text" },
                    { name: "description", label: t("membersdescription"), type: "text" },
                ]}
                items={categories}
                onAddItem={handleAddCategory}
                sortOptions={[
                    { value: "name_asc", label: t("az") },
                    { value: "name_desc", label: t("za") },
                ]}
            />
        </>
    );
};
export default MembersPage;
