import OpenAI from "openai";

interface Options {
    prompt:string;
    lang:string;
}


export const translateUseCase = async(openai:OpenAI,options:Options) => {
    const {prompt,lang} = options;    
    const completion= await openai.chat.completions.create({
        messages:[
            {role:"system",content:`
                Traduce el siguiente texto al idioma ${lang}:${ prompt }
                `},
            {role:"user",content:prompt}
        ],
        temperature:0,
        max_tokens:150,
        model:"gpt-4o-mini",                
            
    });
    
    return completion.choices[0].message;
}