import deshbordmodel from "../model/deshboard.js";

// save the data in the database
export const saveAnalysis = async(req,res)=>{
    try{
        const {userId,filename,score,skills,missingSkills,analysisData}=req.body;
        const newData =await deshbordmodel.create({
            userId,
            filename,
            score, skills,
            missingSkills,
            analysisData,

        });
        res.status(201).json({message:"Data saved successfully",data:newData});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get user data from the database
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.params;

        const userData = await deshbordmodel.find({ userId });

        if (userData.length === 0) {
            return res.status(404).json({
                message: "User data not found"
            });
        }

        res.status(200).json({
            message: "User data retrieved successfully",
            data: userData
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};