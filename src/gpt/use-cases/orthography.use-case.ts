import OpenAI from "openai";

interface Options {
    prompt:string;
}


export const orthographyCheckUseCase = async(openai:OpenAI,options:Options) => {
    const {prompt} = options;    
    const completion= await openai.chat.completions.create({
        messages:[
            {role:"system",content:`
                Te seran proveidos textos con posibles errores ortográficos y gramaticales.
                Debes de responder en formato JSON, tu tarea es corregir y retornar informacion, tambien debes de dar un porcentaje de acierto por el usuario.
                Si no hay errores, debes de retornar un mensaje de felicitaciones.
                Ejemplo:
                {
                    "userScore":number
                    "errors":string[] //['error -> correccion']
                    "message":string  //Usa emojis y texto para felicitar al usuario cuando no tenga errores
                }



                `},
            {role:"user",content:prompt}
        ],
        temperature:0,
        max_tokens:150,
        model:"gpt-4o-mini",                
        response_format:{
            type:"json_object"
        }

        
    });
    const jsonResponse = JSON.parse(completion.choices[0].message.content!);
    return jsonResponse;
}