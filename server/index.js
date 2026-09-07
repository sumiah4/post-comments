const express = require('express')
const app = express();
const db = require('./models');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const postsRouter = require('./routes/Posts');
const commentsRouter = require('./routes/Comments');
const usersRouter = require('./routes/Registration');
const likesRouter = require('./routes/Likes');

app.use('/', postsRouter);
app.use('/comments', commentsRouter);
app.use('/auth', usersRouter);
app.use('/likes', likesRouter);

db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});