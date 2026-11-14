import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Question from "../models/Questions.js";

dotenv.config();

const updateReverseArray = async () => {
    try {
        await connectDB();

        const question = await Question.findOne({
            slug: "reverse-an-array"
        });

        if (!question) {
            console.log("Reverse an Array question not found");
            process.exit(1);
        }

        question.description = `
Given an array of integers, reverse the array in place.

You must modify the original array without using another array.

Return the reversed array.
        `.trim();

        question.starterCode = {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);

    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    // Write your solution here


    return 0;
}`,

            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] nums = new int[n];

        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }

        // Write your solution here


    }
}`,

            python: `n = int(input())

nums = list(map(int, input().split()))

# Write your solution here

`,

            javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8")
    .trim()
    .split(/\\s+/)
    .map(Number);

let index = 0;

const n = input[index++];

const nums = [];

for (let i = 0; i < n; i++) {
    nums.push(input[index++]);
}

// Write your solution here

`
        };

        question.examples = [
            {
                input: "5\n1 2 3 4 5",
                output: "5 4 3 2 1",
                explanation:
                    "The array is reversed in place. The first element becomes the last element and so on."
            },
            {
                input: "4\n10 20 30 40",
                output: "40 30 20 10",
                explanation:
                    "After reversing, the elements appear in the opposite order."
            },
            {
                input: "1\n7",
                output: "7",
                explanation:
                    "An array containing one element remains unchanged."
            }
        ];

        question.constraints = [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9",
            "The array must be reversed in place",
            "Do not use another array to store the reversed result"
        ];

        question.hiddenTestCases = [
            {
                input: "5\n1 2 3 4 5",
                output: "5 4 3 2 1"
            },
            {
                input: "4\n10 20 30 40",
                output: "40 30 20 10"
            },
            {
                input: "1\n7",
                output: "7"
            },
            {
                input: "6\n1 2 3 4 5 6",
                output: "6 5 4 3 2 1"
            },
            {
                input: "5\n-5 -2 0 3 10",
                output: "10 3 0 -2 -5"
            }
        ];

        await question.save();

        console.log("Reverse an Array updated successfully!");

        process.exit(0);

    } catch (error) {
        console.error("Error updating Reverse an Array:", error);
        process.exit(1);
    }
};

updateReverseArray();