import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Question from "../models/Questions.js";

dotenv.config();

const questions = [
    // =========================================================
    // 1. FIND LARGEST ELEMENT
    // =========================================================
    {
        slug: "find-largest-element-in-an-array",

        description: `
Given an array of integers, find the largest element in the array.

Return the largest element.
        `.trim(),

        starterCode: {
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
        },

        examples: [
            {
                input: "5\n1 5 3 9 2",
                output: "9",
                explanation: "9 is the largest element in the array."
            },
            {
                input: "4\n10 20 5 7",
                output: "20",
                explanation: "20 is greater than every other element."
            },
            {
                input: "3\n-10 -5 -20",
                output: "-5",
                explanation: "-5 is the largest value among the negative numbers."
            }
        ],

        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9"
        ],

        hiddenTestCases: [
            {
                input: "5\n1 5 3 9 2",
                output: "9"
            },
            {
                input: "4\n10 20 5 7",
                output: "20"
            },
            {
                input: "3\n-10 -5 -20",
                output: "-5"
            },
            {
                input: "6\n100 20 300 40 50 10",
                output: "300"
            }
        ]
    },

    // =========================================================
    // 2. REVERSE AN ARRAY
    // =========================================================
    {
        slug: "reverse-an-array",

        description: `
Given an array of integers, reverse the array in place.

You must modify the original array without using another array.

Return the reversed array.
        `.trim(),

        starterCode: {
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
        },

        examples: [
            {
                input: "5\n1 2 3 4 5",
                output: "5 4 3 2 1",
                explanation: "The array is reversed in place."
            },
            {
                input: "4\n10 20 30 40",
                output: "40 30 20 10",
                explanation: "All elements appear in reverse order."
            },
            {
                input: "1\n7",
                output: "7",
                explanation: "An array with one element remains unchanged."
            }
        ],

        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9",
            "The array must be reversed in place",
            "Do not use another array to store the reversed result"
        ],

        hiddenTestCases: [
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
        ]
    },

    // =========================================================
    // 3. TWO SUM
    // =========================================================
    {
        slug: "two-sum",

        description: `
Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution.

You cannot use the same element twice.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);

    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int target;
    cin >> target;

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

        int target = sc.nextInt();

        // Write your solution here


    }
}`,

            python: `n = int(input())

nums = list(map(int, input().split()))

target = int(input())

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

const target = input[index++];

// Write your solution here
`
        },

        examples: [
            {
                input: "4\n2 7 11 15\n9",
                output: "0 1",
                explanation: "nums[0] + nums[1] = 2 + 7 = 9."
            },
            {
                input: "3\n3 2 4\n6",
                output: "1 2",
                explanation: "nums[1] + nums[2] = 2 + 4 = 6."
            },
            {
                input: "2\n3 3\n6",
                output: "0 1",
                explanation: "The two elements add up to the target."
            }
        ],

        constraints: [
            "2 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Exactly one valid solution exists"
        ],

        hiddenTestCases: [
            {
                input: "4\n2 7 11 15\n9",
                output: "0 1"
            },
            {
                input: "3\n3 2 4\n6",
                output: "1 2"
            },
            {
                input: "2\n3 3\n6",
                output: "0 1"
            },
            {
                input: "5\n10 20 30 40 50\n90",
                output: "3 4"
            }
        ]
    },

    // =========================================================
    // 4. MAXIMUM SUBARRAY SUM
    // =========================================================
    {
        slug: "maximum-subarray-sum",

        description: `
Given an integer array nums, find the subarray with the largest sum and return its sum.

A subarray is a contiguous part of an array.
        `.trim(),

        starterCode: {
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
        },

        examples: [
            {
                input: "9\n-2 1 -3 4 -1 2 1 -5 4",
                output: "6",
                explanation: "The maximum subarray is [4, -1, 2, 1] with sum 6."
            },
            {
                input: "5\n1 2 3 4 5",
                output: "15",
                explanation: "The entire array has the maximum sum."
            }
        ],

        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4"
        ],

        hiddenTestCases: [
            {
                input: "9\n-2 1 -3 4 -1 2 1 -5 4",
                output: "6"
            },
            {
                input: "5\n1 2 3 4 5",
                output: "15"
            },
            {
                input: "3\n-5 -2 -8",
                output: "-2"
            }
        ]
    },

    // =========================================================
    // 5. BINARY SEARCH
    // =========================================================
    {
        slug: "binary-search",

        description: `
Given a sorted array of integers nums and a target value, return the index of target if it exists in the array.

If target does not exist, return -1.

You must solve the problem using binary search.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);

    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int target;
    cin >> target;

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

        int target = sc.nextInt();

        // Write your solution here


    }
}`,

            python: `n = int(input())

nums = list(map(int, input().split()))

target = int(input())

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

const target = input[index++];

// Write your solution here
`
        },

        examples: [
            {
                input: "6\n-1 0 3 5 9 12\n9",
                output: "4",
                explanation: "The target 9 is present at index 4."
            },
            {
                input: "6\n-1 0 3 5 9 12\n2",
                output: "-1",
                explanation: "The target 2 does not exist in the array."
            }
        ],

        constraints: [
            "1 <= nums.length <= 10^5",
            "nums is sorted in ascending order",
            "-10^9 <= nums[i] <= 10^9"
        ],

        hiddenTestCases: [
            {
                input: "6\n-1 0 3 5 9 12\n9",
                output: "4"
            },
            {
                input: "6\n-1 0 3 5 9 12\n2",
                output: "-1"
            },
            {
                input: "5\n1 3 5 7 9\n1",
                output: "0"
            },
            {
                input: "5\n1 3 5 7 9\n9",
                output: "4"
            }
        ]
    },

    // =========================================================
    // 6. SEARCH IN ROTATED SORTED ARRAY
    // =========================================================
    {
        slug: "search-in-rotated-sorted-array",

        description: `
You are given an array of distinct integers nums sorted in ascending order that has been rotated at an unknown position.

Given a target value, return its index if it exists in nums.

Otherwise, return -1.

You must solve the problem in O(log n) time.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);

    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int target;
    cin >> target;

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

        int target = sc.nextInt();

        // Write your solution here


    }
}`,

            python: `n = int(input())

nums = list(map(int, input().split()))

target = int(input())

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

const target = input[index++];

// Write your solution here
`
        },

        examples: [
            {
                input: "7\n4 5 6 7 0 1 2\n0",
                output: "4",
                explanation: "The target 0 is present at index 4."
            },
            {
                input: "7\n4 5 6 7 0 1 2\n3",
                output: "-1",
                explanation: "The target 3 is not present."
            }
        ],

        constraints: [
            "1 <= nums.length <= 10^5",
            "All values in nums are distinct",
            "-10^9 <= nums[i] <= 10^9"
        ],

        hiddenTestCases: [
            {
                input: "7\n4 5 6 7 0 1 2\n0",
                output: "4"
            },
            {
                input: "7\n4 5 6 7 0 1 2\n3",
                output: "-1"
            },
            {
                input: "5\n5 1 2 3 4\n3",
                output: "3"
            }
        ]
    },

    // =========================================================
    // 7. VALID PALINDROME
    // =========================================================
    {
        slug: "valid-palindrome",

        description: `
Given a string s, determine whether it is a palindrome.

A palindrome is a string that reads the same forward and backward.

Consider only alphanumeric characters and ignore case.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    // Write your solution here


    return 0;
}`,

            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        // Write your solution here


    }
}`,

            python: `s = input()

# Write your solution here
`,

            javascript: `const fs = require("fs");

const s = fs.readFileSync(0, "utf8").trim();

// Write your solution here
`
        },

        examples: [
            {
                input: "A man, a plan, a canal: Panama",
                output: "true",
                explanation: "After removing non-alphanumeric characters and ignoring case, the string is a palindrome."
            },
            {
                input: "race a car",
                output: "false",
                explanation: "The cleaned string is not a palindrome."
            },
            {
                input: " ",
                output: "true",
                explanation: "An empty string after cleaning is considered a palindrome."
            }
        ],

        constraints: [
            "1 <= s.length <= 2 * 10^5",
            "s consists only of printable ASCII characters"
        ],

        hiddenTestCases: [
            {
                input: "A man, a plan, a canal: Panama",
                output: "true"
            },
            {
                input: "race a car",
                output: "false"
            },
            {
                input: "Madam",
                output: "true"
            }
        ]
    },

    // =========================================================
    // 8. REVERSE A LINKED LIST
    // =========================================================
    {
        slug: "reverse-a-linked-list",

        description: `
Given the head of a singly linked list, reverse the linked list and return the reversed list.

The input contains the number of nodes followed by the node values.
        `.trim(),

        starterCode: {
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
        },

        examples: [
            {
                input: "5\n1 2 3 4 5",
                output: "5 4 3 2 1",
                explanation: "The linked list is reversed so that the last node becomes the head."
            },
            {
                input: "2\n1 2",
                output: "2 1",
                explanation: "The links are reversed between the two nodes."
            }
        ],

        constraints: [
            "0 <= number of nodes <= 5000",
            "-5000 <= Node.val <= 5000"
        ],

        hiddenTestCases: [
            {
                input: "5\n1 2 3 4 5",
                output: "5 4 3 2 1"
            },
            {
                input: "2\n1 2",
                output: "2 1"
            },
            {
                input: "1\n7",
                output: "7"
            }
        ]
    },

    // =========================================================
    // 9. VALID PARENTHESES
    // =========================================================
    {
        slug: "valid-parentheses",

        description: `
Given a string s containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
- Open brackets are closed by the same type of brackets.
- Open brackets are closed in the correct order.
- Every closing bracket has a corresponding opening bracket.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;

    // Write your solution here


    return 0;
}`,

            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String s = sc.next();

        // Write your solution here


    }
}`,

            python: `s = input()

# Write your solution here
`,

            javascript: `const fs = require("fs");

const s = fs.readFileSync(0, "utf8").trim();

// Write your solution here
`
        },

        examples: [
            {
                input: "()",
                output: "true",
                explanation: "The parentheses are correctly matched."
            },
            {
                input: "()[]{}",
                output: "true",
                explanation: "All brackets are correctly closed."
            },
            {
                input: "(]",
                output: "false",
                explanation: "The opening parenthesis is closed by the wrong bracket."
            },
            {
                input: "([)]",
                output: "false",
                explanation: "The brackets are not closed in the correct order."
            }
        ],

        constraints: [
            "1 <= s.length <= 10^4",
            "s consists only of parentheses, brackets and braces"
        ],

        hiddenTestCases: [
            {
                input: "()",
                output: "true"
            },
            {
                input: "()[]{}",
                output: "true"
            },
            {
                input: "(]",
                output: "false"
            },
            {
                input: "([)]",
                output: "false"
            },
            {
                input: "{[]}",
                output: "true"
            }
        ]
    },

    // =========================================================
    // 10. BINARY TREE LEVEL ORDER TRAVERSAL
    // =========================================================
    {
        slug: "binary-tree-level-order-traversal",

        description: `
Given the root of a binary tree, return the level order traversal of its nodes' values.

Level order traversal visits the tree level by level from left to right.

For this coding platform, the tree is provided as a level-order array where -1 represents a null node.

Print the traversal level by level.
        `.trim(),

        starterCode: {
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
        },

        examples: [
            {
                input: "7\n3 9 20 -1 -1 15 7",
                output: "3 9 20 15 7",
                explanation: "Nodes are visited level by level from left to right."
            },
            {
                input: "3\n1 2 3",
                output: "1 2 3",
                explanation: "The first level contains 1 and the second level contains 2 and 3."
            }
        ],

        constraints: [
            "1 <= number of nodes <= 2000",
            "-1000 <= Node.val <= 1000",
            "-1 represents a null node"
        ],

        hiddenTestCases: [
            {
                input: "7\n3 9 20 -1 -1 15 7",
                output: "3 9 20 15 7"
            },
            {
                input: "3\n1 2 3",
                output: "1 2 3"
            },
            {
                input: "1\n5",
                output: "5"
            }
        ]
    },

    // =========================================================
    // 11. NUMBER OF ISLANDS
    // =========================================================
    {
        slug: "number-of-islands",

        description: `
Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

You may assume all four edges of the grid are surrounded by water.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;

    vector<vector<int>> grid(m, vector<int>(n));

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            cin >> grid[i][j];
        }
    }

    // Write your solution here


    return 0;
}`,

            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int m = sc.nextInt();
        int n = sc.nextInt();

        int[][] grid = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                grid[i][j] = sc.nextInt();
            }
        }

        // Write your solution here


    }
}`,

            python: `m, n = map(int, input().split())

grid = []

for _ in range(m):
    grid.append(list(map(int, input().split())))

# Write your solution here
`,

            javascript: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8")
    .trim()
    .split(/\\s+/)
    .map(Number);

let index = 0;

const m = input[index++];
const n = input[index++];

const grid = [];

for (let i = 0; i < m; i++) {
    const row = [];

    for (let j = 0; j < n; j++) {
        row.push(input[index++]);
    }

    grid.push(row);
}

// Write your solution here
`
        },

        examples: [
            {
                input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
                output: "1",
                explanation: "All land cells belong to one connected island."
            },
            {
                input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
                output: "3",
                explanation: "There are three separate islands."
            }
        ],

        constraints: [
            "1 <= m, n <= 300",
            "grid[i][j] is either 0 or 1",
            "Adjacent land is connected horizontally or vertically"
        ],

        hiddenTestCases: [
            {
                input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
                output: "1"
            },
            {
                input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1",
                output: "3"
            },
            {
                input: "1 1\n1",
                output: "1"
            },
            {
                input: "1 1\n0",
                output: "0"
            }
        ]
    },

    // =========================================================
    // 12. CLIMBING STAIRS
    // =========================================================
    {
        slug: "climbing-stairs",

        description: `
You are climbing a staircase.

It takes n steps to reach the top.

Each time you can either climb 1 step or 2 steps.

Given n, return the number of distinct ways you can climb to the top.
        `.trim(),

        starterCode: {
            cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Write your solution here


    return 0;
}`,

            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        // Write your solution here


    }
}`,

            python: `n = int(input())

# Write your solution here
`,

            javascript: `const fs = require("fs");

const n = Number(fs.readFileSync(0, "utf8").trim());

// Write your solution here
`
        },

        examples: [
            {
                input: "2",
                output: "2",
                explanation: "There are two ways: 1+1 and 2."
            },
            {
                input: "3",
                output: "3",
                explanation: "There are three ways: 1+1+1, 1+2 and 2+1."
            },
            {
                input: "5",
                output: "8",
                explanation: "There are eight distinct ways to reach the top."
            }
        ],

        constraints: [
            "1 <= n <= 45"
        ],

        hiddenTestCases: [
            {
                input: "2",
                output: "2"
            },
            {
                input: "3",
                output: "3"
            },
            {
                input: "5",
                output: "8"
            },
            {
                input: "10",
                output: "89"
            },
            {
                input: "20",
                output: "10946"
            }
        ]
    }
];


// =========================================================
// UPDATE ALL QUESTIONS
// =========================================================

const updateAllQuestions = async () => {
    try {
        await connectDB();

        let updated = 0;
        let notFound = 0;

        for (const data of questions) {
            const question = await Question.findOne({
                slug: data.slug
            });

            if (!question) {
                console.log(`❌ Not found: ${data.slug}`);
                notFound++;
                continue;
            }

            question.description = data.description;

            question.starterCode = data.starterCode;

            question.examples = data.examples;

            question.constraints = data.constraints;

            question.hiddenTestCases = data.hiddenTestCases;

            await question.save();

            console.log(`✅ Updated: ${question.title}`);

            updated++;
        }

        console.log("");
        console.log("========================================");
        console.log("DSA QUESTIONS UPDATE COMPLETE");
        console.log("========================================");
        console.log(`Updated: ${updated}`);
        console.log(`Not Found: ${notFound}`);
        console.log(`Total: ${questions.length}`);
        console.log("========================================");

        process.exit(0);

    } catch (error) {
        console.error("❌ Error updating DSA questions:", error);
        process.exit(1);
    }
};

updateAllQuestions();