const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const messageRoutes = require('./routes/message');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://blog-application-client-eta.vercel.app/'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const MONGODB_STRING = "mongodb+srv://admin:admin123@wdc028-b461.yfrua.mongodb.net/blog-application?retryWrites=true&w=majority&appName=WDC028-B461"

mongoose.connect(MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/messages', messageRoutes);

if (require.main === module) {
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`API is now online on port ${PORT}`);
    });
}

module.exports = {app,mongoose};