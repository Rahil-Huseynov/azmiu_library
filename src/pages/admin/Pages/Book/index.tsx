import { useState, useEffect } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import { useGetBooksQuery, useAddBookMutation } from "../../../../services/Api";

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

const BookPage = () => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetBooksQuery({});
    const [books, setBooks] = useState<Book[]>([]);
    const [addBook] = useAddBookMutation();

    useEffect(() => {
        if (data?.list) {
            const formattedBooks = data.list.flat().map((book: Book) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                publicationYear: book.publicationYear,
                bookCode: book.bookCode,
                language: book.language,
                description: book.description,
                status: book.status,
                pages: book.pages,
                filePath: book.filePath,
                createdAt: book.createdAt,
            }));
            setBooks(formattedBooks);
        }
    }, [data]);

    const handleAddBook = async (newBook: Partial<Book>, file?: File, image?: File) => {
        if (!newBook.title || !newBook.author || newBook.publicationYear === undefined) {
            return;
        }

        const formData = new FormData();
        formData.append("categoryId", String(newBook.categoryId || ""));
        formData.append("title", newBook.title);
        formData.append("author", newBook.author);
        formData.append("publicationYear", String(newBook.publicationYear));
        formData.append("bookCode", newBook.bookCode || "N/A");
        formData.append("language", newBook.language || "Unknown");
        formData.append("description", newBook.description || "No description");
        formData.append("pages", String(newBook.pages || 0));
        formData.append("publisher", newBook.publisher || "");

        if (file) {
            formData.append("file", file);
        } else {
            return;
        }

        if (image) {
            formData.append("image", image);
        } else {
            return;
        }
        
        try {
            await addBook(formData).unwrap();
        } catch (error) {
        }
    };

    if (isLoading) return <p>{t("loading")}</p>;
    if (error) return <p>{t("error_loading_books")}</p>;

    return (
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
    );
};

export default BookPage;