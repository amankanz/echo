//src/middleware/validationMiddleware.js
// import { ZodError } from "zod";

// export function validateData(schema) {
//   return (req, res, next) => {
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errorMessages =
//           error.errors.map((issue) => ({
//             message: `${issue.path.length ? issue.path.join(".") : "field"} ${
//               issue.message
//             }`,
//           })) ?? [];
//         return res
//           .status(400)
//           .json({ error: "Invalid data", details: errorMessages });
//       } else {
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     }
//   };
// }

// import { ZodError } from "zod";

// export function validateData(schema) {
//   return (req, res, next) => {
//     console.log("Incoming body:", req.body);
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error) {
//       console.log("ZOD ERROR:", error); // <-- TEMPORARY LOG FOR DEBUGGING

//       if (error instanceof ZodError) {
//         const zodErrors = error.errors ?? []; // <--- Prevents undefined.map
//         const errorMessages = zodErrors.map((issue) => ({
//           message: `${issue.path?.length ? issue.path.join(".") : "field"} ${
//             issue.message
//           }`,
//         }));

//         return res.status(400).json({
//           error: "Invalid data",
//           details: errorMessages,
//         });
//       }

//       return res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   };
// }

import { ZodError } from "zod";

export function validateData(schema) {
  return (req, res, next) => {
    console.log("Incoming body:", req.body);

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log("ZOD ERROR:", error);

      if (error instanceof ZodError) {
        const issues = error.issues ?? [];

        const errorMessages = issues.map((issue) => ({
          message: `${issue.path.length ? issue.path.join(".") : "field"} ${
            issue.message
          }`,
        }));

        return res
          .status(400)
          .json({ error: "Invalid data", details: errorMessages });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
