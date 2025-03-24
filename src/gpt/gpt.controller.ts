import { Body, Controller, HttpStatus, Post, Res,Get, Param} from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscuserDto,TranslateDto,TextToAudioDto } from './dtos';
import type { Response } from 'express';




@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }


  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }
  @Post('pros-cons-dicusser')
  prosConsDiscusser(@Body() prosConsDiscusser: ProsConsDiscuserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusser);
  }

  @Post('pros-cons-dicusser-stream')
  async prosConsDiscusserStream(@Body() prosConsDiscusser: ProsConsDiscuserDto, @Res() res: Response) {
    const stream = await this.gptService.prosConsDicusserStream(prosConsDiscusser);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || ''
      res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {    
     return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(@Body() textToAudioDto: TextToAudioDto,@Res() res: Response) {        
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath!);    
  }


  @Get('text-to-audio/:fileId')
  async textToAudioGet(@Param('fileId') fileId:string ,
  @Res() res: Response
) {        
    
     const filePath = await this.gptService.textToAudioGetter(fileId);
     res.setHeader('Content-Type', 'audio/mp3');
     res.status(HttpStatus.OK);
     res.sendFile(filePath!);    
  }
  
}
