import 'dotenv/config'
import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const uploadCloudinary = multer({
	storage: new CloudinaryStorage({
		cloudinary,
		params:{
			// cartella che verrà createa su cloudinary
			folder: 'CooKing',
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET
		}
	})
})

export default uploadCloudinary

