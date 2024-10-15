import * as utility from '../apis/utilityCRUDS'

const fetchImage = async function(token, img){
    const resp = await utility.saveImage(token, img)
    return(resp.filePath)
}

export const saveImagesToCloud = async function(token, imagesObj){

    // for each element of the object i call the fetchImage to save the file on cloud and get back
    // the url
    const urlArray = await Promise.all(
        Object.entries(imagesObj).map(async ([phaseId, file]) => {
            const imgUrl = await fetchImage(token, file)
            return [phaseId, imgUrl]
        })
    )
    // then i transofmr the array with urls into a new obj
    const resultObj = Object.fromEntries(urlArray);
    return resultObj
}

