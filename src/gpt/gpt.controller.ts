import { Body, Controller, HttpStatus, Post, Res, Get, Param, UseInterceptors, UploadedFile, MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscuserDto, TranslateDto, TextToAudioDto,  AudioToTextDto, ImageGenerationDTO } from './dtos';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';




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
  async textToAudio(@Body() textToAudioDto: TextToAudioDto, @Res() res: Response) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath!);
  }


  @Get('text-to-audio/:fileId')
  async textToAudioGet(@Param('fileId') fileId: string,
    @Res() res: Response
  ) {

    const filePath = await this.gptService.textToAudioGetter(fileId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath!);
  }




  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './generated/uploads',
      filename: (req, file, callback) => {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${new Date().getTime()}.${fileExtension}`;
        return callback(null, fileName);
      }
    })
  }
  ))
  async audioToText(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: 'File size should be less than 5MB' }),
        new FileTypeValidator({ fileType: 'audio/*' })
      ]
    })
  ) file: Express.Multer.File, @Body() audioToText: AudioToTextDto) {    
    return this.gptService.audioToText(file, audioToText);
  }
  

  @Post("image-generation")
  async imageGeneration(@Body() imageGenerationDto: ImageGenerationDTO ) {
    return this.gptService.imageGeneration(imageGenerationDto);
  }
  
  @Get("image-generation/:fileId")
  async imageGenerationGet(@Param('fileId') fileId: string,@Res() res:Response){
    const filePath = await this.gptService.imageGeneratorGetter(fileId);
    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath!);
  }


}
