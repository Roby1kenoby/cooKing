export const saveImage = async function(req,res){
    try {
        const filePath =  req.file ? req.file.path : 'https://picsum.photos/200/300'
        res.status(201).send({"filePath": filePath})
    } catch (error) {
        console.log(error)
    }
}