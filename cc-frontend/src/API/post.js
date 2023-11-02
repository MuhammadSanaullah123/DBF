// import { serverInstance } from "../Utils/serverInstance";

// export const getPostByID = async (id ,onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`post/retrieve/${id}`, {
//         headers: {
//             token: sessionStorage.getItem("token")
//         }
//     });
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getPost = async (onSuccess, onError) => {
//     try {
//       const response = await serverInstance.get(`post/retrieve-all`, {
//           headers: {
//               token: sessionStorage.getItem("token")
//           }
//       });
//       if (onSuccess) onSuccess(response.data);
//       return response.data;
//     } catch (error) {
//       if (onError) onError(error);
//       console.log(error);
//     }
// };

// export const createPost = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post('post/create', data, {
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
// export const getTrendingPosts = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`post/trending-posts`);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getDesignOfDay = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`post/design-of-day`);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getDesignOfMonth = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`post/design-of-month`);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const getDesignOfYear = async (onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`post/design-of-year`);
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const addLike = async (id, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`post/${id}/like`, {}, {
//         headers: {
//             token: sessionStorage.getItem("token")
//         }
//     });
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };

// export const addComment = async (id, data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.put(`post/${id}/comment`, data, {
//         headers: {
//             token: sessionStorage.getItem("token")
//         }
//     });
//     if (onSuccess) onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };