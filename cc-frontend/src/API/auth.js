// import { serverInstance } from "../Utils/serverInstance";

// export const signUp = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post("user/signup", data);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getUser = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get("user/me", {
//         headers: {
//             token: sessionStorage.getItem("token")
//         }
//     });
//     if (onSuccess) onSuccess(response.data)

//     return response.data;

//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getAllUsers = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`user/all`);

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getUserByID = async (id, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`user/${id}`, {
//       headers: {
//         token: sessionStorage.getItem("token")
//       }
//     });
//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const followAUser = async (id, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post(`user/follow/${id}`, {}, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };


// export const getMostLiked = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`user/most-liked`);

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const uploadImage = async (image, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`user/update-profile-image`, image, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };


// export const login = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post(`user/login`, data);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };
// export const verification = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`user/verification/${data}`, {});
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };
// export const Forgot = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`user/forgot-password`, data);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };
// export const Reset = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.patch(`user/reset-password`, data);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const addCard = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`user/add-card`, data, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const addCart = async (postId, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`user/add-to-cart/${postId}`, {}, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const removeCart = async (cartItemID, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.delete(`user/remove-from-cart/${cartItemID}`, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) onSuccess(response.data)

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };
