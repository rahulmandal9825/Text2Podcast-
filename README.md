# Text to Audio Podcast Converter

A web application to convert text into audio podcasts. Implemented secure user authentication using Clerk. Utilized EdgeStore for efficient audio and image storage. Integrated OpenAI API for high-quality text-to-audio conversion. Automated workflows with webhooks between MongoDB and Clerk.

## Features

- **Text to Audio Conversion**: Converts text into high-quality audio using OpenAI API.
- **User Authentication**: Secure authentication implemented using Clerk.
- **Efficient Storage**: Uses EdgeStore for storing audio and image files.
- **Automated Workflows**: Integrates MongoDB and Clerk with webhooks for seamless data management.

## Tech Stack

- **Frontend**: React.js, Clerk
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: EdgeStore
- **AI Integration**: OpenAI API
- **Authentication**: Clerk
- **Automation**: Webhooks

## Getting Started

### Prerequisites

- Node.js
- MongoDB account
- Clerk account
- OpenAI API key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/text-to-audio-podcast.git
    cd text-to-audio-podcast
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your configuration:
    ```env
    MONGODB_URI=your_mongodb_uri
    CLERK_API_KEY=your_clerk_api_key
    OPENAI_API_KEY=your_openai_api_key
    EDGESTORE_API_KEY=your_edgestore_api_key
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Sign Up / Log In**:
   - Use Clerk authentication to sign up or log in.

2. **Convert Text to Audio**:
   - Enter your text and click the "Convert" button.
   - The audio file will be generated using OpenAI API and stored in EdgeStore.

3. **Manage Files**:
   - View and manage your audio files stored in EdgeStore.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Rahul Mandal - rahulmandalzzz123@gmail.com

Project Link: [https://github.com/rahulmandal9825/Text2Podcast-](https://github.com/rahulmandal9825/Text2Podcast-/)
