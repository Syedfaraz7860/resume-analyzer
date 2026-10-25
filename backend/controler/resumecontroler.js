import Resume from "../model/resume.js";
import Analysis from "../model/analysis.js";

import { extractResumeData } from "../utils/resumeExtracter.js";
import { analyzeResume } from "../services/resumeAnalyzer.js";


export const uploadResume = async (req, res) => {

    try {

        // 1. Check resume file
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume"
            });
        }


        // 2. Get userId
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }


        // 3. Get uploaded file information
        const filePath = req.file.path;
        const originalName = req.file.originalname;
        const fileName = req.file.filename;


        console.log("Original File:", originalName);
        console.log("Saved File:", fileName);
        console.log("File Path:", filePath);


        // 4. Extract text from resume
        const extractedData = await extractResumeData(
            filePath,
            originalName
        );


        console.log(
            "Extracted Words:",
            extractedData.wordCount
        );


        // 5. Save resume information in MongoDB
        const resume = await Resume.create({

            userId,

            originalName,

            fileName,

            fileType: extractedData.fileType,

            filePath,

            extractedText: extractedData.text

        });


        // 6. Analyze extracted resume text
        const analysisResult = analyzeResume(
            extractedData.text
        );


        console.log(
            "Resume Score:",
            analysisResult.score
        );


        // 7. Save analysis result in MongoDB
        const analysis = await Analysis.create({

            userId,

            resumeId: resume._id,

            score: analysisResult.score,

            skills: analysisResult.skills,

            missingSkills: analysisResult.missingSkills,

            sections: analysisResult.sections,

            strengths: analysisResult.strengths,

            weaknesses: analysisResult.weaknesses,

            suggestions: analysisResult.suggestions

        });


        // 8. Send response to frontend
        res.status(201).json({

            message: "Resume uploaded and analyzed successfully",

            resume: {

                resumeId: resume._id,

                originalName: resume.originalName,

                fileName: resume.fileName,

                fileType: resume.fileType,

                characterCount:
                    extractedData.characterCount,

                wordCount:
                    extractedData.wordCount

            },

            analysis: {

                analysisId: analysis._id,

                score: analysis.score,

                skills: analysis.skills,

                missingSkills: analysis.missingSkills,

                sections: analysis.sections,

                strengths: analysis.strengths,

                weaknesses: analysis.weaknesses,

                suggestions: analysis.suggestions

            }

        });


    } catch (error) {

        console.log(
            "Resume Upload/Analysis Error:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

};