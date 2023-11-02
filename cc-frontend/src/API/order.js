// import { serverInstance } from "../Utils/serverInstance";

// export const createOrder = async (data, onSuccess, onError) => {
//     try {
//       const response = await serverInstance.post('order/create', data, {
//         headers: {
//             token: sessionStorage.getItem("token")
//         }
//       });
  
//       if (onSuccess) onSuccess(response.data)
  
//       return response.data;
      
//     } catch (error) {
//       if (onError) onError(error);
//       console.log(error);
//     }
// };

// export const createApplePayOrder = async (data, onSuccess, onError) => {
//   try {
//     const response = await serverInstance.post('order/create-checkout-session', data, {
//       headers: {
//           token: sessionStorage.getItem("token")
//       }
//     });

//     if (onSuccess) {
//       onSuccess(response.data)
//       window.location.href = response.data.url
//     }

//     return response.data;
    
//   } catch (error) {
//     if (onError) onError(error);
//     console.log(error);
//   }
// };