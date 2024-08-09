import mongoose from "mongoose";

class DatabaseConnection {
    constructor(uri){
        this.uri = uri;
    }
  async connect() {
    try {
      const connection = await mongoose.connect(this.uri,);
      console.log("Connected to DB.");
    } catch (error) {
      console.log("Error connecting to DB:", error.message);
    }
  }
}

export default DatabaseConnection;
