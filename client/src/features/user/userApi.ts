import { IUser } from "../../interfaces/user.interface";


export function updateUser({ mahiti, userId }: {mahiti:IUser, userId:string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/user/update/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mahiti),
        });
        
        if (res.ok) {
          // Parse the JSON response
          const doc = await res.json();
          console.log(doc);
          resolve(doc);
          // Update the state with the fetched data
        } else {
          const errData = await res.json();
          // Handle errors if the response is not successful
          console.error("Failed to fetch data:", errData);
          reject(errData); 
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error fetching data:", error);
        reject(error);
      }
    });
  }