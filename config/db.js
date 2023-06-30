const mongoose = require('mongoose');

const connect = async () => {
    try {
        con = `${process.env.DB_URI + process.env.DB_TITLE}`;
        await mongoose.connect(con, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to ${process.env.DB_TITLE} database`);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
module.exports = connect;