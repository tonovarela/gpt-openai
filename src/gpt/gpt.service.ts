import { Injectable, NotFoundException } from '@nestjs/common';
import {  prosConsDicusserStreamUseCase, prosConsDicusserUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';

import OpenAI from 'openai';

import { orthographyCheckUseCase } from './use-cases/orthography.use-case';
import { textToAudioUseCase } from './use-cases/textToAudio.use-case';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class GptService {


  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  
   async orthographyCheck(orthographyDto:OrthographyDto) {        
    return await orthographyCheckUseCase(this.openai,orthographyDto);

    }

    async prosConsDicusser(ProsConsDiscuserDto){
        return await prosConsDicusserUseCase(this.openai,ProsConsDiscuserDto);
    }
    async prosConsDicusserStream(ProsConsDiscuserDto){
      return await prosConsDicusserStreamUseCase(this.openai,ProsConsDiscuserDto);
  }


  async translate(translateDto:TranslateDto){
    const {prompt,lang} = translateDto;
    return await translateUseCase(this.openai,{prompt,lang});
 
  }

  async textToAudio(textToAudioDto:TextToAudioDto){
    return await textToAudioUseCase(this.openai,textToAudioDto);
  }

  async textToAudioGetter(fileId:string){
    
    const filePath = path.resolve(__dirname, `../../generated/audios/`,`${fileId}.mp3`);
    const existFile = fs.existsSync(filePath);
    if(!existFile){
      throw new NotFoundException(`File ${fileId} not found`);      
    }
    return filePath;        

  }


  


}
