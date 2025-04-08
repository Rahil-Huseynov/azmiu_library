import { useState, useEffect } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import edit from '../../../../assets/icons/edit.png';
import deleteitemicon from '../../../../assets/icons/delete.png';
import { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } from "../../../../services/BookApi";
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
  imagePath: string;
  createdAt: string;
}

const BookPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: BookData, error, isLoading } = useGetBooksQuery({});
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editItem, setEditItem] = useState<Record<string, string>>({});

  useEffect(() => {
    if (BookData?.list) {
      const formattedBooks = BookData.list.flat().map((book: Book, index: number) => ({
        ...book,
        number: index + 1,
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
        deleteitemicon: book.status !== "REMOVED" ? (
          <img
            src={deleteitemicon}
            alt="delete"
            style={{ width: "20px", cursor: "pointer" }}
            onClick={async () => {
              if (window.confirm(t("confirm_delete") || "Silmək istədiyinizə əminsiniz?")) {
                try {
                  await deleteBook(book.id).unwrap();
                } catch (err) {
                  console.error("Silinmə zamanı xəta:", err);
                }
              }
            }}
          />
        ) : null
      }));
      setBooks(formattedBooks);
    }
  }, [BookData, deleteBook, t]);

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
        file: editingBook.filePath?.split('\\').pop() || "",
        image: editingBook.imagePath?.split('\\').pop() || ""
      });
    }
  }, [editingBook, editItem]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (
    newBook: Partial<Book>,
    file?: File,
    image?: File
  ): Promise<void> => {
    if (!newBook.title || !newBook.author || newBook.publicationYear === undefined) return;

    const formData = new FormData();
    formData.append("categoryId", newBook.categoryId ? String(newBook.categoryId) : "");
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("publicationYear", String(newBook.publicationYear));
    formData.append("bookCode", newBook.bookCode || "N/A");
    formData.append("language", newBook.language || "Unknown");
    formData.append("description", newBook.description || "No description");
    formData.append("pages", newBook.pages ? String(newBook.pages) : "0");
    formData.append("publisher", newBook.publisher || "");
    formData.append("file", file || new Blob([], { type: "text/plain" }));
    formData.append("image", image || new Blob([], { type: "text/plain" }));

    try {
      await addBook(formData).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setEditingBook(null);
      setEditItem({});
    }
  };

  const handleUpdateBook = async (newBook: Partial<Book>, file?: File, image?: File): Promise<void> => {
    if (!newBook.title || !newBook.author || newBook.publicationYear === undefined) return

    const bookId = editingBook?.id
    if (!bookId) return
    const updateData = {
      categoryId: Number.parseInt(String(newBook.categoryId), 10) || 0,
      title: newBook.title,
      author: newBook.author,
      publicationYear: Number.parseInt(String(newBook.publicationYear), 10) || 0,
      bookCode: newBook.bookCode || "N/A",
      language: newBook.language || "Unknown",
      description: newBook.description || "No description",
      pages: Number.parseInt(String(newBook.pages), 10) || 0,
      publisher: newBook.publisher || "",
      file: file || new Blob([], { type: "text/plain" }),
      image: image || new Blob([], { type: "text/plain" }),
    }

    try {
      await updateBook({ id: bookId, ...updateData }).unwrap()
    } catch (err) {
      console.error(err)
    } finally {
      setEditingBook(null)
      setEditItem({})
    }
  }


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
          { key: "number", label: '№', downFilterIcon: down_filter },
          { key: "title", label: t("title"), downFilterIcon: down_filter },
          { key: "author", label: t("author"), downFilterIcon: down_filter },
          { key: "bookCode", label: t('bookCode'), downFilterIcon: down_filter },
          { key: "status", label: t('status'), downFilterIcon: down_filter },
          { key: "edit", label: t('edit_item') },
          { key: "deleteitemicon", label: t('delete_item') },
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
          handleSubmit={(_book: Partial<Book>, file?: File, image?: File): void => {
            void handleUpdateBook({ ...editingBook, ...editItem }, file, image);
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
