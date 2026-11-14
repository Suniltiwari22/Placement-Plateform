import dotenv from "dotenv";
import connectDB from "../config/db.js";

import Category from "../models/Category.js";
import Topic from "../models/Topic.js";
import Company from "../models/Company.js";
import Question from "../models/Questions.js";

dotenv.config();

const seedDSA = async () => {
    try {
        await connectDB();

        console.log("Connected to database");

        // =========================
        // 1. CATEGORY
        // =========================

        let dsaCategory = await Category.findOne({
            slug: "dsa"
        });

        if (!dsaCategory) {
            dsaCategory = await Category.create({
                name: "DSA",
                slug: "dsa",
                description: "Data Structures and Algorithms",
                icon: "🧠",
                isActive: true
            });

            console.log("DSA category created");
        } else {
            console.log("DSA category already exists");
        }

        // =========================
        // 2. TOPICS
        // =========================

        const topicData = [
            {
                name: "Arrays",
                slug: "arrays",
                description: "Array based problems",
                order: 1
            },
            {
                name: "Strings",
                slug: "strings",
                description: "String based problems",
                order: 2
            },
            {
                name: "Linked List",
                slug: "linked-list",
                description: "Linked list problems",
                order: 3
            },
            {
                name: "Stack",
                slug: "stack",
                description: "Stack problems",
                order: 4
            },
            {
                name: "Queue",
                slug: "queue",
                description: "Queue problems",
                order: 5
            },
            {
                name: "Binary Tree",
                slug: "binary-tree",
                description: "Binary tree problems",
                order: 6
            },
            {
                name: "Binary Search Tree",
                slug: "binary-search-tree",
                description: "BST problems",
                order: 7
            },
            {
                name: "Heap",
                slug: "heap",
                description: "Heap and priority queue problems",
                order: 8
            },
            {
                name: "Hashing",
                slug: "hashing",
                description: "Hashing problems",
                order: 9
            },
            {
                name: "Recursion",
                slug: "recursion",
                description: "Recursion and backtracking",
                order: 10
            },
            {
                name: "Graph",
                slug: "graph",
                description: "Graph problems",
                order: 11
            },
            {
                name: "Dynamic Programming",
                slug: "dynamic-programming",
                description: "Dynamic programming problems",
                order: 12
            }
        ];

        const topics = {};

        for (const topic of topicData) {
            let existingTopic = await Topic.findOne({
                slug: topic.slug,
                category: dsaCategory._id
            });

            if (!existingTopic) {
                existingTopic = await Topic.create({
                    ...topic,
                    category: dsaCategory._id,
                    isActive: true
                });

                console.log(`Topic created: ${topic.name}`);
            }

            topics[topic.slug] = existingTopic;
        }

        // =========================
        // 3. COMPANIES
        // =========================

        const companyData = [
            {
                name: "TCS",
                slug: "tcs",
                type: "service",
                description: "Tata Consultancy Services",
                website: "https://www.tcs.com"
            },
            {
                name: "Infosys",
                slug: "infosys",
                type: "service",
                description: "Infosys",
                website: "https://www.infosys.com"
            },
            {
                name: "Wipro",
                slug: "wipro",
                type: "service",
                description: "Wipro",
                website: "https://www.wipro.com"
            },
            {
                name: "Accenture",
                slug: "accenture",
                type: "service",
                description: "Accenture",
                website: "https://www.accenture.com"
            },
            {
                name: "Amazon",
                slug: "amazon",
                type: "product",
                description: "Amazon",
                website: "https://www.amazon.jobs"
            },
            {
                name: "Microsoft",
                slug: "microsoft",
                type: "product",
                description: "Microsoft",
                website: "https://www.microsoft.com"
            }
        ];

        const companies = {};

        for (const company of companyData) {
            let existingCompany = await Company.findOne({
                slug: company.slug
            });

            if (!existingCompany) {
                existingCompany = await Company.create({
                    ...company,
                    isActive: true
                });

                console.log(`Company created: ${company.name}`);
            }

            companies[company.slug] = existingCompany;
        }

        // =========================
        // 4. QUESTIONS
        // =========================

        const questionData = [
            {
                title: "Two Sum",
                slug: "two-sum",
                description:
                    "Given an array of integers and a target value, return the indices of the two numbers that add up to the target.",
                topic: "arrays",
                difficulty: "easy",
                companies: ["tcs", "amazon"],
                questionType: "coding",
                tags: ["array", "hashing"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Reverse a String",
                slug: "reverse-a-string",
                description:
                    "Given a string, reverse the string without using a built-in reverse function.",
                topic: "strings",
                difficulty: "easy",
                companies: ["tcs", "infosys"],
                questionType: "coding",
                tags: ["string", "two-pointer"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Maximum Subarray",
                slug: "maximum-subarray",
                description:
                    "Find the contiguous subarray with the largest sum.",
                topic: "arrays",
                difficulty: "medium",
                companies: ["amazon", "microsoft"],
                questionType: "coding",
                tags: ["array", "kadane"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Detect Cycle in Linked List",
                slug: "detect-cycle-in-linked-list",
                description:
                    "Determine whether a linked list contains a cycle.",
                topic: "linked-list",
                difficulty: "medium",
                companies: ["amazon", "microsoft"],
                questionType: "coding",
                tags: ["linked-list", "fast-slow-pointer"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Valid Parentheses",
                slug: "valid-parentheses",
                description:
                    "Given a string containing brackets, determine whether the brackets are correctly balanced.",
                topic: "stack",
                difficulty: "easy",
                companies: ["tcs", "infosys", "amazon"],
                questionType: "coding",
                tags: ["stack", "string"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Binary Tree Level Order Traversal",
                slug: "binary-tree-level-order-traversal",
                description:
                    "Return the level order traversal of a binary tree.",
                topic: "binary-tree",
                difficulty: "medium",
                companies: ["amazon", "microsoft"],
                questionType: "coding",
                tags: ["tree", "bfs", "queue"],
                sourceType: "curated"
            },
            {
                title: "Binary Search",
                slug: "binary-search",
                description:
                    "Given a sorted array, search for a target value using binary search.",
                topic: "binary-search-tree",
                difficulty: "easy",
                companies: ["tcs", "wipro"],
                questionType: "coding",
                tags: ["binary-search", "array"],
                sourceType: "curated",
                isFrequentlyAsked: true
            },
            {
                title: "Number of Islands",
                slug: "number-of-islands",
                description:
                    "Given a grid containing land and water, find the number of islands.",
                topic: "graph",
                difficulty: "medium",
                companies: ["amazon", "microsoft"],
                questionType: "coding",
                tags: ["graph", "dfs", "bfs"],
                sourceType: "curated"
            },
            {
                title: "Climbing Stairs",
                slug: "climbing-stairs",
                description:
                    "Find the number of distinct ways to climb n stairs when you can climb one or two stairs at a time.",
                topic: "dynamic-programming",
                difficulty: "easy",
                companies: ["amazon", "accenture"],
                questionType: "coding",
                tags: ["dp", "recursion"],
                sourceType: "curated"
            }
        ];

        for (const question of questionData) {
            const existingQuestion = await Question.findOne({
                slug: question.slug
            });

            if (existingQuestion) {
                console.log(`Question already exists: ${question.title}`);
                continue;
            }

            const topic = topics[question.topic];

            const companyIds = question.companies.map(
                (companySlug) => companies[companySlug]._id
            );

            await Question.create({
                title: question.title,
                slug: question.slug,
                description: question.description,

                category: dsaCategory._id,
                topic: topic._id,

                difficulty: question.difficulty,

                companies: companyIds,

                questionType: question.questionType,

                tags: question.tags,

                sourceType: question.sourceType,

                isFrequentlyAsked:
                    question.isFrequentlyAsked || false,

                isPublished: true
            });

            console.log(`Question created: ${question.title}`);
        }

        console.log("");
        console.log("=================================");
        console.log("DSA SEED COMPLETED");
        console.log("=================================");

        process.exit(0);

    } catch (error) {
        console.error("DSA seed error:", error);
        process.exit(1);
    }
};

seedDSA();