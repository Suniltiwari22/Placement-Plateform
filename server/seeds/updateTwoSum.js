// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import connectDB from "../config/db.js";
// import Question from "../models/Questions.js";

// dotenv.config();

// const updateTwoSum = async () => {
//     try {
//         await connectDB();

//         const question = await Question.findOne({
//             slug: "two-sum"
//         });

//         if (!question) {
//             console.log("Two Sum question not found");
//             process.exit(1);
//         }

//         question.starterCode = {
//             cpp: `#include <bits/stdc++.h>
// using namespace std;

// int main() {
//     int n;
//     cin >> n;

//     vector<int> nums(n);

//     for (int i = 0; i < n; i++) {
//         cin >> nums[i];
//     }

//     int target;
//     cin >> target;

//     // Write your solution here

//     return 0;
// }`,

//             java: `import java.util.*;

// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);

//         int n = sc.nextInt();

//         int[] nums = new int[n];

//         for (int i = 0; i < n; i++) {
//             nums[i] = sc.nextInt();
//         }

//         int target = sc.nextInt();

//         // Write your solution here

//     }
// }`,

//             python: `n = int(input())

// nums = list(map(int, input().split()))

// target = int(input())

// # Write your solution here
// `,

//             javascript: `const fs = require("fs");

// const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);

// let index = 0;

// const n = input[index++];

// const nums = [];

// for (let i = 0; i < n; i++) {
//     nums.push(input[index++]);
// }

// const target = input[index++];

// // Write your solution here
// `
//         };

//         question.examples = [
//             {
//                 input: "4\n2 7 11 15\n9",
//                 output: "[0,1]",
//                 explanation:
//                     "The elements at indices 0 and 1 are 2 and 7. Their sum is 9."
//             },
//             {
//                 input: "3\n3 2 4\n6",
//                 output: "[1,2]",
//                 explanation:
//                     "The elements at indices 1 and 2 are 2 and 4. Their sum is 6."
//             },
//             {
//                 input: "2\n3 3\n6",
//                 output: "[0,1]",
//                 explanation:
//                     "The two elements are both 3 and their sum is 6."
//             }
//         ];

//         question.constraints = [
//             "2 <= nums.length <= 10^4",
//             "-10^9 <= nums[i] <= 10^9",
//             "-10^9 <= target <= 10^9",
//             "Each input has exactly one valid answer",
//             "You may not use the same element twice"
//         ];

//         question.hiddenTestCases = [
//             {
//                 input: "4\n2 7 11 15\n9",
//                 output: "[0,1]"
//             },
//             {
//                 input: "3\n3 2 4\n6",
//                 output: "[1,2]"
//             },
//             {
//                 input: "2\n3 3\n6",
//                 output: "[0,1]"
//             },
//             {
//                 input: "5\n1 5 3 7 2\n8",
//                 output: "[1,2]"
//             },
//             {
//                 input: "6\n10 20 30 40 50 60\n90",
//                 output: "[2,3]"
//             }
//         ];

//         await question.save();

//         console.log("Two Sum updated successfully!");

//         process.exit(0);

//     } catch (error) {
//         console.error("Error updating Two Sum:", error);
//         process.exit(1);
//     }
// };

// updateTwoSum();