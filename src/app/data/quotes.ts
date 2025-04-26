interface Quote {
  text: string;
  author: string;
  role?: string;
  year?: number;
}

export const quotes: Quote[] = [
  {
    text: "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
    author: "Don Norman",
    role: "Cognitive Scientist & Design Theorist"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    role: "Co-founder of Apple"
  },
  {
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
    role: "Design Strategist"
  },
  {
    text: "Less is more.",
    author: "Ludwig Mies van der Rohe",
    role: "Architect",
    year: 1947
  },
  {
    text: "Design creates culture. Culture shapes values. Values determine the future.",
    author: "Robert L. Peters",
    role: "Designer & Author"
  },
  {
    text: "Everything is designed. Few things are designed well.",
    author: "Brian Reed",
    role: "Designer"
  },
  {
    text: "Good design is honest.",
    author: "Dieter Rams",
    role: "Industrial Designer"
  },
  {
    text: "Design is thinking made visual.",
    author: "Saul Bass",
    role: "Graphic Designer"
  }
]; 