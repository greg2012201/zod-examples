import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const personSchema = z.object({
    name: z.string().describe("The person's full name"),
    age: z.number().describe("The person's age"),
    occupation: z.string().describe("The person's occupation"),
    favoriteFood: z.string().describe("The person's favorite food"),
    interestingFact: z.string().describe("An interesting fact about the person"),
});

type Person = z.infer<typeof personSchema>;

const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
}).withStructuredOutput(personSchema);

async function extractPersonInfo(text: string) {
    return model.invoke(
        `Extract information about a person from the following text:
        ${text}`
    );
}

async function main() {
    const text = "John is a 25-year-old chef who loves pizza. He once cooked for a celebrity!";

    try {
        const result = await extractPersonInfo(text);
        console.log("Extracted person information:");
        console.log(result);
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
