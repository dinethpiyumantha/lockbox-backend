const FileUtils = {
    getExtention: (path) => {
        var array = path.split(".");
        console.log(array);
        return array[array.length-1]
    }
}

module.exports = FileUtils