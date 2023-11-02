// import { serverInstance } from "../Utils/serverInstance";

// export const getStoryByID = async (id ,onSuccess, onError) => {
//   try {
//     const response = await serverInstance.get(`story/retrieve/${id}`, {
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

// export const createStory = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post('story/create', data, {
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
