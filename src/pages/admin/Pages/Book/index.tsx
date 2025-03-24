import { useState, useEffect } from "react";
import AdminPageWrapper from "../../../../components/admin/AdminPageWrapper";
import { useTranslation } from "react-i18next";
import down_filter from '../../../../assets/icons/down.png';
import edit from '../../../../assets/icons/edit.png';
import deleteitemicon from '../../../../assets/icons/delete.png';
import { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation } from "../../../../services/Api";
import Modal from "../../../../components/admin/Modal";

export interface Book {
  categoryId?: number;
  id?: number;
  title?: string;
  author?: string;
  publicationYear?: number;
  publisher?: string;
  bookCode?: string;
  language?: string;
  description?: string;
  status?: string;
  pages?: number;
  filePath?: string;
  file?: string;
  image?: string;
  createdAt?: string;
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
            onClick={() => setEditingBook(book)}
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
    if (editingBook) {
      setEditItem({
        id: editingBook.id?.toString() || "",
        categoryId: editingBook.categoryId?.toString() || "",
        title: editingBook.title || "",
        author: editingBook.author || "",
        bookCode: editingBook.bookCode || "",
        publisher: editingBook.publisher || "",
        language: editingBook.language || "",
        description: editingBook.description || "",
        pages: editingBook.pages?.toString() || "0",
        publicationYear: editingBook.publicationYear?.toString() || "",
        file: editingBook.file || "",
        image: editingBook.image || ""
      });
    }
  }, [editingBook]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (newBook: Partial<Book>, file?: File, image?: File) => {
    if (!newBook.title || !newBook.author || !newBook.publicationYear) {
      console.error("Required fields are missing");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("publicationYear", newBook.publicationYear.toString());
    
    if (newBook.categoryId) formData.append("categoryId", newBook.categoryId.toString());
    if (newBook.bookCode) formData.append("bookCode", newBook.bookCode);
    if (newBook.language) formData.append("language", newBook.language);
    if (newBook.description) formData.append("description", newBook.description);
    if (newBook.pages) formData.append("pages", newBook.pages.toString());
    if (newBook.publisher) formData.append("publisher", newBook.publisher);
    
    if (file) formData.append("file", file);
    if (image) formData.append("image", image);

    try {
      await addBook(formData).unwrap();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleUpdateBook = async (bookId: number, updatedBook: Partial<Book>, file?: File, image?: File) => {
    if (!bookId || !editingBook) {
      console.error("Missing book ID or editing book data");
      return;
    }

    const formData = new FormData();
    
    formData.append("title", updatedBook.title || editingBook.title || "");
    formData.append("author", updatedBook.author || editingBook.author || "");
    formData.append("publicationYear", 
      (updatedBook.publicationYear || editingBook.publicationYear)?.toString() || ""
    );
    
    if (updatedBook.categoryId || editingBook.categoryId) {
      formData.append("categoryId", 
        (updatedBook.categoryId || editingBook.categoryId)?.toString() || ""
      );
    }
    
    formData.append("bookCode", updatedBook.bookCode || editingBook.bookCode || "");
    formData.append("language", updatedBook.language || editingBook.language || "");
    formData.append("description", updatedBook.description || editingBook.description || "");
    formData.append("pages", 
      (updatedBook.pages || editingBook.pages)?.toString() || "0"
    );
    formData.append("publisher", updatedBook.publisher || editingBook.publisher || "");

    try {
      if (file) {
        formData.append("file", file);
      } else if (editingBook.file) {
        const response = await fetch(editingBook.file);
        if (response.ok) {
          const blob = await response.blob();
          const filename = editingBook.filePath?.split('/').pop() || "file";
          formData.append("file", blob, filename);
        }
      }
    } catch (fileErr) {
      console.error("Error handling file:", fileErr);
    }

    try {
      if (image) {
        formData.append("image", image);
      } else if (editingBook.image) {
        const response = await fetch(editingBook.image);
        if (response.ok) {
          const blob = await response.blob();
          const filename = editingBook.image?.split('/').pop() || "image";
          formData.append("image", blob, filename);
        }
      }
    } catch (imageErr) {
      console.error("Error handling image:", imageErr);
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
          handleSubmit={(updatedBook: Partial<Book>, file?: File, image?: File) => {
            handleUpdateBook(editingBook.id || 0, updatedBook, file, image);
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