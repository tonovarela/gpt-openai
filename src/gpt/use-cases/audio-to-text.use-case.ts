import OpenAI from "openai";
import * as fs from "fs";

interface Options {    
    audioFile:Express.Multer.File;
    prompt?: string;
}

export const audioToTextUseCase = async (openai:OpenAI,options: Options) => {
    const { prompt, audioFile } = options;

    const gptResponse = await openai.audio.transcriptions.create({
        model:"gpt-4o-mini-transcribe",
        file: fs.createReadStream(audioFile.path),
        prompt: prompt,
        language:"es",        
        response_format:"json"
    });
    //console.log({gptResponse});

    return gptResponse;        


}