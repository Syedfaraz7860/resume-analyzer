import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import XLSX from "xlsx";

export const extractResumeData = async (filePath, originalName) => {
    try {
        const extension = path.extname(originalName).toLowerCase();

        let extractedText = "";

        // =========================
        // PDF
        // =========================
        if (extension === ".pdf") {

            const fileBuffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: fileBuffer
            });

            const pdfData = await parser.getText();

            extractedText = pdfData.text;

            await parser.destroy();
        }

        // =========================
        // DOCX
        // =========================
        else if (extension === ".docx") {

            const result = await mammoth.extractRawText({
                path: filePath
            });

            extractedText = result.value;
        }

        // =========================
        // TXT
        // =========================
        else if (extension === ".txt") {

            extractedText = fs.readFileSync(
                filePath,
                "utf-8"
            );
        }

        // =========================
        // EXCEL
        // =========================
        else if (
            extension === ".xlsx" ||
            extension === ".xls"
        ) {

            const workbook = XLSX.readFile(filePath);

            const sheetTexts = [];

            workbook.SheetNames.forEach((sheetName) => {

                const worksheet = workbook.Sheets[sheetName];

                const data = XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                        header: 1,
                        defval: ""
                    }
                );

                data.forEach((row) => {

                    const rowText = row
                        .join(" ")
                        .trim();

                    if (rowText) {
                        sheetTexts.push(rowText);
                    }
                });
            });

            extractedText = sheetTexts.join("\n");
        }

        // =========================
        // UNSUPPORTED FILE
        // =========================
        else {

            throw new Error(
                "Unsupported file format. Please upload PDF, DOCX, TXT, XLSX or XLS."
            );
        }

        // =========================
        // CLEAN TEXT
        // =========================

        extractedText = extractedText
            .replace(/\r/g, "")
            .replace(/[ \t]+/g, " ")
            .replace(/\n\s*\n\s*\n+/g, "\n\n")
            .trim();

        return {
            success: true,
            fileType: extension,
            text: extractedText,
            characterCount: extractedText.length,
            wordCount: extractedText
                ? extractedText.split(/\s+/).length
                : 0
        };

    } catch (error) {

        console.log(
            "Resume Extraction Error:",
            error
        );

        throw error;
    }
};