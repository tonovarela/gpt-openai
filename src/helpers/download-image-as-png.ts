import { InternalServerErrorException } from "@nestjs/common";
import  * as path from "path";
import * as fs from "fs";



export const downloadImageAsPng = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new InternalServerErrorException(`Failed to download image from ${url}`);
    }    
    const folderPath = path.resolve('./', `./generated/images/`);
    fs.mkdirSync(folderPath, { recursive: true });
    const imageName = `${Date.now()}.png`;
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(`${folderPath}/${imageName}`, Buffer.from(buffer));


}