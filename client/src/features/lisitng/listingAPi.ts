import { ErrorPayloadType } from "../../interfaces/error.interface.ts";
import { IListingData, IListing } from "../../interfaces/listing.interface.ts";

export function createListing(listingData: IListingData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(listingData),
      });
      if (response.ok) {
        const data = await response.json();
        resolve(data as IListing);
      } else {
        const err = await response.json();
        console.log(err);
        reject({ err: err as ErrorPayloadType });
      }
    } catch (err) {
      reject({ err: err as ErrorPayloadType });
    }
  });
}
export function getUserListing(userId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/api/listing/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

export function deleteUserListing(listingId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/api/listing/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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

interface IData {
  mahiti: IListing;
  listingId: string;
}

export function editListing({ mahiti, listingId }: IData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mahiti),
      });
      // const doc = await res.json();
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
