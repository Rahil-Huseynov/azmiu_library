import { useState, useEffect } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import edit from '../../../../assets/icons/edit.png';
import deleteitemicon from '../../../../assets/icons/delete.png';
import { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation } from "../../../../services/Api";
import Modal from "../../../../components/admin/Modal";

export interface Book {
    categoryId: number;
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    publisher: string;
    bookCode: string;
    language: string;
    description: string;
    status: string;
    pages: number;
    filePath: string;
    file: string;
    image: string;
    createdAt: string;
}

const BookPage: React.FC = () => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetBooksQuery({});
    const [books, setBooks] = useState<Book[]>([]);
    const [addBook] = useAddBookMutation();
    const [updateBook] = useUpdateBookMutation();
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [editItem, setEditItem] = useState<Record<string, string>>({});

    useEffect(() => {
        if (data?.list) {
            const formattedBooks = data.list.flat().map((book: Book) => ({
                ...book,
                edit: (
                    <img
                        src={edit}
                        alt="edit"
                        style={{ width: "20px", cursor: "pointer" }}
                        onClick={() => {
                            setEditingBook(book);
                            setEditItem({});
                        }}
                    />
                ),
                deleteitemicon: (
                    <img
                        src={deleteitemicon}
                        alt="deleteitemicon"
                        style={{ width: "20px", cursor: "pointer" }}
                    />
                )
            }));
            setBooks(formattedBooks);
        }
    }, [data]);

    useEffect(() => {
        if (editingBook && Object.keys(editItem).length === 0) {
            setEditItem({
                id: editingBook.id.toString(),
                categoryId: editingBook.categoryId.toString(),
                title: editingBook.title,
                author: editingBook.author,
                bookCode: editingBook.bookCode,
                publisher: editingBook.publisher,
                language: editingBook.language,
                description: editingBook.description,
                pages: editingBook.pages.toString(),
                publicationYear: editingBook.publicationYear.toString(),
                file: editingBook.file || "",
                image: editingBook.image || ""
            });
        }
    }, [editingBook, editItem]);

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setEditItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBook = async (newBook: Partial<Book>, file?: File, image?: File): Promise<void> => {
        if (!newBook.title || !newBook.author || newBook.publicationYear === undefined) {
            return;
        }

        const formData = new FormData();
        formData.append("categoryId", newBook.categoryId?.toString() || "");
        formData.append("title", newBook.title);
        formData.append("author", newBook.author);
        formData.append("publicationYear", newBook.publicationYear.toString());
        formData.append("bookCode", newBook.bookCode || "N/A");
        formData.append("language", newBook.language || "Unknown");
        formData.append("description", newBook.description || "No description");
        formData.append("pages", newBook.pages?.toString() || "0");
        formData.append("publisher", newBook.publisher || "");

        if (file) formData.append("file", file);
        if (image) formData.append("image", image);

        try {
            await addBook(formData).unwrap();
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    const handleUpdateBook = async (bookId: number, updatedBook: Partial<Book>, file?: File, image?: File): Promise<void> => {
        const formData = new FormData();
        formData.append("title", updatedBook.title || editingBook?.title || "");
        formData.append("author", updatedBook.author || editingBook?.author || "");
        formData.append("publicationYear",
            updatedBook.publicationYear?.toString() ||
            editingBook?.publicationYear.toString() ||
            ""
        );

        formData.append("categoryId",
            updatedBook.categoryId?.toString() ||
            editingBook?.categoryId.toString() ||
            ""
        );
        formData.append("bookCode", updatedBook.bookCode || editingBook?.bookCode || "N/A");
        formData.append("language", updatedBook.language || editingBook?.language || "Unknown");
        formData.append("description", updatedBook.description || editingBook?.description || "No description");
        formData.append("pages", updatedBook.pages?.toString() || editingBook?.pages.toString() || "0");
        formData.append("publisher", updatedBook.publisher || editingBook?.publisher || "");

        if (file) {
            formData.append("file", file);
        } else if (editingBook?.file) {
            const blob = await fetch(editingBook.file).then(r => r.blob());
            formData.append("file", blob, editingBook.filePath.split('/').pop());
        }

        if (image) {
            formData.append("image", image);
        } else if (editingBook?.image) {
            const blob = await fetch(editingBook.image).then(r => r.blob());
            formData.append("image", blob, editingBook.image.split('/').pop());
        }

        try {
            await updateBook({
                id: bookId,
                body: formData
            }).unwrap();
            setEditingBook(null);
            setEditItem({});
        } catch (err) {
            console.error("Error updating book:", err);
        }
    };

    if (isLoading) return <p>{t("loading")}</p>;
    if (error) return <p>{t("error_loading_books")}</p>;

    return (
        <>
            <AdminPageWrapper
                resourceName={t('book')}
                searchtag={t('search_book')}
                all_item={t('allBooks')}
                add_item={t('add_book')}
                text_button={t('add_item')}
                add_new_item={t('add_new_book')}
                columns={[
                    { key: "id", label: '№', downFilterIcon: down_filter },
                    { key: "title", label: t("title"), downFilterIcon: down_filter },
                    { key: "author", label: t("author"), downFilterIcon: down_filter },
                    { key: "publicationYear", label: t("year"), downFilterIcon: down_filter },
                    { key: "status", label: t('status'), downFilterIcon: down_filter },
                    { key: "edit", label: t('edit') },
                    { key: "deleteitemicon", label: t('delete') },
                ]}
                formFields={[
                    { name: "categoryId", label: t("categoryId"), type: "text" },
                    { name: "title", label: t("title"), type: "text" },
                    { name: "author", label: t("author"), type: "text" },
                    { name: "bookCode", label: t("bookCode"), type: "text" },
                    { name: "publisher", label: t("publisher"), type: "text" },
                    { name: "language", label: t("language"), type: "text" },
                    { name: "description", label: t("description"), type: "text" },
                    { name: "pages", label: t("pages"), type: "number" },
                    { name: "publicationYear", label: t("publicationYear"), type: "number" },
                    { name: "file", label: t("file"), type: "file" },
                    { name: "image", label: t("image"), type: "file" },
                ]}
                items={books}
                onAddItem={handleAddBook}
                sortOptions={[
                    { value: "new", label: t("sortitem_newest") },
                    { value: "old", label: t("sortitem_oldest") },
                    { value: "title", label: t("sortitem_by_title") },
                ]}
            />

            {editingBook && (
                <Modal
                    isOpen={true}
                    closeModal={() => {
                        setEditingBook(null);
                        setEditItem({});
                    }}
                    handleSubmit={(updatedBook: Partial<Book>, file?: File, image?: File): void => {
                        handleUpdateBook(editingBook.id, updatedBook, file, image);
                    }}
                    formFields={[
                        { name: "categoryId", label: t("categoryId"), type: "text" },
                        { name: "title", label: t("title"), type: "text" },
                        { name: "author", label: t("author"), type: "text" },
                        { name: "bookCode", label: t("bookCode"), type: "text" },
                        { name: "publisher", label: t("publisher"), type: "text" },
                        { name: "language", label: t("language"), type: "text" },
                        { name: "description", label: t("description"), type: "text" },
                        { name: "pages", label: t("pages"), type: "number" },
                        { name: "publicationYear", label: t("publicationYear"), type: "number" },
                        { name: "file", label: t("file"), type: "file" },
                        { name: "image", label: t("image"), type: "file" },
                    ]}
                    newItem={editItem}
                    handleInputChange={handleEditInputChange}
                    add_item={t("edit_book")}
                    add_new_item={t("edit_book")}
                />
            )}
        </>
    );
};

export default BookPage;