import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Question from "../models/Questions.js";

dotenv.config();

const checkDriver = async () => {
    try {
        await connectDB();

        const question = await Question.findOne({
            slug: "two-sum"
        }).select("executionMode functionName driverCode");

        if (!question) {
            console.log("Two Sum not found");
            return;
        }

        console.log("Execution mode:", question.executionMode);
        console.log("Function name:", question.functionName);
        console.log("C++ driver exists:", Boolean(question.driverCode?.cpp?.trim()));
        console.log("C++ driver length:", question.driverCode?.cpp?.length || 0);
    } catch (error) {
        console.error(error);
    } finally {
        await (await import("mongoose")).default.connection.close();
    }
};

checkDriver();