import "@testing-library/jest-dom";

Object.defineProperty(globalThis, "import", {
  value: {
    meta: {
      env: {
        VITE_OPENAI_API_KEY:
          process.env.VITE_OPENAI_API_KEY || "sua-chave-de-teste-aqui",
      },
    },
  },
});
