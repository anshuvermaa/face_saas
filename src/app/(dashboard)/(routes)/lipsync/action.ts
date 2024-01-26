// "use server";
// import axios from "axios";

// export async function ActionLip(formData:any) {
//     const HOST = process.env.NEXT_PUBLIC_LIP_SERVER;
//     console.log("host", HOST);

//   const  response = await axios
//           .post(HOST + "/api/files", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((res) => {
//             return res.data;
//           }).catch((err) => {
//             console.error("error", err);
//             return err;
//           });

    

//         console.log("backend response", response);
//         return response;


// }