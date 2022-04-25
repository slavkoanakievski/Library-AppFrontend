import axios from '../custom-axios/axios';

const categoryService= {
    fetchAllCategories: () => {
        return axios.get("/categories");
    }

}
export default categoryService;