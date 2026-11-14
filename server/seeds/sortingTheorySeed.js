import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import DSASection from "../models/DSASection.js";
import Topic from "../models/Topic.js";
import Question from "../models/Questions.js";

dotenv.config();

const lessons = [
    {
        title: "Selection Sort: Complete Theory and C++ Example",
        slug: "selection-sort-complete-theory",
        topicSlug: "selection-sort",
        description: `# 1. Definition

Selection Sort is a comparison-based sorting algorithm. It repeatedly finds the smallest element in the unsorted portion of an array and places it at the beginning of that portion.

# 2. How It Works

1. Start at index 0.
2. Find the minimum element from the current index to the end.
3. Swap the minimum element with the current element.
4. Move to the next index.
5. Repeat until the array is sorted.

# 3. Dry Run

Input: [64, 25, 12, 22, 11]

Pass 1: The minimum is 11. Swap it with 64.
Array: [11, 25, 12, 22, 64]

Pass 2: The minimum in the remaining portion is 12.
Array: [11, 12, 25, 22, 64]

Pass 3: The minimum is 22.
Array: [11, 12, 22, 25, 64]

Pass 4: The minimum is 25.
Array: [11, 12, 22, 25, 64]

Sorted array: [11, 12, 22, 25, 64]

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[i], arr[minIndex]);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};

    selectionSort(arr);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 11 12 22 25 64

# 5. Line-by-Line Explanation

- n stores the number of elements.
- i identifies the position where the next minimum should go.
- minIndex initially assumes that arr[i] is the minimum.
- j scans the remaining unsorted elements.
- If arr[j] is smaller, minIndex is updated.
- swap places the minimum at its correct position.

# 6. Complexity

Best time: O(n^2)
Average time: O(n^2)
Worst time: O(n^2)
Auxiliary space: O(1)

The algorithm performs approximately n(n-1)/2 comparisons, even when the array is already sorted.

# 7. Advantages and Disadvantages

Advantages:
- Simple to understand and implement.
- Uses constant auxiliary space.
- Performs at most O(n) swaps.

Disadvantages:
- Slow for large arrays.
- Standard selection sort is not stable.

# 8. Interview Questions

1. Why is selection sort O(n^2) in the best case?
2. Is selection sort stable by default?
3. What is its auxiliary space complexity?
4. How does it differ from bubble sort?

Remember: Selection sort repeatedly selects the minimum element.`,
        answer: "Selection Sort repeatedly selects the minimum element from the unsorted portion and places it at the next correct position.",
        explanation: "Its time complexity is O(n^2) in the best, average, and worst cases. Standard selection sort uses O(1) auxiliary space and is generally not stable.",
        tags: ["Sorting", "Selection Sort", "C++", "Complexity"]
    },
    {
        title: "Bubble Sort: Complete Theory and C++ Example",
        slug: "bubble-sort-complete-theory",
        topicSlug: "bubble-sort",
        description: `# 1. Definition

Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. After each complete pass, the largest remaining element moves to the end of the unsorted portion.

# 2. How It Works

1. Compare adjacent elements.
2. Swap them if the left element is greater than the right element.
3. Continue through the unsorted portion.
4. Repeat until no swaps are required.

# 3. Dry Run

Input: [5, 1, 4, 2, 8]

Pass 1:
- Compare 5 and 1; swap: [1, 5, 4, 2, 8]
- Compare 5 and 4; swap: [1, 4, 5, 2, 8]
- Compare 5 and 2; swap: [1, 4, 2, 5, 8]
- Compare 5 and 8; no swap.

Pass 2:
- Compare 1 and 4; no swap.
- Compare 4 and 2; swap: [1, 2, 4, 5, 8]
- Remaining comparisons require no swaps.

Sorted array: [1, 2, 4, 5, 8]

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }

        if (!swapped) break;
    }
}

int main() {
    vector<int> arr = {5, 1, 4, 2, 8};

    bubbleSort(arr);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 1 2 4 5 8

# 5. Line-by-Line Explanation

- The outer loop controls the number of passes.
- swapped records whether a swap occurred during the current pass.
- The inner loop compares arr[j] with arr[j + 1].
- The inner loop becomes shorter because the largest elements are already at the end.
- If swapped remains false, the array is already sorted and the algorithm stops early.

# 6. Complexity

Best time: O(n), with the early-stop optimization.
Average time: O(n^2).
Worst time: O(n^2).
Auxiliary space: O(1).

# 7. Properties

- Standard adjacent-swap bubble sort is stable.
- It sorts the array in place.
- It is easy to understand but inefficient for large inputs.

# 8. Interview Questions

1. Why does the inner loop become shorter after each pass?
2. What does the swapped flag accomplish?
3. What is the best-case time complexity?
4. Is bubble sort stable?

Remember: Each pass moves a large element toward the end.`,
        answer: "Bubble Sort compares adjacent elements and swaps out-of-order pairs. With an early-stop flag, its best-case time is O(n), while average and worst-case time are O(n^2).",
        explanation: "The algorithm is stable when equal elements are not swapped. It uses O(1) auxiliary space.",
        tags: ["Sorting", "Bubble Sort", "C++", "Complexity"]
    },
    {
        title: "Insertion Sort: Complete Theory and C++ Example",
        slug: "insertion-sort-complete-theory",
        topicSlug: "insertion-sort",
        description: `# 1. Definition

Insertion Sort builds a sorted portion of an array one element at a time. Each new element is inserted into its correct position among the elements already sorted.

It works similarly to arranging playing cards in your hand.

# 2. How It Works

1. Treat the first element as sorted.
2. Select the next element as key.
3. Shift larger elements to the right.
4. Insert key into the gap.
5. Repeat for every remaining element.

# 3. Dry Run

Input: [5, 3, 4, 1]

Initially: [5, 3, 4, 1]

Pass 1: key = 3
Shift 5 right and insert 3.
Array: [3, 5, 4, 1]

Pass 2: key = 4
Shift 5 right and insert 4.
Array: [3, 4, 5, 1]

Pass 3: key = 1
Shift 5, 4, and 3 right; insert 1.
Array: [1, 3, 4, 5]

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

int main() {
    vector<int> arr = {5, 3, 4, 1};

    insertionSort(arr);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 1 3 4 5

# 5. Line-by-Line Explanation

- i starts at 1 because a single-element array is already sorted.
- key stores the element to insert.
- j starts at the previous index.
- The while loop shifts larger elements one position right.
- When the correct position is found, arr[j + 1] receives key.

# 6. Complexity

Best time: O(n), when the array is already sorted.
Average time: O(n^2).
Worst time: O(n^2), when the array is reverse sorted.
Auxiliary space: O(1).

# 7. Properties and Uses

- Stable when implemented with the comparison arr[j] > key.
- In-place sorting algorithm.
- Effective for small arrays and nearly sorted data.
- Often used as part of hybrid sorting algorithms.

# 8. Interview Questions

1. Why does insertion sort perform well on nearly sorted data?
2. What is the worst-case input arrangement?
3. Is insertion sort stable?
4. Why does the loop begin at index 1?

Remember: Insertion sort grows a sorted prefix by inserting each new element.`,
        answer: "Insertion Sort maintains a sorted prefix and inserts each next element into its correct position. It takes O(n) time in the best case and O(n^2) in the average and worst cases.",
        explanation: "It is stable with the usual strict-greater-than comparison, uses O(1) auxiliary space, and is useful for small or nearly sorted arrays.",
        tags: ["Sorting", "Insertion Sort", "C++", "Complexity"]
    },
    {
        title: "Merge Sort: Complete Theory and C++ Example",
        slug: "merge-sort-complete-theory",
        topicSlug: "merge-sort",
        description: `# 1. Definition

Merge Sort is a divide-and-conquer sorting algorithm. It divides an array into smaller parts, sorts those parts recursively, and merges the sorted parts.

# 2. How It Works

1. Divide the array into two halves.
2. Recursively sort each half.
3. Merge the two sorted halves into one sorted range.
4. Continue until each range contains one element.

A single-element range is already sorted.

# 3. Dry Run

Input: [38, 27, 43, 3]

Divide:
[38, 27] and [43, 3]
Then: [38], [27], [43], [3]

Merge:
[38] and [27] become [27, 38].
[43] and [3] become [3, 43].

Final merge:
[27, 38] and [3, 43] become [3, 27, 38, 43].

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;

    int i = left;
    int j = mid + 1;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = 0; k < (int)temp.size(); k++) {
        arr[left + k] = temp[k];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;

    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {38, 27, 43, 3};

    mergeSort(arr, 0, (int)arr.size() - 1);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 3 27 38 43

# 5. Line-by-Line Explanation

- left and right define the current range.
- If left >= right, the range has at most one element and recursion stops.
- mid calculates the middle index safely.
- The two recursive calls sort the left and right halves.
- merge compares elements from both halves and builds a sorted temporary array.
- The final loop copies the merged result back to the original array.

# 6. Complexity

Best time: O(n log n).
Average time: O(n log n).
Worst time: O(n log n).
Auxiliary array space: O(n).
Recursive stack depth: O(log n).

# 7. Properties

- Standard array merge sort is stable when equal elements are taken from the left half first.
- Its running time is predictable.
- It is useful for large datasets and external sorting.
- It requires additional memory for the temporary array.

# 8. Interview Questions

1. Why is merge sort O(n log n)?
2. What is its recurrence relation?
3. Why does array merge sort need O(n) auxiliary memory?
4. Is merge sort stable?
5. How does merge sort compare with quick sort?

Remember: Merge sort divides, recursively sorts, and merges.`,
        answer: "Merge Sort divides an array into halves, recursively sorts each half, and merges them. Its best, average, and worst-case time complexity is O(n log n).",
        explanation: "Standard array merge sort uses O(n) auxiliary array space and O(log n) recursion depth. It is stable when equal elements are merged in the appropriate order.",
        tags: ["Sorting", "Merge Sort", "Divide and Conquer", "C++"]
    },
    {
        title: "Quick Sort: Complete Theory and C++ Example",
        slug: "quick-sort-complete-theory",
        topicSlug: "quick-sort",
        description: `# 1. Definition

Quick Sort is a divide-and-conquer sorting algorithm. It selects a pivot, partitions the array around that pivot, and recursively sorts the resulting partitions.

After partitioning, elements on the left are no greater than the pivot, and elements on the right are no smaller than the pivot, according to the partition scheme used.

# 2. How It Works

1. Select a pivot.
2. Partition the array around the pivot.
3. Recursively sort the left partition.
4. Recursively sort the right partition.
5. Stop when a partition has at most one element.

# 3. Dry Run

Input: [4, 2, 6, 1, 3]

Using the last element, 3, as the Lomuto partition pivot:

After partitioning, the array becomes [2, 1, 3, 4, 6].
The pivot 3 is now in its final sorted position.

Sort the left partition [2, 1] to get [1, 2].
Sort the right partition [4, 6], which is already ordered.

Final array: [1, 2, 3, 4, 6].

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int partitionArray(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;

    int pivotIndex = partitionArray(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

int main() {
    vector<int> arr = {4, 2, 6, 1, 3};

    quickSort(arr, 0, (int)arr.size() - 1);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 1 2 3 4 6

# 5. Line-by-Line Explanation

- pivot stores the last element of the current range.
- i tracks the boundary of elements less than or equal to the pivot.
- j scans the remaining elements.
- When arr[j] <= pivot, the element is moved into the left partition.
- The final swap puts the pivot into its partition position.
- The recursive calls sort the portions on either side of the pivot.

# 6. Complexity

Best time: O(n log n).
Average time: O(n log n).
Worst time: O(n^2).
Expected auxiliary space with balanced recursion: O(log n).
Worst-case recursion stack: O(n).

# 7. Why Can Quick Sort Become O(n^2)?

If the pivot repeatedly produces highly unbalanced partitions, such as sizes 0 and n - 1, the algorithm performs many levels of work.

Already sorted data can cause this behavior with the simple last-element pivot used above.

Randomized pivots or better pivot selection reduce the chance of consistently poor partitions but do not eliminate the theoretical worst case.

# 8. Properties

- Standard quick sort is generally not stable.
- It usually sorts in place, apart from recursion stack usage.
- It often performs well in practice because of good cache behavior and low auxiliary-array requirements.

# 9. Interview Questions

1. What is a pivot?
2. Explain the partition operation.
3. Why is worst-case time O(n^2)?
4. What is the expected auxiliary stack space?
5. Is quick sort stable?

Remember: Quick sort partitions around a pivot and recursively sorts the two sides.`,
        answer: "Quick Sort partitions an array around a pivot and recursively sorts the two partitions. Its average time is O(n log n), but its worst-case time is O(n^2).",
        explanation: "The last-element pivot implementation shown can create unbalanced partitions on certain inputs. Expected auxiliary stack space is O(log n), while worst-case stack space is O(n).",
        tags: ["Sorting", "Quick Sort", "Partition", "C++"]
    },
    {
        title: "Counting Sort: Complete Theory and C++ Example",
        slug: "counting-sort-complete-theory",
        topicSlug: "counting-sort",
        description: `# 1. Definition

Counting Sort is a non-comparison sorting algorithm. Instead of comparing every pair of elements, it counts how often each value occurs and uses those counts to determine the sorted order.

The simple version shown here supports non-negative integers. Its efficiency depends on the range of values, not just the number of elements.

# 2. How It Works

1. Find the maximum value.
2. Create a count array with one position for each value from 0 to the maximum.
3. Count the occurrences of each value.
4. Reconstruct the sorted array using the counts.

# 3. Dry Run

Input: [4, 2, 2, 8, 3, 3, 1]

Counts:
- 1 occurs once.
- 2 occurs twice.
- 3 occurs twice.
- 4 occurs once.
- 8 occurs once.

Reconstruct in increasing order:
[1, 2, 2, 3, 3, 4, 8]

# 4. C++ Implementation

~~~cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;

    int maxValue = *max_element(arr.begin(), arr.end());

    vector<int> count(maxValue + 1, 0);

    for (int x : arr) {
        count[x]++;
    }

    int index = 0;

    for (int value = 0; value <= maxValue; value++) {
        while (count[value] > 0) {
            arr[index++] = value;
            count[value]--;
        }
    }
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};

    countingSort(arr);

    for (int x : arr) cout << x << " ";
    return 0;
}
~~~

Output: 1 2 2 3 3 4 8

# 5. Line-by-Line Explanation

- The empty-array check prevents accessing a nonexistent maximum.
- max_element finds the maximum value.
- count creates a frequency array initialized to zero.
- The first loop counts how many times each value occurs.
- The outer reconstruction loop visits values in ascending order.
- The while loop writes each value as many times as it appears.

# 6. Complexity

Let n be the number of elements and k be the maximum value plus one.

Time complexity: O(n + k).
Auxiliary space: O(k).

If the value range is small relative to n, counting sort can be very efficient. If the maximum value is enormous, the count array may consume too much memory.

# 7. Limitations

- This implementation assumes non-negative integers.
- It is not suitable for arbitrary objects unless they can be mapped to a manageable integer range.
- This simple reconstruction version is not a stable sorting implementation for records.
- Negative values require an offset or another adapted implementation.

# 8. Interview Questions

1. Why is counting sort not a comparison sort?
2. What do n and k represent?
3. When can counting sort be faster than comparison-based sorting?
4. Why can a large value range make it inefficient?
5. Is the implementation shown stable?

Remember: Counting sort counts occurrences and reconstructs the ordered values.`,
        answer: "Counting Sort counts the occurrences of integer values and reconstructs the sorted array. Its time complexity is O(n + k), and its auxiliary space is O(k), where k is the value range size.",
        explanation: "Counting sort is efficient when the integer range is manageable. The implementation shown supports non-negative integers and does not preserve stability for general records.",
        tags: ["Sorting", "Counting Sort", "Non-comparison Sort", "C++"]
    }
];

async function seedSortingTheory() {
    try {
        await connectDB();

        const category = await Category.findOne({ slug: "dsa" });
        const section = await DSASection.findOne({ slug: "sorting" });

        if (!category || !section) {
            throw new Error("DSA category or Sorting section not found.");
        }

        let created = 0;
        let updated = 0;

        for (const lesson of lessons) {
            const topic = await Topic.findOne({
                slug: lesson.topicSlug,
                category: category._id,
                section: section._id
            });

            if (!topic) {
                console.log(`Topic not found: ${lesson.topicSlug}`);
                continue;
            }

            const data = {
                title: lesson.title,
                slug: lesson.slug,
                description: lesson.description,
                answer: lesson.answer,
                explanation: lesson.explanation,
                tags: lesson.tags,
                category: category._id,
                section: section._id,
                topic: topic._id,
                difficulty: "easy",
                questionType: "theory",
                executionMode: "stdin",
                sourceType: "curated",
                isPublished: true
            };

            const existing = await Question.findOne({
                slug: lesson.slug
            });

            if (existing) {
                Object.assign(existing, data);
                await existing.save();
                updated++;
                console.log(`Updated: ${lesson.title}`);
            } else {
                await Question.create(data);
                created++;
                console.log(`Created: ${lesson.title}`);
            }
        }

        console.log(`\nCreated: ${created}`);
        console.log(`Updated: ${updated}`);
    } catch (error) {
        console.error("Sorting theory seed error:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.connection.close();
    }
}

seedSortingTheory();
