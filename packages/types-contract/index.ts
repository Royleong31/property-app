import { initContract } from "@ts-rest/core";
import { z } from "zod";

// TODO: Use esbuild for bundling of this package so that we can export functions here
export interface GetHelloResponse {
  id: string;
  title: string;
  body: string;
}

export function foo() {
  return "foo";
}

export interface GetTestResponse {
  firstName: number;
}

// const c = initContract();

// export const PostSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   body: z.string(),
// });

// export const TestSchema = z.object({
//   firstName: z.number().min(1).max(18),
// });

// type A = z.infer<typeof TestSchema>;

// export const contract = c.router({
//   getTest: {
//     method: "GET",
//     path: "/getTest",
//     responses: {
//       200: TestSchema,
//     },
//     summary: "Get a post by id",
//   },
//   getHello: {
//     method: "GET",
//     path: `/getHello`,
//     responses: {
//       200: PostSchema,
//     },
//     summary: "Get a post by id",
//   },
// });
