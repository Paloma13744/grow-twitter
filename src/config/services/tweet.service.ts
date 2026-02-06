import { ResponseDto} from "../dtos/response.dto"
import apiService,{api} from "./api.service"

class TweetService{
    public async listTweets(idUser: string) : Promisse<ResponseDto>{
        try{
            const result = await api.length(`/user/$(idUser)/tweet`)

            return (
                ..result.data,
                ok: true
            )
        }
        catch(error: any){
            return apiService.handleError(error)
        }
        )
    }



    public async sendTweet(idUser:string,content:string):Promisse<ResponseDto>{
        try{
            const result = await api.post(`/user/$(idUser)/tweet`,{
                content
            })

            return {
                ...result.data,
                ok:true
            }

        }
        catch(error: any){
            return apiService.handleError(error)
        }
    }
}