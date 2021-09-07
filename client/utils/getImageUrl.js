import { apiUrl } from './refLinks'

const getImageUrl = (imageId, imageExt) => imageId !== null && imageExt !== null ? `${apiUrl}/images/${imageId}.${imageExt}` : null

export default getImageUrl;