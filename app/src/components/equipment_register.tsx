import React, { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const EquipmentRegister = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categories_id, setcategories_id] = useState<number | null>(null);
  const [ISBN, setIsbn] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mysite-mczi.onrender.com/api/category/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("An error occurred while fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setcategories_id(value);
  };

  const handleIsbnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsbn(value);
  };
  // isbnから本の名前を取得
  const fetchBookName = async (isbn: string) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    console.log("Request URL:", url);

    try {
      const response = await axios.get(url);
      console.log("Response data:", response.data);
      if (response.data.totalItems === 0) {
        throw new Error("本が見つかりませんでした");
      }
      const bookData = response.data.items[0].volumeInfo;
      console.log(bookData);
      console.log(bookData.title);
      if (bookData && bookData.title) {
        return bookData.title;
      } else {
        throw new Error("本が見つかりませんでした");
      }
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
      return "エラーが発生しました";
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeadline(Number(e.target.value));
  };
  // 本の時の登録用fetch
  const handleSubmitForBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories_id === null) {
      alert("カテゴリーを選択してください。");
      return;
    }

    const bookName = await fetchBookName(ISBN);
    console.log(bookName);

    try {
      const response = await fetch(
        "https://mysite-mczi.onrender.com/api/equipment/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ISBN,
            name: bookName,
            categories_id,
            deadline,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register equipment: ${errorText}`);
      }

      const data = await response.json();
      console.log("Equipment registered successfully:", data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // 本以外の登録用fetch
  const handleSubmitForOther = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories_id === null) {
      alert("カテゴリーを選択してください。");
      return;
    }
    try {
      console.log(categories_id, name, deadline);
      const response = await fetch(
        "https://mysite-mczi.onrender.com/api/equipment/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ISBN: null,
            name,
            categories_id,
            deadline,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register equipment: ${errorText}`);
      }

      const data = await response.json();
      console.log("Equipment registered successfully:", data);
      setName("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {categories_id === 1 ? ( // カテゴリーのidが1番が本になっていると仮定してやっているので、実際のカテゴリーidに合わせて変更してください
        <form onSubmit={handleSubmitForBook}>
          <div>
            <label htmlFor="category">カテゴリー</label>
            <select
              id="category"
              value={categories_id ?? ""}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                選択してください
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              value={ISBN}
              onChange={handleIsbnChange}
            />
          </div>
          <div>
            <label htmlFor="deadline">期限</label>
            <select
              id="deadline"
              value={deadline ?? ""}
              onChange={handleDeadlineChange}
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value={31}>1カ月</option>
              <option value={62}>2カ月</option>
              <option value={93}>3カ月</option>
              <option value={186}>6カ月</option>
              <option value={365}>1年</option>
            </select>
          </div>
          <button type="submit">登録</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitForOther}>
          <div>
            <label htmlFor="category">カテゴリー</label>
            <select
              id="category"
              value={categories_id ?? ""}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                選択してください
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name">名前</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="deadline">期限</label>
            <select
              id="deadline"
              value={deadline ?? ""}
              onChange={handleDeadlineChange}
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value={31}>1カ月</option>
              <option value={62}>2カ月</option>
              <option value={93}>3カ月</option>
              <option value={186}>6カ月</option>
              <option value={365}>1年</option>
            </select>
          </div>
          <button type="submit">登録</button>
        </form>
      )}
    </div>
  );
};

export default EquipmentRegister;
