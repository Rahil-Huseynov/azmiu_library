import { useState, useEffect } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import { useGetBooksQuery } from "../../../../services/Api";

interface Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    bookCode: string;
    language: string;
    description: string;
    status: string;
    pages: number;
    filePath: string;
    createdAt: string;
}

const BookPage = () => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetBooksQuery();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (data?.list) {
            const formattedBooks = data.list.flat().map((book) => ({
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

    const handleAddBook = (newBook: Partial<Book>) => {
        if (!newBook.title || !newBook.author || newBook.publicationYear === undefined) {
            return;
        }

        const newBookWithId: Book = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title: newBook.title,
            author: newBook.author,
            publicationYear: Number(newBook.publicationYear),
            bookCode: newBook.bookCode || "N/A",
            language: newBook.language || "Unknown",
            description: newBook.description || "No description",
            status: newBook.status || "Available",
            pages: newBook.pages || 0,
            filePath: newBook.filePath || "",
            createdAt: new Date().toISOString(),
        };

        setBooks((prevBooks) => [...prevBooks, newBookWithId]);
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
                { name: "title", label: t("title"), type: "text" },
                { name: "author", label: t("author"), type: "text" },
                { name: "publicationYear", label: t("year"), type: "number" },
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
