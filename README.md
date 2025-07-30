# Zod Examples

This repository contains practical examples of using Zod for runtime type validation in TypeScript applications. The examples were created for an article [about type-safe data validation with Zod](https://www.aboutjs.dev/en/posts/zod-the-quiet-hero-of-modern-web-development) published on the [about.js blog](https://www.aboutjs.dev/en).

## Examples

### 1. Form Validation (`form-example/`)

A React application demonstrating form validation using Zod with React Hook Form:

-   Client-side validation with detailed error messages
-   Type inference with TypeScript
-   Integration with React Hook Form
-   Real-time validation feedback

### 2. Express Middleware Validation (`express-middleware-validation/`)

An Express.js backend showcasing middleware-based request validation:

-   Reusable validation middleware
-   Type-safe request handling
-   Clean error responses
-   Zod schema reuse

### 3. LangChain Structured Output (`llm-output-example/`)

An example of using Zod with LangChain for structured LLM outputs:

-   Type-safe LLM responses
-   Integration with OpenAI's GPT models
-   Automatic validation of LLM output
-   Error handling for invalid responses

## Getting Started

Each example is a standalone project with its own dependencies. To run an example:

1. Navigate to the example directory:

```bash
cd [example-directory]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## License

MIT
