import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const recetas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recetas" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.enum([
      "Aperitivos",
      "Guarniciones",
      "Platos Fuertes",
      "Sopas",
      "Ensaladas",
    ]),
    prepTime: z.string(),
    cookTime: z.string(),
    servings: z.number(),
    difficulty: z.enum(["Fácil", "Intermedio", "Avanzado"]),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { recetas };