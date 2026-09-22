const fs = require("fs");
const myEmitter = require("./events");

let filesContent = {};
let filesRead = 0;

myEmitter.on("fileRead", (fileName, content) => {
    filesContent[fileName] = content;
    filesRead++;

    if (filesRead === 2) {
        myEmitter.emit(
            "bothFilesRead",
            filesContent.file1,
            filesContent.file2
        );
    }
});

myEmitter.on("bothFilesRead", (content1, content2) => {
    const mergedContent = content1 + "\n" + content2;

    fs.writeFile("merged.txt", mergedContent, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Files merged successfully!");
    });
});

fs.readFile("file1.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    myEmitter.emit("fileRead", "file1", data);
});

fs.readFile("file2.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    myEmitter.emit("fileRead", "file2", data);
});