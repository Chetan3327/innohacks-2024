const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
console.log(UPLOAD_PRESET)
console.log(CLOUD_NAME)

const uploadFile = (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", UPLOAD_PRESET)
    data.append("cloud_name", CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
    }).then(resp => resp.json()).then(data => {
        console.log(data.url)
        return data.url
    })
    .catch(err => console.log(err))
}
export default uploadFile