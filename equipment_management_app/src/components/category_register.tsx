function Category_register() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoryName = (
      document.getElementById("category_name") as HTMLInputElement
    ).value;

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });

      const jma_json = await response.json();

      if (response.ok) {
        // Handle success
        console.log("Category registered successfully");
      } else {
        // Handle error
        console.error("Failed to register category");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category_name">カテゴリー名</label>
          <input type="text" id="category_name" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Category_register;
