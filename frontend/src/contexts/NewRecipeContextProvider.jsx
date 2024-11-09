import { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContextProvider";
import { saveRecipe, deleteRecipe } from "../apis/recipeCRUDS";
import { useParams } from 'react-router-dom'
import { getRecipeData } from '../apis/recipeCRUDS';
import * as utility from '../utilityes/ImageCloudStorage.js'
export const NewRecipeContext = createContext()

export function NewRecipeContextProvider({ children }) {
    const { token, loggedUser } = useContext(LoginContext)
    const [editModeContext, setEditModeContext] = useState(false)
    const [dataReady, setDataReady] = useState(false)
    const [newRecipe, setNewRecipe] = useState({})
    // if ther's an id in the url
    const params = useParams()
    const recipeId = params.recipeId

    // function to fetch recipe data from id
    const fetchRecipeData = async function () {
        setEditModeContext(true)
        try {
            const resp = await getRecipeData(token, recipeId)
            if (!resp) {
                console.log('resp non ricevuta)')
            }
            const data = await resp.json()
            const dataWithTemp = injectTempId(data)
            setNewRecipe(dataWithTemp);
            setDataReady(true)

        } catch (error) {
            return error
        }
    }

    // function to inject tempId into a single ingredient
    const injectTempIdIntoIngredient = function (ing, phaseId = null) {
        return {
            ...ing,
            tempId: ing._id,
            tempPhaseId: phaseId ? phaseId : null,
            tempName: ing.ingredientId.name,
            tempMeasurementCategory: ing.ingredientId.measurementCategory,
            ingredientId: ing.ingredientId._id
        }
    }

    // function to prepare the recipe for the edit components
    const injectTempId = function (recipeData) {
        const recipeIngredients =
            recipeData.recipeIngredients.map(ing => injectTempIdIntoIngredient(ing)
            )

        const phases = recipeData.phases.map(ph => {
            return { ...ph, tempId: ph._id }
        })


        const phasesWithIng = phases.map(ph => {
            const phIng = ph.phaseIngredients.map(phi => injectTempIdIntoIngredient(phi, ph._id))
            return { ...ph, phaseIngredients: phIng }
        })
        // console.log('fasi con ingredienti e tempId')
        // console.log(phasesWithIng)



        return {
            ...recipeData,
            recipeIngredients: recipeIngredients, phases: phasesWithIng
        }
    }

    const newRecipeData = {
        userId: '',
        tagsIds: [],
        title: '',
        description: '',
        portions: 1,
        preparationTime: '',
        recipeImageUrl: '',
        recipeVideoUrl: '',
        privateRecipe: false,
        phases: [],
        recipeIngredients: []
    }

    useEffect(() => {
        if (recipeId) {
            fetchRecipeData()
        }
        else {
            setNewRecipe(newRecipeData)
        }
    }, [])


    const [phaseImages, setPhaseImages] = useState({})




    const commitRecipe = async function (header, edit = null) {
        if (edit) {
            const deletedRecipe = await deleteRecipe(token, recipeId)

            // wait a bit to sync the db
            await new Promise(resolve => setTimeout(resolve, 1000));
            setNewRecipe(async (prevRecipe) => {
                const updatedRecipe = {
                    ...prevRecipe,
                    userId: loggedUser._id,
                    title: header.title,
                    description: header.description,
                    portions: header.portions,
                    preparationTime: header.preparationTime,
                    recipeVideoUrl: header.recipeVideoUrl,
                    privateRecipe: header.privateRecipe === "on" ? true : false,
                    phases: prevRecipe.phases ? prevRecipe.phases : [],
                    recipeIngredients: prevRecipe.recipeIngredients ? prevRecipe.recipeIngredients : [],
                    tagsIds: prevRecipe.tagsIds ? prevRecipe.tagsIds : []
                }
                const urlObj = await saveCloudinaryImages()
                console.log('updatedRecipe:', updatedRecipe)
                const updatedRecipe2 = updateRecipeImageUrls(urlObj, updatedRecipe)
                const commitedRecipe = await postRecipe(updatedRecipe2)
                return commitedRecipe
            })
        }
        else {
            setNewRecipe(async (prevRecipe) => {
                const updatedRecipe = {
                    ...prevRecipe,
                    userId: loggedUser._id,
                    title: header.title,
                    description: header.description,
                    portions: header.portions,
                    preparationTime: header.preparationTime,
                    recipeVideoUrl: header.recipeVideoUrl,
                    recipeImageUrl: header.recipeImagerUrl,
                    privateRecipe: header.privateRecipe === "on" ? true : false,
                    phases: prevRecipe.phases ? prevRecipe.phases : [],
                    recipeIngredients: prevRecipe.recipeIngredients ? prevRecipe.recipeIngredients : [],
                    tagsIds: prevRecipe.tagsIds ? prevRecipe.tagsIds : []
                }
                const urlObj = await saveCloudinaryImages()
                const updatedRecipe2 = updateRecipeImageUrls(urlObj, updatedRecipe)
                const commitedRecipe = await postRecipe(updatedRecipe2)
                return commitedRecipe
            })
        }
    }


    const postRecipe = async function (updatedRecipe) {
        const savedRecipe = await saveRecipe(token, updatedRecipe)
        console.log(savedRecipe)
        return savedRecipe
    }

    const saveCloudinaryImages = async function () {
        const urlObj = await utility.saveImagesToCloud(token, phaseImages)
        console.log('immagini salvate:', urlObj)
        return (urlObj)
    }

    const updateRecipeImageUrls = function (urlObj, recipeData) {
        let updatedRecipe = { ...recipeData }

        Object.entries(urlObj).forEach(([phaseId, url]) => {
            phaseId === 'recipeImage' ?
                updatedRecipe = { ...updatedRecipe, recipeImageUrl: url } :
                updatedRecipe = {
                    ...updatedRecipe,
                    phases: newRecipe.phases.map(p =>
                        p.tempId === phaseId ?
                            { ...p, phaseImageUrl: url } :
                            p
                    )
                }
        })
        return updatedRecipe
    }

    const addIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => (
            // if ingredient already exists
            prevRecipe.recipeIngredients.some(i => i.tempId === ingredient.tempId) ?
                // nothing changes
                prevRecipe :
                // add ingredient tu recipeIngredients
                { ...prevRecipe, recipeIngredients: [...prevRecipe.recipeIngredients, ingredient] }
        ))
    }

    const editIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            recipeIngredients: prevRecipe.recipeIngredients.map(i =>
                i.tempId === ingredient.tempId ?
                    ingredient :
                    i
            )
        }
        ))
    }

    const deleteIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, recipeIngredients: [...prevRecipe.recipeIngredients.filter(i => i.tempId !== ingredient.tempId)] }
        ))
    }

    const addTag = function (tag) {
        setNewRecipe(prevRecipe => (
            prevRecipe.recipeIngredients.some(t => t._id === tag._id) ?
                prevRecipe :
                { ...prevRecipe, tagsIds: [...prevRecipe.tagsIds, tag] }
        ))
    }

    const editTag = function (tag) {
        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            recipeIngredients: prevRecipe.tagsIds.map(t =>
                t._id === tag._id ?
                    tag :
                    t
            )
        }
        ))
    }

    const deleteTag = function (tag) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, tagsIds: [...prevRecipe.tagsIds.filter(t => t._id !== tag._id)] }
        ))
    }

    const addPhase = function (phase) {
        // debugger
        setNewRecipe(prevRecipe => (
            prevRecipe.phases.some(p => p.tempId === phase.tempId) ?
                prevRecipe :
                { ...prevRecipe, phases: [...prevRecipe.phases, phase] }
        ))
    }

    const editPhase = function (phase) {
        // I need to only update the header of the phase, not the rest of it.
        // So i need to find it to get all the other elements it contains.
        const foundPhase = newRecipe.phases.find(ph => ph.tempId === phase.tempId)
        const updatedPhase = foundPhase ? {
            ...foundPhase,
            description: phase.description, phaseNumber: phase.phaseNumber
        } : phase

        console.log('fase aggiornata nel context', updatedPhase)

        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            phases: prevRecipe.phases.map(p =>
                p.tempId === phase.tempId ?
                    updatedPhase :
                    p
            )
        }
        ))
    }

    const deletePhase = function (phase) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, phases: [...prevRecipe.phases.filter(p => p.tempId !== phase.tempId)] }
        ))
    }

    const addPhaseIngredient = function (ingredient) {
        // find the saved phase in newRecipe
        const phase = newRecipe.phases.find(p => p.tempId === ingredient.tempPhaseId)
        // find if ingredient is already present in the phase
        const foundIngredient = phase.phaseIngredients.find(i => i.tempId === ingredient.tempId)
        // creating edited phase, if the ingredient already exists i update it, otherwise i add it
        const editedPhase = foundIngredient ?
            {
                ...phase, phaseIngredients: phase.phaseIngredients.map(i => i.tempId === ingredient.tempId ?
                    ingredient :
                    i
                )
            } :
            { ...phase, phaseIngredients: [...phase.phaseIngredients, ingredient] }

        // setting the new phase inside newRecipe
        setNewRecipe(prevRecipe => {
            const editedRecipe = {
                ...prevRecipe, phases: [...prevRecipe.phases.map(p =>
                    p.tempId === ingredient.tempPhaseId ?
                        editedPhase :
                        p)]
            }
            return editedRecipe
        })
    }

    const deletePhaseIngredient = function (ingredient) {
        // find the saved phase in newRecipe
        const phase = newRecipe.phases.find(p => p.tempId === ingredient.tempPhaseId)
        console.log(phase)
        const editedPhase = { ...phase, phaseIngredients: [phase.phaseIngredients.find(i => i.tempId !== ingredient.tempId)] }
        console.log(editedPhase)
        setNewRecipe(prevRecipe => {
            const editedRecipe = {
                ...prevRecipe, phases: [...prevRecipe.phases.map(p =>
                    p.tempId === ingredient.tempPhaseId ?
                        editedPhase :
                        p
                )]
            }
            console.log(editedRecipe)
            return editedRecipe
        })
    }

    const handlePhaseImageChange = (tempId, file) => {
        setPhaseImages(prevImages => ({
            ...prevImages,
            [tempId]: file  // Save the image associated to it's tempId
        }));
        console.log(phaseImages)
    };





    // props for the childrens
    const value = {
        newRecipe, setNewRecipe, commitRecipe, dataReady, editModeContext,
        addIngredient, editIngredient, deleteIngredient, addPhaseIngredient, deletePhaseIngredient,
        addTag, editTag, deleteTag,
        addPhase, editPhase, deletePhase, handlePhaseImageChange
    }

    return (
        <NewRecipeContext.Provider value={value}>
            {children}
        </NewRecipeContext.Provider>
    );
}
