# OpenAI Udemy

This project is a NestJS application that integrates with the OpenAI API.

## Prerequisites

-   Node.js (version >= 16)
-   npm or yarn
-   An OpenAI API key

## Installation

1.  Clone the repository:

    ```bash
  
    cd openai-udemy
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  Create a `.env` file in the root directory and add your OpenAI API key:

    ```
    OPENAI_API_KEY=yourAPIKeyHere
    ```

    You can use the `.env.template` file as a template.

## Running the application

1.  Build the application:

    ```bash
    npm run build
    ```

2.  Start the application:

    ```bash
    npm start
    ```

    or, for development:

    ```bash
    npm run start:dev
    ```

## Endpoints

### Orthography Check

-   **POST** `/gpt/orthography-check`
-   **Body**:

    ```json
    {
        "prompt": "your text to check",
        "maxTokens": 150
    }
    ```

-   This endpoint checks the orthography of the provided text using the OpenAI API.

## Configuration

The application uses the following environment variables:

-   `OPENAI_API_KEY`: Your OpenAI API key.

You can configure these variables in the `.env` file.

## License

UNLICENSED