import axios from "axios";
import Question from "../models/Questions.js";

const JUDGE0_URL =
    process.env.JUDGE0_URL ||
    "https://ce.judge0.com";

const LANGUAGE_IDS = {
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63
};

const sleep = (ms) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );


/* =========================================
   CREATE JUDGE0 SUBMISSION
========================================= */

const createSubmission = async ({
    sourceCode,
    languageId,
    stdin,
    expectedOutput
}) => {

    const response = await axios.post(
        `${JUDGE0_URL}/submissions/?base64_encoded=false&wait=false`,
        {
            source_code: sourceCode,
            language_id: languageId,
            stdin: stdin || "",
            expected_output:
                expectedOutput || undefined,

            cpu_time_limit: 2,
            memory_limit: 128000
        },
        {
            headers: {
                "Content-Type":
                    "application/json"
            },
            timeout: 10000
        }
    );

    return response.data.token;
};


/* =========================================
   GET JUDGE0 RESULT
========================================= */

const getSubmissionResult = async (token) => {

    for (let attempt = 0; attempt < 20; attempt++) {

        const response = await axios.get(
            `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
            {
                timeout: 10000
            }
        );

        const result = response.data;

        if (
            result.status &&
            result.status.id > 2
        ) {
            return result;
        }

        await sleep(500);
    }

    throw new Error(
        "Code execution timed out"
    );
};


const buildExecutableCode = (sourceCode, language, question) => {
    console.log("========== BUILD EXECUTABLE CODE ==========");
    console.log("Language:", language);
    console.log("Execution mode:", question.executionMode);

    if (question.executionMode !== "function") {
        console.log("Using standard input/output mode");
        return sourceCode;
    }

    const driverCode = question.driverCode?.[language];

    console.log("Driver exists:", Boolean(driverCode));
    console.log("Driver length:", driverCode?.length || 0);

    if (!driverCode || !driverCode.trim()) {
        throw new Error(
            `Driver code is missing for ${language}.`
        );
    }

    const executableCode = `${sourceCode}\n\n${driverCode}`;

    console.log("Executable code length:", executableCode.length);
    console.log("============================================");

    return executableCode;
};





/* =========================================
   RUN CODE
========================================= */


export const runCode = async (req, res) => {
    try {
        const {
            questionId,
            language,
            sourceCode,
            input = ""
        } = req.body;

        if (!questionId) {
            return res.status(400).json({
                success: false,
                message: "Question ID is required"
            });
        }

        if (!language || !sourceCode?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Language and source code are required"
            });
        }

        const languageId = LANGUAGE_IDS[language];

        if (!languageId) {
            return res.status(400).json({
                success: false,
                message: "Unsupported programming language"
            });
        }

        if (sourceCode.length > 20000) {
            return res.status(400).json({
                success: false,
                message: "Source code is too large"
            });
        }

        const question = await Question.findOne({
            _id: questionId,
            isPublished: true
        }).select("executionMode driverCode");

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const executableCode = buildExecutableCode(
            sourceCode,
            language,
            question
        );

        const token = await createSubmission({
            sourceCode: executableCode,
            languageId,
            stdin: input
        });

        const result = await getSubmissionResult(token);

        return res.status(200).json({
            success: true,
            result: {
                status:
                    result.status?.description || "Unknown",
                stdout: result.stdout || "",
                stderr: result.stderr || "",
                compileOutput: result.compile_output || "",
                time: result.time || null,
                memory: result.memory || null
            }
        });
    } catch (error) {
        console.error(
            "Run code error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: error.message || "Code execution failed"
        });
    }
};




/* =========================================
   SUBMIT CODE
========================================= */


export const submitCode = async (req, res) => {
    try {
        const { questionId, language, sourceCode } = req.body;

        // 1. Validate request
        if (!questionId || !language || !sourceCode?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question ID, language and source code are required"
            });
        }

        const languageId = LANGUAGE_IDS[language];

        if (!languageId) {
            return res.status(400).json({
                success: false,
                message: "Unsupported programming language"
            });
        }

        if (sourceCode.length > 20000) {
            return res.status(400).json({
                success: false,
                message: "Source code is too large"
            });
        }

        // 2. Find question and its hidden tests
        const question = await Question.findOne({
            _id: questionId,
            isPublished: true
        }).select(
            "title executionMode driverCode hiddenTestCases"
        );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const testCases = question.hiddenTestCases || [];

        if (testCases.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No test cases available for this question"
            });
        }

        // 3. Build complete program for function-style questions
        const executableCode = buildExecutableCode(
            sourceCode,
            language,
            question
        );

        // 4. Run every hidden test case
        const results = [];
        let passedTests = 0;
        let totalTime = 0;
        let maxMemory = 0;
        let finalStatus = "Accepted";

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];

            try {
                const token = await createSubmission({
                    sourceCode: executableCode,
                    languageId,
                    stdin: testCase.input,
                    expectedOutput: testCase.output
                });

                const result = await getSubmissionResult(token);
                const statusId = result.status?.id;

                const actualOutput = (result.stdout || "")
                    .trim()
                    .replace(/\r\n/g, "\n");

                const expectedOutput = (testCase.output || "")
                    .trim()
                    .replace(/\r\n/g, "\n");

                const passed =
                    statusId === 3 &&
                    actualOutput === expectedOutput;

                if (passed) {
                    passedTests++;
                }

                const time = Number(result.time || 0);
                const memory = Number(result.memory || 0);

                totalTime += time;
                maxMemory = Math.max(maxMemory, memory);

                let status = "Accepted";

                if (statusId === 6) {
                    status = "Compilation Error";
                } else if (statusId === 5) {
                    status = "Time Limit Exceeded";
                } else if ([7, 8, 9, 10, 11, 12, 13, 14].includes(statusId)) {
                    status = "Runtime Error";
                } else if (statusId !== 3) {
                    status = result.status?.description || "Execution Error";
                } else if (!passed) {
                    status = "Wrong Answer";
                }

                if (!passed && finalStatus === "Accepted") {
                    finalStatus = status;
                }

                results.push({
                    testCase: i + 1,
                    passed,
                    status,
                    time: result.time || null,
                    memory: result.memory || null,
                    ...(status === "Compilation Error" && {
                        compileOutput: result.compile_output || ""
                    }),
                    ...(status === "Runtime Error" && {
                        stderr: result.stderr || ""
                    })
                });

                // Compilation errors affect every test case.
                if (status === "Compilation Error") {
                    for (let j = i + 1; j < testCases.length; j++) {
                        results.push({
                            testCase: j + 1,
                            passed: false,
                            status: "Not Run"
                        });
                    }

                    break;
                }
            } catch (error) {
                console.error(
                    `Test case ${i + 1} failed:`,
                    error.message
                );

                results.push({
                    testCase: i + 1,
                    passed: false,
                    status: "Execution Error"
                });

                if (finalStatus === "Accepted") {
                    finalStatus = "Execution Error";
                }
            }
        }

        // 5. Calculate score
        const totalTests = testCases.length;
        const score = Math.round(
            (passedTests / totalTests) * 100
        );

        const accepted = passedTests === totalTests;

        if (accepted) {
            finalStatus = "Accepted";
        }

        // 6. Send result to frontend
        return res.status(200).json({
            success: true,
            accepted,
            status: finalStatus,
            score,
            passedTests,
            totalTests,
            runtime: Number(totalTime.toFixed(3)),
            memory: maxMemory,
            results
        });
    } catch (error) {
        console.error(
            "Submit code error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: error.message || "Code submission failed"
        });
    }
};

