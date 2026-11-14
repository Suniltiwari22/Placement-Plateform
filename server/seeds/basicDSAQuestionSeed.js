import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";
import Question from "../models/Questions.js";

dotenv.config();

const questionsData = [
    {
        title: "Print Hello World",
        slug: "print-hello-world",
        topic: "programming-basics",
        difficulty: "easy",
        description:
            "Write a program that prints Hello World.",
        examples: [
            {
                input: "",
                output: "Hello World",
                explanation: "Print the required message."
            }
        ],
        starterCode: {
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}',
            java: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}',
            python: 'print("Hello World")',
            javascript: 'console.log("Hello World");'
        },
        hiddenTestCases: [
            { input: "hello", output: "Hello World" }
        ]
    },
    {
        title: "Sum of Two Numbers",
        slug: "sum-of-two-numbers",
        topic: "programming-basics",
        difficulty: "easy",
        description:
            "Given two integers a and b, print their sum.",
        examples: [
            {
                input: "4 6",
                output: "10",
                explanation: "4 + 6 = 10."
            }
        ],
        starterCode: {
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Print the sum\n    return 0;\n}',
            java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        // Print the sum\n    }\n}',
            python: 'a, b = map(int, input().split())\n# Print the sum',
            javascript: 'const fs = require("fs");\nconst [a, b] = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);\n// Print the sum'
        },
        hiddenTestCases: [
            { input: "4 6", output: "10" },
            { input: "0 0", output: "0" },
            { input: "-5 8", output: "3" }
        ]
    },
    {
        title: "Count Digits",
        slug: "count-digits",
        topic: "basic-maths",
        difficulty: "easy",
        description:
            "Given a non-negative integer n, print the number of digits in n. Zero has one digit.",
        examples: [
            {
                input: "5029",
                output: "4",
                explanation: "5029 contains four digits."
            }
        ],
        starterCode: {
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // Count and print the digits\n    return 0;\n}',
            java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextLong();\n        // Count and print the digits\n    }\n}',
            python: 'n = int(input())\n# Count and print the digits',
            javascript: 'const fs = require("fs");\nconst n = BigInt(fs.readFileSync(0, "utf8").trim());\n// Count and print the digits'
        },
        hiddenTestCases: [
            { input: "5029", output: "4" },
            { input: "0", output: "1" },
            { input: "123456", output: "6" }
        ]
    },
    {
        title: "Check Even or Odd",
        slug: "check-even-or-odd",
        topic: "basic-maths",
        difficulty: "easy",
        description:
            "Given an integer n, print Even if it is even; otherwise print Odd.",
        examples: [
            {
                input: "7",
                output: "Odd",
                explanation: "7 is not divisible by 2."
            }
        ],
        starterCode: {
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Print Even or Odd\n    return 0;\n}',
            java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Print Even or Odd\n    }\n}',
            python: 'n = int(input())\n# Print Even or Odd',
            javascript: 'const fs = require("fs");\nconst n = Number(fs.readFileSync(0, "utf8").trim());\n// Print Even or Odd'
        },
        hiddenTestCases: [
            { input: "7", output: "Odd" },
            { input: "8", output: "Even" },
            { input: "0", output: "Even" }
        ]
    },
    {
        title: "Factorial of a Number",
        slug: "factorial-of-a-number",
        topic: "basic-recursion",
        difficulty: "easy",
        description:
            "Given a non-negative integer n, print n factorial. The factorial of zero is 1. Assume 0 <= n <= 20.",
        examples: [
            {
                input: "5",
                output: "120",
                explanation: "5! = 5 × 4 × 3 × 2 × 1."
            }
        ],
        starterCode: {
            cpp: '#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    // Implement recursively\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << factorial(n);\n    return 0;\n}',
            java: 'import java.util.*;\npublic class Main {\n    static long factorial(int n) {\n        // Implement recursively\n        return 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(factorial(sc.nextInt()));\n    }\n}',
            python: 'def factorial(n):\n    # Implement recursively\n    return 0\n\nn = int(input())\nprint(factorial(n))',
            javascript: 'function factorial(n) {\n    // Implement recursively\n    return 0;\n}\n\nconst fs = require("fs");\nconst n = Number(fs.readFileSync(0, "utf8").trim());\nconsole.log(factorial(n));'
        },
        hiddenTestCases: [
            { input: "5", output: "120" },
            { input: "0", output: "1" },
            { input: "1", output: "1" },
            { input: "10", output: "3628800" }
        ]
    }
];

const seedQuestions = async () => {
    try {
        await connectDB();

        const category = await Category.findOne({ slug: "dsa" });
        const section = await DSASection.findOne({ slug: "basics" });

        if (!category || !section) {
            throw new Error("DSA category or Basics section not found.");
        }

        let created = 0;
        let updated = 0;

        for (const data of questionsData) {
            const topic = await Topic.findOne({
                slug: data.topic,
                category: category._id,
                section: section._id
            });

            if (!topic) {
                console.log(`Topic not found: ${data.topic}`);
                continue;
            }

            const questionData = {
                ...data,
                category: category._id,
                section: section._id,
                topic: topic._id,
                questionType: "coding",
                executionMode: "stdin",
                sourceType: "practice",
                tags: ["DSA", "Basics"],
                isPublished: true
            };

            const existing = await Question.findOne({
                slug: data.slug
            });

            if (existing) {
                Object.assign(existing, questionData);
                await existing.save();
                updated++;
                console.log(`Updated: ${data.title}`);
            } else {
                await Question.create(questionData);
                created++;
                console.log(`Created: ${data.title}`);
            }
        }

        console.log(`\nCreated: ${created}`);
        console.log(`Updated: ${updated}`);
    } catch (error) {
        console.error("Seed error:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.connection.close();
    }
};

seedQuestions();
