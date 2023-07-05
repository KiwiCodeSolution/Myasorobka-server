const app = require("./app");

const PORT = process.env.PORT || 5000;
const server = async () => {
    try {

        app.listen(PORT, () => {
            console.log(`server is up in port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};
server();
