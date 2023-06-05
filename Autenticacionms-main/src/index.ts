import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://manuel:TiendaUnAutenticacionDB@cluster0.jrtrfwb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });