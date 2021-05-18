import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://UserAdm:kodfg123@cluster0.3ydia.mongodb.net/taxi?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) {
      throw Error(err);
    }
  }
);
