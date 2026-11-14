import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";
import Question from "../models/Questions.js";

dotenv.config();

const questionData = [
    {
        title: "Find the Largest Element in an Array",
        slug: "find-largest-element-array",
        description:
            "Given an array of integers, find the largest element in the array.",
        section: "arrays",
        topic: "array-basics",
        difficulty: "easy",
        tags: ["array", "maximum", "basic"],
        questionType: "coding"
    },
    {
        title: "Reverse an Array",
        slug: "reverse-an-array",
        description:
            "Given an array of integers, reverse the array in place.",
        section: "arrays",
        topic: "array-basics",
        difficulty: "easy",
        tags: ["array", "two-pointer", "reverse"],
        questionType: "coding"
    },
    {
        title: "Two Sum",
        slug: "two-sum",
        description:
            "Given an array of integers and a target value, find two different elements whose sum equals the target.",
        section: "arrays",
        topic: "easy-array-problems",
        difficulty: "easy",
        tags: ["array", "hashing", "two-sum"],
        questionType: "coding"
    },
    {
        title: "Maximum Subarray Sum",
        slug: "maximum-subarray-sum",
        description:
            "Find the contiguous subarray having the maximum possible sum.",
        section: "arrays",
        topic: "kadane-s-algorithm",
        difficulty: "medium",
        tags: ["array", "kadane", "dynamic-programming"],
        questionType: "coding"
    },
    {
        title: "Binary Search",
        slug: "binary-search",
        description:
            "Given a sorted array and a target value, return the index of the target using binary search.",
        section: "binary-search",
        topic: "binary-search-basics",
        difficulty: "easy",
        tags: ["binary-search", "sorted-array"],
        questionType: "coding"
    },
    {
        title: "Search in Rotated Sorted Array",
        slug: "search-rotated-sorted-array",
        description:
            "Search for a target value in a rotated sorted array using logarithmic time.",
        section: "binary-search",
        topic: "search-in-rotated-array",
        difficulty: "medium",
        tags: ["binary-search", "rotated-array"],
        questionType: "coding"
    },
    {
        title: "Valid Palindrome",
        slug: "valid-palindrome",
        description:
            "Determine whether a string is a palindrome after considering only valid characters.",
        section: "strings",
        topic: "palindrome-problems",
        difficulty: "easy",
        tags: ["string", "palindrome", "two-pointer"],
        questionType: "coding"
    },
    {
        title: "Reverse a Linked List",
        slug: "reverse-linked-list",
        description:
            "Reverse a singly linked list and return its new head.",
        section: "linked-list",
        topic: "reverse-linked-list",
        difficulty: "easy",
        tags: ["linked-list", "reverse"],
        questionType: "coding"
    },
    {
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        description:
            "Determine whether a string containing brackets is properly balanced.",
        section: "stack-queue",
        topic: "stack-basics",
        difficulty: "easy",
        tags: ["stack", "parentheses"],
        questionType: "coding"
    },
    {
        title: "Binary Tree Level Order Traversal",
        slug: "binary-tree-level-order-traversal",
        description:
            "Return the level-order traversal of a binary tree.",
        section: "binary-tree",
        topic: "level-order-traversal",
        difficulty: "medium",
        tags: ["binary-tree", "bfs", "queue"],
        questionType: "coding"
    },
    {
        title: "Number of Islands",
        slug: "number-of-islands",
        description:
            "Count the number of connected groups of land cells in a grid.",
        section: "graph",
        topic: "bfs",
        difficulty: "medium",
        tags: ["graph", "bfs", "dfs", "grid"],
        questionType: "coding"
    },
    {
        title: "Climbing Stairs",
        slug: "climbing-stairs",
        description:
            "Count the number of distinct ways to reach the top when you can climb one or two steps at a time.",
        section: "dynamic-programming",
        topic: "1d-dynamic-programming",
        difficulty: "easy",
        tags: ["dp", "recursion", "memoization"],
        questionType: "coding"
    }
];

const seedDSAQuestions = async () => {
    try {
        await connectDB();

        const dsaCategory = await Category.findOne({
            slug: "dsa"
        });

        if (!dsaCategory) {
            console.log("DSA category not found.");
            process.exit(1);
        }

        await Question.deleteMany({
            category: dsaCategory._id
        });

        let insertedQuestions = [];

        for (const item of questionData) {
            const section = await DSASection.findOne({
                slug: item.section,
                category: dsaCategory._id
            });

            if (!section) {
                console.log(
                    `Section not found: ${item.section}`
                );
                continue;
            }

            const topic = await Topic.findOne({
                slug: item.topic,
                section: section._id
            });

            if (!topic) {
                console.log(
                    `Topic not found: ${item.topic}`
                );
                continue;
            }

            insertedQuestions.push({
                title: item.title,
                slug: item.slug,
                description: item.description,

                category: dsaCategory._id,
                section: section._id,
                topic: topic._id,

                difficulty: item.difficulty,

                tags: item.tags,

                questionType: item.questionType,

                sourceType: "practice",

                isFrequentlyAsked: false,

                isPublished: true
            });
        }

        if (insertedQuestions.length === 0) {
            console.log("No questions were inserted.");
            process.exit(1);
        }

        await Question.insertMany(insertedQuestions);

        console.log(
            "DSA questions seeded successfully!"
        );

        console.log(
            `Total questions: ${insertedQuestions.length}`
        );

        process.exit(0);

    } catch (error) {
        console.error(
            "DSA question seed error:",
            error
        );

        process.exit(1);
    }
};

seedDSAQuestions();