import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";

dotenv.config();

const sections = [
    {
        name: "Basics",
        slug: "basics",
        description: "Programming basics, time complexity and basic mathematics",
        order: 1
    },
    {
        name: "Sorting",
        slug: "sorting",
        description: "Important sorting algorithms and problems",
        order: 2
    },
    {
        name: "Arrays",
        slug: "arrays",
        description: "Easy, medium and hard array problems",
        order: 3
    },
    {
        name: "Binary Search",
        slug: "binary-search",
        description: "Binary search and search-based problems",
        order: 4
    },
    {
        name: "Strings",
        slug: "strings",
        description: "String manipulation and problem solving",
        order: 5
    },
    {
        name: "Linked List",
        slug: "linked-list",
        description: "Singly, doubly and circular linked list problems",
        order: 6
    },
    {
        name: "Recursion",
        slug: "recursion",
        description: "Recursion and backtracking fundamentals",
        order: 7
    },
    {
        name: "Bit Manipulation",
        slug: "bit-manipulation",
        description: "Bitwise operators and bit manipulation problems",
        order: 8
    },
    {
        name: "Stack & Queue",
        slug: "stack-queue",
        description: "Stack, queue, deque and related problems",
        order: 9
    },
    {
        name: "Sliding Window & Two Pointer",
        slug: "sliding-window-two-pointer",
        description: "Sliding window and two pointer techniques",
        order: 10
    },
    {
        name: "Heap",
        slug: "heap",
        description: "Heap and priority queue problems",
        order: 11
    },
    {
        name: "Greedy",
        slug: "greedy",
        description: "Greedy algorithms and optimization problems",
        order: 12
    },
    {
        name: "Binary Tree",
        slug: "binary-tree",
        description: "Binary tree traversal and important problems",
        order: 13
    },
    {
        name: "Binary Search Tree",
        slug: "binary-search-tree",
        description: "BST concepts and problems",
        order: 14
    },
    {
        name: "Graph",
        slug: "graph",
        description: "Graph traversal and graph algorithms",
        order: 15
    },
    {
        name: "Dynamic Programming",
        slug: "dynamic-programming",
        description: "Dynamic programming from basic to advanced",
        order: 16
    },
    {
        name: "Trie",
        slug: "trie",
        description: "Trie data structure and problems",
        order: 17
    },
    {
        name: "Advanced Topics",
        slug: "advanced-topics",
        description: "Advanced DSA concepts and problem solving",
        order: 18
    }
];

const seedDSASections = async () => {
    try {
        await connectDB();

        // Find DSA category
        const dsaCategory = await Category.findOne({
            slug: "dsa"
        });

        if (!dsaCategory) {
            console.log("DSA category not found.");
            console.log("Please create the DSA category first.");
            process.exit(1);
        }

        // Remove existing DSA sections
        await DSASection.deleteMany({
            category: dsaCategory._id
        });

        // Add category ID to every section
        const sectionsWithCategory = sections.map((section) => ({
            ...section,
            category: dsaCategory._id
        }));

        // Insert sections
        await DSASection.insertMany(sectionsWithCategory);

        console.log("DSA sections seeded successfully!");
        console.log(`Total sections: ${sectionsWithCategory.length}`);

        process.exit(0);
    } catch (error) {
        console.error("DSA section seed error:", error);
        process.exit(1);
    }
};

seedDSASections();