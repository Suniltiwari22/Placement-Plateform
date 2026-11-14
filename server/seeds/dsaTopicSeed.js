import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";

dotenv.config();

const topicData = {
    "basics": [
        "Programming Basics",
        "Time Complexity",
        "Space Complexity",
        "Basic Maths",
        "Basic Recursion"
    ],

    "sorting": [
        "Selection Sort",
        "Bubble Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
        "Counting Sort"
    ],

    "arrays": [
        "Array Basics",
        "Easy Array Problems",
        "Medium Array Problems",
        "Hard Array Problems",
        "Kadane's Algorithm",
        "Prefix Sum",
        "Hashing with Arrays"
    ],

    "binary-search": [
        "Binary Search Basics",
        "Lower Bound",
        "Upper Bound",
        "Search in Rotated Array",
        "Binary Search on Answer"
    ],

    "strings": [
        "String Basics",
        "String Manipulation",
        "Character Frequency",
        "Palindrome Problems",
        "Anagram Problems",
        "Advanced String Problems"
    ],

    "linked-list": [
        "Linked List Basics",
        "Singly Linked List",
        "Doubly Linked List",
        "Fast and Slow Pointer",
        "Reverse Linked List",
        "Merge Linked Lists",
        "Advanced Linked List"
    ],

    "recursion": [
        "Recursion Basics",
        "Recursion on Arrays",
        "Recursion on Strings",
        "Subsequences",
        "Backtracking Basics",
        "Advanced Backtracking"
    ],

    "bit-manipulation": [
        "Bitwise Operators",
        "Bit Representation",
        "Set and Unset Bits",
        "XOR Problems",
        "Bit Manipulation Tricks"
    ],

    "stack-queue": [
        "Stack Basics",
        "Queue Basics",
        "Deque",
        "Monotonic Stack",
        "Infix Prefix Postfix",
        "Next Greater Element",
        "Advanced Stack Problems"
    ],

    "sliding-window-two-pointer": [
        "Two Pointer Basics",
        "Sliding Window Basics",
        "Fixed Size Window",
        "Variable Size Window",
        "Subarray Problems",
        "Advanced Sliding Window"
    ],

    "heap": [
        "Heap Basics",
        "Min Heap",
        "Max Heap",
        "Priority Queue",
        "Kth Largest and Smallest",
        "Top K Problems",
        "Advanced Heap Problems"
    ],

    "greedy": [
        "Greedy Basics",
        "Activity Selection",
        "Fractional Knapsack",
        "Scheduling Problems",
        "Interval Problems",
        "Advanced Greedy"
    ],

    "binary-tree": [
        "Binary Tree Basics",
        "Tree Traversals",
        "Preorder Traversal",
        "Inorder Traversal",
        "Postorder Traversal",
        "Level Order Traversal",
        "Tree Views",
        "Lowest Common Ancestor",
        "Advanced Binary Tree"
    ],

    "binary-search-tree": [
        "BST Basics",
        "Search in BST",
        "Insert in BST",
        "Delete in BST",
        "Validate BST",
        "Kth Smallest and Largest",
        "Advanced BST"
    ],

    "graph": [
        "Graph Basics",
        "BFS",
        "DFS",
        "Connected Components",
        "Cycle Detection",
        "Topological Sort",
        "Shortest Path",
        "Minimum Spanning Tree",
        "Disjoint Set Union",
        "Advanced Graph"
    ],

    "dynamic-programming": [
        "DP Basics",
        "1D Dynamic Programming",
        "2D Dynamic Programming",
        "Knapsack",
        "Subsequence DP",
        "String DP",
        "Grid DP",
        "Partition DP",
        "Advanced Dynamic Programming"
    ],

    "trie": [
        "Trie Basics",
        "Insert and Search",
        "Prefix Search",
        "Word Problems",
        "Advanced Trie"
    ],

    "advanced-topics": [
        "Advanced Data Structures",
        "Segment Tree",
        "Fenwick Tree",
        "Disjoint Set",
        "Advanced Graph Techniques",
        "Advanced Problem Solving"
    ]
};


const seedDSATopics = async () => {
    try {
        await connectDB();

        const dsaCategory = await Category.findOne({
            slug: "dsa"
        });

        if (!dsaCategory) {
            console.log("DSA category not found.");
            process.exit(1);
        }

        // Remove existing DSA topics
        await Topic.deleteMany({
            category: dsaCategory._id
        });

        let totalTopics = 0;

        for (const [sectionSlug, topicNames] of Object.entries(topicData)) {

            const section = await DSASection.findOne({
                slug: sectionSlug,
                category: dsaCategory._id
            });

            if (!section) {
                console.log(
                    `Section not found: ${sectionSlug}`
                );
                continue;
            }

            const topics = topicNames.map((name, index) => ({
                name,
                slug: name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),

                category: dsaCategory._id,

                section: section._id,

                description: `${name} problems and concepts`,

                order: index + 1,

                isActive: true
            }));

            await Topic.insertMany(topics);

            totalTopics += topics.length;
        }

        console.log("DSA topics seeded successfully!");
        console.log(`Total topics: ${totalTopics}`);

        process.exit(0);

    } catch (error) {

        console.error("DSA topic seed error:", error);

        process.exit(1);
    }
};

seedDSATopics();