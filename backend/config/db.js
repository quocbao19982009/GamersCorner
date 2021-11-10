import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB Connected Sucessfully in ${connection.connection.host}`.cyan
        .underline
    );
  } catch (error) {
    console.error(`Error:${error.message}`.red.underline.bold);
    process.exit(1);
    // IF you want to process with succcess process.exit(0), with failure process.exit(1)
  }
};

export default connectDB;
