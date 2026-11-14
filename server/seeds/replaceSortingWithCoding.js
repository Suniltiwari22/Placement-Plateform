import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";
import Question from "../models/Questions.js";

dotenv.config();

const theorySlugs = [
    "selection-sort-complete-theory",
    "bubble-sort-complete-theory",
    "insertion-sort-complete-theory",
    "merge-sort-complete-theory",
    "quick-sort-complete-theory",
    "counting-sort-complete-theory"
];

const problems = [
    {
        title: "Sort an Array Using Selection Sort",
        slug: "selection-sort-array",
        topicSlug: "selection-sort",
        difficulty: "easy",
        description: `Given an array of integers nums, sort the array in ascending order using the Selection Sort algorithm.

Selection Sort repeatedly finds the minimum element in the unsorted portion and places it at the current position.

Implement the sorting algorithm yourself. Do not use a built-in sorting function.

Return the sorted array.

Example 1:
Input: nums = [64,25,12,22,11]
Output: [11,12,22,25,64]
Explanation: The minimum element is selected during each pass and moved to its correct position.

Example 2:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]

Example 3:
Input: nums = [1]
Output: [1]

Constraints:
- 1 <= nums.length <= 1000
- -10000 <= nums[i] <= 10000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Selection Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Selection Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement Selection Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement Selection Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }

            swap(nums[i], nums[minIndex]);
        }

        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            int minIndex = i;

            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] < nums[minIndex]) minIndex = j;
            }

            int temp = nums[i];
            nums[i] = nums[minIndex];
            nums[minIndex] = temp;
        }

        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        n = len(nums)

        for i in range(n - 1):
            min_index = i

            for j in range(i + 1, n):
                if nums[j] < nums[min_index]:
                    min_index = j

            nums[i], nums[min_index] = nums[min_index], nums[i]

        return nums`,
            javascript: `var sortArray = function(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) minIndex = j;
        }

        [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }

    return nums;
};`
        },
        examples: [
            { input: "[64,25,12,22,11]", output: "[11,12,22,25,64]", explanation: "Select the minimum on every pass." },
            { input: "[5,2,3,1]", output: "[1,2,3,5]", explanation: "Repeatedly place the minimum in the next position." },
            { input: "[1]", output: "[1]", explanation: "A single-element array is already sorted." }
        ],
        constraints: [
            "1 <= nums.length <= 1000",
            "-10000 <= nums[i] <= 10000"
        ],
        testCases: [
            { input: "5 64 25 12 22 11", output: "[11,12,22,25,64]" },
            { input: "4 5 2 3 1", output: "[1,2,3,5]" },
            { input: "1 1", output: "[1]" },
            { input: "5 -4 7 0 -2 3", output: "[-4,-2,0,3,7]" },
            { input: "6 3 3 2 1 2 1", output: "[1,1,2,2,3,3]" }
        ]
    },
    {
        title: "Sort an Array Using Bubble Sort",
        slug: "bubble-sort-array",
        topicSlug: "bubble-sort",
        difficulty: "easy",
        description: `Given an array of integers nums, sort it in ascending order using Bubble Sort.

Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order. Optimize your implementation to stop early if a complete pass makes no swaps.

Do not use a built-in sorting function.

Example 1:
Input: nums = [5,1,4,2,8]
Output: [1,2,4,5,8]

Example 2:
Input: nums = [3,2,1]
Output: [1,2,3]

Example 3:
Input: nums = [1,2,3]
Output: [1,2,3]

Constraints:
- 1 <= nums.length <= 1000
- -10000 <= nums[i] <= 10000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement optimized Bubble Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement optimized Bubble Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement optimized Bubble Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement optimized Bubble Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n - 1; i++) {
            bool swapped = false;

            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                    swapped = true;
                }
            }

            if (!swapped) break;
        }

        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            boolean swapped = false;

            for (int j = 0; j < nums.length - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                    swapped = true;
                }
            }

            if (!swapped) break;
        }

        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        n = len(nums)

        for i in range(n - 1):
            swapped = False

            for j in range(n - i - 1):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
                    swapped = True

            if not swapped:
                break

        return nums`,
            javascript: `var sortArray = function(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < nums.length - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return nums;
};`
        },
        examples: [
            { input: "[5,1,4,2,8]", output: "[1,2,4,5,8]", explanation: "Adjacent elements are swapped until ordered." },
            { input: "[3,2,1]", output: "[1,2,3]", explanation: "Each pass moves a large element toward the end." },
            { input: "[1,2,3]", output: "[1,2,3]", explanation: "The first pass detects that no swaps are needed." }
        ],
        constraints: [
            "1 <= nums.length <= 1000",
            "-10000 <= nums[i] <= 10000"
        ],
        testCases: [
            { input: "5 5 1 4 2 8", output: "[1,2,4,5,8]" },
            { input: "3 3 2 1", output: "[1,2,3]" },
            { input: "3 1 2 3", output: "[1,2,3]" },
            { input: "4 -1 5 0 -3", output: "[-3,-1,0,5]" },
            { input: "5 2 2 1 1 0", output: "[0,1,1,2,2]" }
        ]
    },
    {
        title: "Sort an Array Using Insertion Sort",
        slug: "insertion-sort-array",
        topicSlug: "insertion-sort",
        difficulty: "easy",
        description: `Given an array of integers nums, sort it in ascending order using Insertion Sort.

Insertion Sort builds a sorted prefix by inserting each new element into its correct position among the previously processed elements.

Do not use a built-in sorting function.

Example 1:
Input: nums = [5,3,4,1]
Output: [1,3,4,5]

Example 2:
Input: nums = [2,1]
Output: [1,2]

Example 3:
Input: nums = [1,2,3]
Output: [1,2,3]

Constraints:
- 1 <= nums.length <= 1000
- -10000 <= nums[i] <= 10000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Insertion Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Insertion Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement Insertion Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement Insertion Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            int key = nums[i];
            int j = i - 1;

            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }

            nums[j + 1] = key;
        }

        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i];
            int j = i - 1;

            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }

            nums[j + 1] = key;
        }

        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        for i in range(1, len(nums)):
            key = nums[i]
            j = i - 1

            while j >= 0 and nums[j] > key:
                nums[j + 1] = nums[j]
                j -= 1

            nums[j + 1] = key

        return nums`,
            javascript: `var sortArray = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        const key = nums[i];
        let j = i - 1;

        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }

        nums[j + 1] = key;
    }

    return nums;
};`
        },
        examples: [
            { input: "[5,3,4,1]", output: "[1,3,4,5]", explanation: "Each new element is inserted into the sorted prefix." },
            { input: "[2,1]", output: "[1,2]", explanation: "Move 1 before 2." },
            { input: "[1,2,3]", output: "[1,2,3]", explanation: "The already sorted array needs no shifts." }
        ],
        constraints: [
            "1 <= nums.length <= 1000",
            "-10000 <= nums[i] <= 10000"
        ],
        testCases: [
            { input: "4 5 3 4 1", output: "[1,3,4,5]" },
            { input: "2 2 1", output: "[1,2]" },
            { input: "3 1 2 3", output: "[1,2,3]" },
            { input: "5 -2 4 -5 0 3", output: "[-5,-2,0,3,4]" },
            { input: "5 3 3 2 2 1", output: "[1,2,2,3,3]" }
        ]
    },
    {
        title: "Sort an Array Using Merge Sort",
        slug: "merge-sort-array",
        topicSlug: "merge-sort",
        difficulty: "medium",
        description: `Given an array of integers nums, return the array sorted in ascending order using Merge Sort.

Merge Sort divides the array into smaller ranges, recursively sorts them, and merges the sorted ranges.

Do not use a built-in sorting function.

Example 1:
Input: nums = [38,27,43,3]
Output: [3,27,38,43]

Example 2:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]

Example 3:
Input: nums = [1]
Output: [1]

Constraints:
- 1 <= nums.length <= 100000
- -100000 <= nums[i] <= 100000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Merge Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Merge Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement Merge Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement Merge Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
    void merge(vector<int>& a, int l, int m, int r) {
        vector<int> temp;
        int i = l, j = m + 1;

        while (i <= m && j <= r) {
            if (a[i] <= a[j]) temp.push_back(a[i++]);
            else temp.push_back(a[j++]);
        }

        while (i <= m) temp.push_back(a[i++]);
        while (j <= r) temp.push_back(a[j++]);

        for (int k = 0; k < temp.size(); k++) {
            a[l + k] = temp[k];
        }
    }

    void divide(vector<int>& a, int l, int r) {
        if (l >= r) return;

        int m = l + (r - l) / 2;
        divide(a, l, m);
        divide(a, m + 1, r);
        merge(a, l, m, r);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        if (!nums.empty()) divide(nums, 0, nums.size() - 1);
        return nums;
    }
};`,
            java: `class Solution {
    private void merge(int[] a, int l, int m, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;

        while (i <= m && j <= r) {
            if (a[i] <= a[j]) temp[k++] = a[i++];
            else temp[k++] = a[j++];
        }

        while (i <= m) temp[k++] = a[i++];
        while (j <= r) temp[k++] = a[j++];

        for (int x = 0; x < temp.length; x++) a[l + x] = temp[x];
    }

    private void divide(int[] a, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        divide(a, l, m);
        divide(a, m + 1, r);
        merge(a, l, m, r);
    }

    public int[] sortArray(int[] nums) {
        if (nums.length > 0) divide(nums, 0, nums.length - 1);
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        def divide(a):
            if len(a) <= 1:
                return a

            mid = len(a) // 2
            left = divide(a[:mid])
            right = divide(a[mid:])

            result = []
            i = j = 0

            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1

            result.extend(left[i:])
            result.extend(right[j:])
            return result

        return divide(nums)`,
            javascript: `var sortArray = function(nums) {
    function divide(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = divide(arr.slice(0, mid));
        const right = divide(arr.slice(mid));

        const result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) result.push(left[i++]);
            else result.push(right[j++]);
        }

        return result.concat(left.slice(i), right.slice(j));
    }

    return divide(nums);
};`
        },
        examples: [
            { input: "[38,27,43,3]", output: "[3,27,38,43]", explanation: "Sort each half, then merge them." },
            { input: "[5,2,3,1]", output: "[1,2,3,5]", explanation: "Recursively split and merge." },
            { input: "[1]", output: "[1]", explanation: "A single element is already sorted." }
        ],
        constraints: [
            "1 <= nums.length <= 100000",
            "-100000 <= nums[i] <= 100000"
        ],
        testCases: [
            { input: "4 38 27 43 3", output: "[3,27,38,43]" },
            { input: "4 5 2 3 1", output: "[1,2,3,5]" },
            { input: "1 1", output: "[1]" },
            { input: "5 -5 10 0 -2 4", output: "[-5,-2,0,4,10]" },
            { input: "6 3 3 2 1 2 1", output: "[1,1,2,2,3,3]" }
        ]
    },
    {
        title: "Sort an Array Using Quick Sort",
        slug: "quick-sort-array",
        topicSlug: "quick-sort",
        difficulty: "medium",
        description: `Given an array of integers nums, sort it in ascending order using Quick Sort.

Choose a pivot, partition the array around it, and recursively sort the resulting partitions.

Do not use a built-in sorting function.

Example 1:
Input: nums = [4,2,6,1,3]
Output: [1,2,3,4,6]

Example 2:
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]

Example 3:
Input: nums = [-2,3,-5]
Output: [-5,-2,3]

Constraints:
- 1 <= nums.length <= 100000
- -100000 <= nums[i] <= 100000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Quick Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Quick Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement Quick Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement Quick Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
    int partition(vector<int>& a, int low, int high) {
        int pivot = a[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (a[j] <= pivot) {
                swap(a[++i], a[j]);
            }
        }

        swap(a[i + 1], a[high]);
        return i + 1;
    }

    void quickSort(vector<int>& a, int low, int high) {
        if (low >= high) return;

        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        if (!nums.empty()) quickSort(nums, 0, nums.size() - 1);
        return nums;
    }
};`,
            java: `class Solution {
    private int partition(int[] a, int low, int high) {
        int pivot = a[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (a[j] <= pivot) {
                i++;
                int t = a[i]; a[i] = a[j]; a[j] = t;
            }
        }

        int t = a[i + 1];
        a[i + 1] = a[high];
        a[high] = t;
        return i + 1;
    }

    private void quickSort(int[] a, int low, int high) {
        if (low >= high) return;
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);
        quickSort(a, p + 1, high);
    }

    public int[] sortArray(int[] nums) {
        if (nums.length > 0) quickSort(nums, 0, nums.length - 1);
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        def quick_sort(low, high):
            if low >= high:
                return

            pivot = nums[high]
            i = low - 1

            for j in range(low, high):
                if nums[j] <= pivot:
                    i += 1
                    nums[i], nums[j] = nums[j], nums[i]

            nums[i + 1], nums[high] = nums[high], nums[i + 1]
            p = i + 1

            quick_sort(low, p - 1)
            quick_sort(p + 1, high)

        if nums:
            quick_sort(0, len(nums) - 1)

        return nums`,
            javascript: `var sortArray = function(nums) {
    function quickSort(low, high) {
        if (low >= high) return;

        const pivot = nums[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                i++;
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }

        [nums[i + 1], nums[high]] = [nums[high], nums[i + 1]];
        const p = i + 1;

        quickSort(low, p - 1);
        quickSort(p + 1, high);
    }

    if (nums.length) quickSort(0, nums.length - 1);
    return nums;
};`
        },
        examples: [
            { input: "[4,2,6,1,3]", output: "[1,2,3,4,6]", explanation: "Partition around a pivot and sort both sides." },
            { input: "[5,1,1,2,0,0]", output: "[0,0,1,1,2,5]", explanation: "Duplicate values are supported." },
            { input: "[-2,3,-5]", output: "[-5,-2,3]", explanation: "Negative integers are supported." }
        ],
        constraints: [
            "1 <= nums.length <= 100000",
            "-100000 <= nums[i] <= 100000"
        ],
        testCases: [
            { input: "5 4 2 6 1 3", output: "[1,2,3,4,6]" },
            { input: "6 5 1 1 2 0 0", output: "[0,0,1,1,2,5]" },
            { input: "3 -2 3 -5", output: "[-5,-2,3]" },
            { input: "5 1 2 3 4 5", output: "[1,2,3,4,5]" },
            { input: "5 5 4 3 2 1", output: "[1,2,3,4,5]" }
        ]
    },
    {
        title: "Sort an Array Using Counting Sort",
        slug: "counting-sort-array",
        topicSlug: "counting-sort",
        difficulty: "medium",
        description: `Given an array of integers nums, sort it in ascending order using Counting Sort.

Count the frequency of each integer and use the counts to reconstruct the sorted array. Do not use a built-in sorting function.

For this problem, values can be negative. Your implementation must handle negative and positive integers.

Example 1:
Input: nums = [4,2,2,8,3,3,1]
Output: [1,2,2,3,3,4,8]

Example 2:
Input: nums = [-5,-1,3,-1,0]
Output: [-5,-1,-1,0,3]

Example 3:
Input: nums = [1,1,1]
Output: [1,1,1]

Constraints:
- 1 <= nums.length <= 100000
- -1000 <= nums[i] <= 1000`,
        starterCode: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Counting Sort
        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Counting Sort
        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        # Implement Counting Sort
        return nums`,
            javascript: `var sortArray = function(nums) {
    // Implement Counting Sort
    return nums;
};`
        },
        solutions: {
            cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        if (nums.empty()) return nums;

        int minValue = *min_element(nums.begin(), nums.end());
        int maxValue = *max_element(nums.begin(), nums.end());

        vector<int> count(maxValue - minValue + 1, 0);

        for (int x : nums) {
            count[x - minValue]++;
        }

        int index = 0;

        for (int value = minValue; value <= maxValue; value++) {
            while (count[value - minValue] > 0) {
                nums[index++] = value;
                count[value - minValue]--;
            }
        }

        return nums;
    }
};`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        if (nums.length == 0) return nums;

        int min = nums[0], max = nums[0];
        for (int x : nums) {
            min = Math.min(min, x);
            max = Math.max(max, x);
        }

        int[] count = new int[max - min + 1];
        for (int x : nums) count[x - min]++;

        int index = 0;
        for (int value = min; value <= max; value++) {
            while (count[value - min] > 0) {
                nums[index++] = value;
                count[value - min]--;
            }
        }

        return nums;
    }
}`,
            python: `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        if not nums:
            return nums

        minimum = min(nums)
        maximum = max(nums)
        count = [0] * (maximum - minimum + 1)

        for x in nums:
            count[x - minimum] += 1

        result = []
        for offset, frequency in enumerate(count):
            result.extend([offset + minimum] * frequency)

        return result`,
            javascript: `var sortArray = function(nums) {
    if (nums.length === 0) return nums;

    const minValue = Math.min(...nums);
    const maxValue = Math.max(...nums);
    const count = new Array(maxValue - minValue + 1).fill(0);

    for (const x of nums) count[x - minValue]++;

    let index = 0;

    for (let value = minValue; value <= maxValue; value++) {
        while (count[value - minValue] > 0) {
            nums[index++] = value;
            count[value - minValue]--;
        }
    }

    return nums;
};`
        },
        examples: [
            { input: "[4,2,2,8,3,3,1]", output: "[1,2,2,3,3,4,8]", explanation: "Count each value and reconstruct in ascending order." },
            { input: "[-5,-1,3,-1,0]", output: "[-5,-1,-1,0,3]", explanation: "Offset the minimum value to support negative numbers." },
            { input: "[1,1,1]", output: "[1,1,1]", explanation: "The frequency of 1 is three." }
        ],
        constraints: [
            "1 <= nums.length <= 100000",
            "-1000 <= nums[i] <= 1000"
        ],
        testCases: [
            { input: "7 4 2 2 8 3 3 1", output: "[1,2,2,3,3,4,8]" },
            { input: "5 -5 -1 3 -1 0", output: "[-5,-1,-1,0,3]" },
            { input: "3 1 1 1", output: "[1,1,1]" },
            { input: "5 0 -2 2 -1 1", output: "[-2,-1,0,1,2]" },
            { input: "5 1000 -1000 0 1000 -1000", output: "[-1000,-1000,0,1000,1000]" }
        ]
    }
];

function driverCode(language) {
    if (language === "cpp") {
        return `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;

    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    Solution solution;
    vector<int> answer = solution.sortArray(nums);

    cout << "[";
    for (int i = 0; i < (int)answer.size(); i++) {
        if (i) cout << ",";
        cout << answer[i];
    }
    cout << "]";
    return 0;
}
`;
    }

    if (language === "java") {
        return `
import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;

        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        Solution solution = new Solution();
        int[] answer = solution.sortArray(nums);

        System.out.print(Arrays.toString(answer).replace(" ", ""));
    }
}
`;
    }

    if (language === "python") {
        return `
import sys
data = list(map(int, sys.stdin.read().split()))
if data:
    n = data[0]
    nums = data[1:1+n]
    solution = Solution()
    answer = solution.sortArray(nums)
    print("[" + ",".join(map(str, answer)) + "]")
`;
    }

    return `
const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\\s+/).filter(Boolean).map(Number);
if (data.length) {
    const n = data[0];
    const nums = data.slice(1, 1 + n);
    const answer = sortArray(nums);
    console.log(JSON.stringify(answer));
}
`;
}

async function replaceSortingQuestions() {
    try {
        await connectDB();

        const category = await Category.findOne({ slug: "dsa" });
        const section = await DSASection.findOne({ slug: "sorting" });

        if (!category || !section) {
            throw new Error("DSA category or Sorting section not found.");
        }

        // Remove only the six theory lessons created by the previous seed.
        const removed = await Question.deleteMany({
            slug: { $in: theorySlugs }
        });

        console.log(`Removed old theory lessons: ${removed.deletedCount}`);

        let created = 0;
        let updated = 0;

        for (const problem of problems) {
            const topic = await Topic.findOne({
                slug: problem.topicSlug,
                category: category._id,
                section: section._id
            });

            if (!topic) {
                console.log(`Topic not found: ${problem.topicSlug}`);
                continue;
            }

            const data = {
                title: problem.title,
                slug: problem.slug,
                description: problem.description,
                category: category._id,
                section: section._id,
                topic: topic._id,
                difficulty: problem.difficulty,
                questionType: "coding",
                executionMode: "function",
                functionName: "sortArray",
                starterCode: problem.starterCode,
                driverCode: {
                    cpp: driverCode("cpp"),
                    java: driverCode("java"),
                    python: driverCode("python"),
                    javascript: driverCode("javascript")
                },
                solution: problem.solutions,
                examples: problem.examples,
                constraints: problem.constraints,
                hiddenTestCases: problem.testCases,
                tags: ["DSA", "Sorting", problem.topicSlug],
                sourceType: "curated",
                isPublished: true
            };

            const existing = await Question.findOne({
                slug: problem.slug
            });

            if (existing) {
                Object.assign(existing, data);
                await existing.save();
                updated++;
                console.log(`Updated: ${problem.title}`);
            } else {
                await Question.create(data);
                created++;
                console.log(`Created: ${problem.title}`);
            }
        }

        console.log(`\nCreated: ${created}`);
        console.log(`Updated: ${updated}`);
        console.log("Sorting coding problems configured.");
    } catch (error) {
        console.error("Sorting replacement error:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.connection.close();
    }
}

replaceSortingQuestions();
