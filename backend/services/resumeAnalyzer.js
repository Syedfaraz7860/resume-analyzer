const skillsList = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C",
    "HTML",
    "CSS",
    "React",
    "React.js",
    "Node.js",
    "Express",
    "Express.js",
    "MongoDB",
    "MySQL",
    "SQL",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Angular",
    "Bootstrap",
    "Tailwind CSS",
    "REST API",
    "Machine Learning",
    "Data Science"
];

const sectionKeywords = {
    education: [
        "education",
        "academic",
        "qualification",
        "degree",
        "b.tech",
        "btech",
        "bca",
        "mca",
        "college",
        "university",
        "school"
    ],

    experience: [
        "experience",
        "work experience",
        "employment",
        "internship",
        "intern",
        "worked"
    ],

    projects: [
        "project",
        "projects",
        "developed",
        "built",
        "created"
    ],

    certifications: [
        "certification",
        "certifications",
        "certificate",
        "training",
        "course"
    ],

    skills: [
        "skills",
        "technical skills",
        "technologies",
        "technical knowledge"
    ]
};

export const analyzeResume = (resumeText) => {

    // --------------------------------
    // 1. Convert text to lowercase
    // --------------------------------

    const text = resumeText.toLowerCase();


    // --------------------------------
    // 2. Find skills
    // --------------------------------

    const foundSkills = [];

    skillsList.forEach((skill) => {

        const skillLower = skill.toLowerCase();

        if (text.includes(skillLower)) {

            if (!foundSkills.includes(skill)) {
                foundSkills.push(skill);
            }
        }
    });


    // --------------------------------
    // 3. Find missing skills
    // --------------------------------

    const importantSkills = [
        "JavaScript",
        "React.js",
        "Node.js",
        "MongoDB",
        "SQL",
        "Git",
        "Docker",
        "AWS"
    ];

    const missingSkills = importantSkills.filter(
        (skill) => !foundSkills.includes(skill)
    );


    // --------------------------------
    // 4. Check resume sections
    // --------------------------------

    const sections = [];

    Object.entries(sectionKeywords).forEach(
        ([sectionName, keywords]) => {

            const sectionFound = keywords.some(
                (keyword) =>
                    text.includes(keyword.toLowerCase())
            );

            if (sectionFound) {
                sections.push(sectionName);
            }
        }
    );


    // --------------------------------
    // 5. Basic personal information
    // --------------------------------

    const hasEmail =
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            .test(resumeText);

    const hasPhone =
        /(\+91[\s-]?)?[6-9]\d{9}/
            .test(resumeText);


    // --------------------------------
    // 6. Check links
    // --------------------------------

    const hasGithub =
        text.includes("github.com");

    const hasLinkedin =
        text.includes("linkedin.com");


    // --------------------------------
    // 7. Calculate score
    // --------------------------------

    let score = 0;


    // Skills = 30 marks
    const skillScore = Math.min(
        foundSkills.length * 4,
        30
    );

    score += skillScore;


    // Sections = 25 marks
    const sectionScore = Math.min(
        sections.length * 5,
        25
    );

    score += sectionScore;


    // Email = 5 marks
    if (hasEmail) {
        score += 5;
    }


    // Phone = 5 marks
    if (hasPhone) {
        score += 5;
    }


    // GitHub = 5 marks
    if (hasGithub) {
        score += 5;
    }


    // LinkedIn = 5 marks
    if (hasLinkedin) {
        score += 5;
    }


    // Resume length = 10 marks
    const wordCount =
        resumeText.trim().split(/\s+/).length;

    if (wordCount >= 300) {
        score += 10;
    } else if (wordCount >= 150) {
        score += 5;
    }


    // Maximum 100
    score = Math.min(score, 100);


    // --------------------------------
    // 8. Strengths
    // --------------------------------

    const strengths = [];

    if (foundSkills.length >= 5) {
        strengths.push(
            "Good number of technical skills found"
        );
    }

    if (sections.includes("projects")) {
        strengths.push(
            "Projects section is present"
        );
    }

    if (sections.includes("education")) {
        strengths.push(
            "Education information is present"
        );
    }

    if (sections.includes("experience")) {
        strengths.push(
            "Experience or internship information is present"
        );
    }

    if (hasGithub) {
        strengths.push(
            "GitHub profile is available"
        );
    }

    if (hasLinkedin) {
        strengths.push(
            "LinkedIn profile is available"
        );
    }


    // --------------------------------
    // 9. Weaknesses
    // --------------------------------

    const weaknesses = [];

    if (foundSkills.length < 5) {
        weaknesses.push(
            "Resume contains limited technical skills"
        );
    }

    if (!sections.includes("projects")) {
        weaknesses.push(
            "Projects section is missing"
        );
    }

    if (!sections.includes("experience")) {
        weaknesses.push(
            "Experience or internship section is missing"
        );
    }

    if (!sections.includes("certifications")) {
        weaknesses.push(
            "Certifications section is missing"
        );
    }

    if (!hasEmail) {
        weaknesses.push(
            "Email address was not detected"
        );
    }

    if (!hasPhone) {
        weaknesses.push(
            "Phone number was not detected"
        );
    }

    if (!hasGithub) {
        weaknesses.push(
            "GitHub profile was not detected"
        );
    }

    if (!hasLinkedin) {
        weaknesses.push(
            "LinkedIn profile was not detected"
        );
    }


    // --------------------------------
    // 10. Suggestions
    // --------------------------------

    const suggestions = [];

    if (missingSkills.length > 0) {
        suggestions.push(
            `Consider adding relevant skills: ${missingSkills.join(", ")}`
        );
    }

    if (!sections.includes("projects")) {
        suggestions.push(
            "Add a Projects section with technologies and project details"
        );
    }

    if (!sections.includes("experience")) {
        suggestions.push(
            "Add internship or work experience if available"
        );
    }

    if (!sections.includes("certifications")) {
        suggestions.push(
            "Add relevant certifications and training"
        );
    }

    if (!hasGithub) {
        suggestions.push(
            "Add your GitHub profile"
        );
    }

    if (!hasLinkedin) {
        suggestions.push(
            "Add your LinkedIn profile"
        );
    }

    if (wordCount < 150) {
        suggestions.push(
            "Resume appears too short; add more relevant details"
        );
    }


    // --------------------------------
    // 11. Return complete analysis
    // --------------------------------

    return {
        score,

        skills: foundSkills,

        missingSkills,

        sections,

        strengths,

        weaknesses,

        suggestions,

        personalInfo: {
            email: hasEmail,
            phone: hasPhone
        },

        profiles: {
            github: hasGithub,
            linkedin: hasLinkedin
        },

        wordCount
    };
};