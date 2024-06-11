const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("https://api.example.com/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("success");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

export default fetchLogin;
