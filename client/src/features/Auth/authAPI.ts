import { IUser, IUserData } from "../../interfaces/user.interface";

export const CreateUser = async (userdata: IUserData): Promise<IUser> => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return data;
};

export function SignOutUser() {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
      }
      resolve({ data: "success" });
    } catch (error) {
      reject(error)
    }
  });
}

export function SignInUser(userData: IUserData) {
  // debugger
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        console.log(err);
        reject({ err });
      }
    } catch (err) {
      reject({ err });
    }
  });
}

export function fetchUser() {
  // debugger
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // include cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        reject({ errorData });
      } else {
        const data = await response.json();
        resolve({ data });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function SignInWithGoogle(userData: {
  email: string;
  username: string;
}) {
  // debugger
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        console.log(err);
        reject({ err });
      }
    } catch (err) {
      reject({ err });
    }
  });
}
