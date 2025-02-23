import { API } from "./index";

const GET_GALLERY_ENDPOINT = API + "admin/gallery";

class ImagesService {
    async getGalleryImages() {
        try {
            const response = await fetch(GET_GALLERY_ENDPOINT);
            if (!response.ok) throw new Error('The fetch for image info failed for some reason.');
            return response.json(); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new ImagesService();