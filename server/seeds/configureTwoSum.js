import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Question from "../models/Questions.js";

dotenv.config();

const configureTwoSum = async () => {
    try {
        await connectDB();

        const question = await Question.findOne({
            slug: "two-sum"
        });

        if (!question) {
            console.log("Two Sum question not found.");
            process.exitCode = 1;
            return;
        }

        question.executionMode = "function";
        question.functionName = "twoSum";

        question.starterCode = {
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

    }
};`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {

    }
}`,
            python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        pass`,
            javascript: `var twoSum = function(nums, target) {

};`
        };

        question.driverCode = {
            cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    vector<int> nums;
    stringstream ss(line);
    int value;

    while (ss >> value) {
        nums.push_back(value);
    }

    int target;
    cin >> target;

    Solution solution;
    vector<int> answer = solution.twoSum(nums, target);

    sort(answer.begin(), answer.end());

    cout << "[";
    for (int i = 0; i < answer.size(); i++) {
        if (i > 0) cout << ",";
        cout << answer[i];
    }
    cout << "]";

    return 0;
}
`,
            java: `
import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String line = sc.nextLine().trim();
        int[] nums;

        if (line.isEmpty()) {
            nums = new int[0];
        } else {
            nums = Arrays.stream(line.split("\\\\s+"))
                         .mapToInt(Integer::parseInt)
                         .toArray();
        }

        int target = sc.nextInt();

        Solution solution = new Solution();
        int[] answer = solution.twoSum(nums, target);

        Arrays.sort(answer);
        System.out.println(Arrays.toString(answer)
                               .replace(" ", ""));
    }
}
`,
            python: `
import sys

nums_line = sys.stdin.readline().strip()
nums = list(map(int, nums_line.split())) if nums_line else []
target = int(sys.stdin.readline())

solution = Solution()
answer = solution.twoSum(nums, target)
print(sorted(answer))
`,
            javascript: `
const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
const numsLength = input.length > 1 ? input.length - 1 : 0;
const nums = input.slice(0, numsLength).map(Number);
const target = Number(input[numsLength]);

const answer = twoSum(nums, target);
console.log(JSON.stringify([...answer].sort((a, b) => a - b)));
`
        };

        question.examples = [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "nums[0] + nums[1] equals 9."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "nums[1] + nums[2] equals 6."
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
                explanation: "The two different elements sum to 6."
            }
        ];

        question.hiddenTestCases = [
            { input: "2 7 11 15\n9", output: "[0,1]" },
            { input: "3 2 4\n6", output: "[1,2]" },
            { input: "3 3\n6", output: "[0,1]" },
            { input: "1 5 3 7\n8", output: "[2,3]" },
            { input: "-1 -2 -3 -4 -5\n-8", output: "[2,4]" }
        ];

        await question.save();

        console.log("Two Sum configured successfully.");
        console.log("Execution mode:", question.executionMode);
    } catch (error) {
        console.error("Configuration error:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.connection.close();
    }
};

configureTwoSum();

