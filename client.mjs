import net from 'net';
import readline from 'readline'; //for handling input from the command line.


// method is used to create a readline interface for interacting with the user via the command line.
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usernameIn = new Promise(resolve => {
    readLine.question("Enter a username: ", answer => {
        resolve(answer);
    });
});

usernameIn.then((username) => {
    const client = net.connect({ port: 8080 }, function () {
    });

    readLine.on('line', data => {
        client.write(username + ':' + data);
    });

    client.on('data', function (data) {
        console.log(data.toString());
    })
})