import { Configuration, OpenAIApi } from 'openai'
import config from '../config'

interface Message {
    role: 'user' | 'system'
    content: string
}

export default class OpenAIClient {
    private static _configuration: Configuration = new Configuration({
        apiKey: process.env['OPENAI_API_KEY']
    })
    private static _openai: OpenAIApi = new OpenAIApi(this._configuration)
    private static _model: string = config.openaiModel!

    static createChatCompletion = async (messages: Message[]): Promise<any> => {
        return await this._openai.createChatCompletion({
            model: this._model,
            messages,
            temperature: 0.0
        })
    }
}
