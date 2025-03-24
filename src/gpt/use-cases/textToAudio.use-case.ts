import OpenAI from "openai";
import * as path from 'path';
import * as fs from 'fs';
interface Options {
    prompt: string;
    voice?: string;
}
export const textToAudioUseCase = async (openai: OpenAI, { prompt, voice }: Options) => {
    const voices = {
        'nova': 'nova',
        'alloy': 'alloy',
        'echo': 'echo',
        'fable': 'fable',
        'onyx': 'onyx',
        'shimmer': 'shimmer',
    };

    const selectedVoice = voices[voice!] ?? 'nova';
    const folderPath = path.resolve(__dirname, `../../../generated/audios`);
    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

    await fs.mkdirSync(folderPath, { recursive: true });
    try {
        const mp3 = await openai.audio.speech.create({
            model: 'gpt-4o-mini-tts',
            voice: selectedVoice,
            input: prompt,
            response_format: 'mp3'
        });
        const buffer = Buffer.from( await mp3.arrayBuffer());
        fs.writeFileSync(speechFile, buffer);
        return speechFile;

    } catch (e) {
        console.log(e);
        return null
        
    }

    
};   