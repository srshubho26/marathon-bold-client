import axios from "axios";

const imageHostingLink = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_API}`;

export const uploadImg = async (image) => {
    const imgSize = image.size/1000;
    if(imgSize>512){
        return {
            success: false,
            message: 'Please select an image less than 512 KB!'
        }
    }

    try {
        const res = await axios.post(imageHostingLink, { image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return {
            success: res?.data?.success,
            imgUrl: res?.data?.data?.display_url
        }

    } catch (err) {
        return {
            success: false,
            message: 'Something went wrong!',
            serverMsg: err.message
        }
    }
}