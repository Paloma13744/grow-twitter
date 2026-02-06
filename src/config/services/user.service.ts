import { ResponseDto} from "../dtos/response.dto"
import apiService,{api} from "./api.service"

class UserService{
    public async login (username: string, password: string): Promisse<ResponseDto>{
        try{
            const result = await api.post(`/user/auth`,{
                username,
                password
            })
            return {
                ..result.data,
                ok: true,
            }
            catch(error: any){
                return apiService.handleError(error)
            }
        }

        export default new UserService;
    }
}