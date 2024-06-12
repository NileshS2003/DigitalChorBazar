import { IUser, IUserData } from "../../interfaces/user.interface";

export const CreateUser = async (userdata: IUserData): Promise<IUser> => {
  const response = await fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  });

  const data=await response.json()
  // console.log(data)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return data;
};

// export function SignOutUser() {
//   return new Promise(async (resolve) => {
//     resolve({ data: "success" });
//   });
// }

// export function SignInUser(userData: IUserData) {
//   // debugger
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch("/api/auth/sign-in/", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         resolve({ data });
//       } else {
//         const err = await response.json();
//         reject({ err });
//       }
//     } catch (err) {
//       reject({ err });
//     }
//   });
// }
