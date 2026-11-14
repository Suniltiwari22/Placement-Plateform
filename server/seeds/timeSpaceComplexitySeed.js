import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";
import Question from "../models/Questions.js";

dotenv.config();

const theoryQuestions = [
    {
        title: "Time Complexity: Complete Theory",
        slug: "time-complexity-complete-theory",
        topicSlug: "time-complexity",
        description: `# 1. Definition of Time Complexity

Time complexity describes how the number of operations performed by an algorithm grows as the input size n increases.

We generally express it using Big-O notation, such as O(1), O(log n), O(n), O(n log n), and O(n^2).

Time complexity does not directly measure seconds. It describes how the algorithm scales with input size.

# 2. Why Is Time Complexity Important?

Two algorithms can solve the same problem but perform very differently for large inputs.

For example, finding an element by checking every array element takes O(n) time. Binary search takes O(log n) time, but requires a sorted array.

For one million elements, binary search needs approximately 20 halving steps, whereas linear search may inspect up to one million elements.

# 3. Common Time Complexities

O(1) — Constant Time
The number of operations stays approximately constant as n grows.

Example:
int getFirst(vector<int>& arr) {
    return arr[0];
}

O(log n) — Logarithmic Time
The problem size is reduced by a constant factor at each step.

Example: Binary search on a sorted array.

O(n) — Linear Time
The algorithm processes each element a constant number of times.

Example:
for (int x : arr) {
    cout << x << " ";
}

O(n log n) — Linearithmic Time
Common in efficient comparison sorting algorithms such as merge sort.

O(n^2) — Quadratic Time
Often occurs when two loops each iterate over n elements.

Example:
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // Constant-time operation
    }
}

O(2^n) — Exponential Time
The number of operations can approximately double for each additional input element. A naive recursive Fibonacci algorithm is a common example.

O(n!) — Factorial Time
Can occur when an algorithm enumerates every permutation of n elements.

# 4. Understand Big-O Using Examples

Example A: Constant Time

int x = 10;
cout << x;

There are a constant number of operations. Complexity: O(1).

Example B: Linear Time

for (int i = 0; i < n; i++) {
    cout << i;
}

The loop executes n times. Complexity: O(n).

Example C: Quadratic Time

for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        cout << i << j;
    }
}

The inner operation executes n * n times. Complexity: O(n^2).

Example D: Logarithmic Time

while (n > 1) {
    n /= 2;
}

The value is halved in each iteration. Complexity: O(log n).

# 5. Line-by-Line Dry Run

Consider:

for (int i = 0; i < n; i++) {
    cout << i;
}

Suppose n = 4.

Iteration 1: i = 0; print 0.
Iteration 2: i = 1; print 1.
Iteration 3: i = 2; print 2.
Iteration 4: i = 3; print 3.

The loop body executes 4 times. For general input size n, it executes n times. Therefore, the time complexity is O(n).

# 6. Best, Average and Worst Case

Best case: The minimum work for an input of size n.
Average case: The expected work under a specified input distribution.
Worst case: The maximum work over inputs of size n.

For linear search:
- Best case: O(1), when the first element matches.
- Worst case: O(n), when the target is last or absent.
- Average case: O(n) under the usual assumptions.

# 7. Rules for Calculating Complexity

Rule 1: Ignore constant factors.
O(2n) becomes O(n).

Rule 2: Keep the fastest-growing term.
O(n^2 + n + 10) becomes O(n^2).

Rule 3: Sequential sections add their costs.
O(n) + O(n^2) becomes O(n^2).

Rule 4: Nested loops often multiply their iteration counts.
Two loops of n iterations each usually give O(n^2).

Rule 5: Halving or doubling a value repeatedly often produces logarithmic complexity.

# 8. Important Interview Note

Big-O describes an asymptotic upper bound. In everyday coding interviews, it is commonly used to discuss worst-case growth, but Big-O is not always identical to the worst-case complexity.

Also, O(n) is not necessarily faster than O(log n) for every small input. Big-O describes growth as the input becomes large.

# 9. Quick Revision

Constant operation: O(1)
Repeatedly halve input: O(log n)
One full traversal: O(n)
Efficient comparison sorting: commonly O(n log n)
Two full nested loops: commonly O(n^2)
Naive recursive Fibonacci: exponential time

Always identify the input size, count the dominant operations, and simplify the growth rate.`,
        answer: "Time complexity measures how algorithmic work grows with input size. Express the growth using asymptotic notation such as O(1), O(log n), O(n), O(n log n), and O(n^2).",
        explanation: "Count dominant operations rather than actual seconds. Simplify by removing constant factors and lower-order terms. State the input assumptions and whether you are discussing best, average, or worst case.",
        tags: ["DSA", "Time Complexity", "Big O", "Algorithms"],
        difficulty: "easy"
    },
    {
        title: "Space Complexity: Complete Theory",
        slug: "space-complexity-complete-theory",
        topicSlug: "space-complexity",
        description: `# 1. Definition of Space Complexity

Space complexity describes how the memory requirements of an algorithm grow as input size n increases.

Memory may be used by variables, arrays, hash maps, dynamically allocated objects, and recursive function calls.

We commonly express space complexity using Big-O notation.

# 2. Total Space vs Auxiliary Space

Total space includes memory used to store the input and the additional memory used by the algorithm.

Auxiliary space refers to the extra memory used by the algorithm, generally excluding the input storage itself.

Interview questions often ask for auxiliary space, so state which definition you are using.

# 3. Common Space Complexities

O(1) — Constant Auxiliary Space

int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];
}

Only a constant number of extra variables are used. Auxiliary space: O(1).

O(n) — Linear Space

vector<int> copy = arr;

The new vector stores n elements. Additional space: O(n).

O(log n) — Logarithmic Stack Space

A recursive binary search halves the search interval each time. Its recursion depth is O(log n).

O(n^2) — Quadratic Space

vector<vector<int>> matrix(n, vector<int>(n));

The matrix stores n * n elements. Space: O(n^2).

# 4. Example: Sum of an Array

int sumArray(vector<int>& arr) {
    int sum = 0;

    for (int i = 0; i < arr.size(); i++) {
        sum += arr[i];
    }

    return sum;
}

Time complexity: O(n), because every element is visited.
Auxiliary space complexity: O(1), because only a constant number of extra variables are used.

The input array is not counted as auxiliary space.

# 5. Example: Copy an Array

vector<int> copyArray(vector<int>& arr) {
    vector<int> result;

    for (int x : arr) {
        result.push_back(x);
    }

    return result;
}

Time complexity: O(n), because each element is copied.
Auxiliary space complexity: O(n), because the result stores n elements.

# 6. Recursion and Stack Space

Consider:

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

For n = 4, the calls are:

factorial(4)
  -> factorial(3)
      -> factorial(2)
          -> factorial(1)

There are O(n) active recursive calls in the general case. Therefore:
Time complexity: O(n).
Auxiliary stack space: O(n).

A recursive algorithm uses stack memory even if it does not create an array.

# 7. Line-by-Line Space Analysis

Consider:

int findMaximum(vector<int>& arr) {
    int maximum = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }

    return maximum;
}

Step 1: maximum stores one integer.
Step 2: i stores one loop index.
Step 3: Each iteration reuses these variables.
Step 4: No additional array or collection is created.

The auxiliary space remains constant as n increases. Complexity: O(1).

# 8. In-Place Algorithms

An in-place algorithm modifies the input or works directly on it without creating another data structure proportional to n.

Example: Reversing an array using two pointers and swapping elements uses O(1) auxiliary space.

By contrast, creating a second reversed array requires O(n) additional space.

Important: Recursive in-place algorithms can still use stack space.

# 9. Time and Space Trade-Off

Sometimes an algorithm uses extra memory to reduce execution time.

Example: Two Sum.

Brute force approach:
- Check every pair.
- Time: O(n^2).
- Auxiliary space: O(1).

Hash map approach:
- Store previously seen values.
- Expected time: O(n).
- Auxiliary space: O(n).

The hash map uses additional memory to improve performance.

# 10. Important Interview Notes

1. Always distinguish input storage from auxiliary space.
2. Count dynamically allocated arrays and containers.
3. Include recursive call-stack memory.
4. Ignore constant-sized variables when expressing asymptotic complexity.
5. Consider the largest-growing memory allocation.
6. Mention whether an analysis assumes average-case hash-map operations.

# 11. Quick Revision

Only a fixed number of variables: O(1) auxiliary space.
A second array containing n elements: O(n).
A recursion depth proportional to n: O(n) stack space.
A balanced divide-and-conquer recursion depth: often O(log n).
An n by n matrix: O(n^2).

Space complexity tells us how memory usage scales, not the exact number of bytes consumed by a particular machine.`,
        answer: "Space complexity measures memory growth with input size. Auxiliary space is the extra memory used by an algorithm beyond the input storage.",
        explanation: "Count additional containers, arrays, allocated objects, and recursive stack frames. A single traversal can take O(n) time while using O(1) auxiliary space.",
        tags: ["DSA", "Space Complexity", "Auxiliary Space", "Algorithms"],
        difficulty: "easy"
    }
];

const seedTheory = async () => {
    try {
        await connectDB();

        const category = await Category.findOne({ slug: "dsa" });
        const section = await DSASection.findOne({ slug: "basics" });

        if (!category || !section) {
            throw new Error("DSA category or Basics section not found.");
        }

        let created = 0;
        let updated = 0;

        for (const item of theoryQuestions) {
            const topic = await Topic.findOne({
                slug: item.topicSlug,
                category: category._id,
                section: section._id
            });

            if (!topic) {
                console.log(`Topic not found: ${item.topicSlug}`);
                continue;
            }

            const data = {
                title: item.title,
                slug: item.slug,
                description: item.description,
                answer: item.answer,
                explanation: item.explanation,
                tags: item.tags,
                difficulty: item.difficulty,
                category: category._id,
                section: section._id,
                topic: topic._id,
                questionType: "theory",
                executionMode: "stdin",
                sourceType: "curated",
                isPublished: true
            };

            const existing = await Question.findOne({
                slug: item.slug
            });

            if (existing) {
                Object.assign(existing, data);
                await existing.save();
                updated++;
                console.log(`Updated: ${item.title}`);
            } else {
                await Question.create(data);
                created++;
                console.log(`Created: ${item.title}`);
            }
        }

        console.log(`\nCreated: ${created}`);
        console.log(`Updated: ${updated}`);
    } catch (error) {
        console.error("Theory seed error:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.connection.close();
    }
};

seedTheory();