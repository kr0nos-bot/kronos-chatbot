import dotenv from 'dotenv'

const config = {
    openaiModel: process.env.NEXT_PUBLIC_OPENAI_MODEL,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    // openaiApiKey: process.env.OPENAI_API_KEY,
    // stablediffusionApiKey: process.env.STABLE_DIFFUSION_API_KEY,
    // heyamariApiKey: process.env.HEYAMARI_API_KEY,
    // googleApiKey: process.env.GOOGLE_API_KEY
    // firebaseConfig: {
    //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    //     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    // }
}

// if (!config.openaiApiKey) {
//     throw new Error('Missing OpenAI API key')
// }
// if (!config.openaiModel) {
//     throw new Error('Must specify Open AI Model')
// }
// if (!process.env["STABLE_DIFFUSION_API_KEY"]) {
//     throw new Error('Missing Stable Diffusion API Key')
// }
// if (!config.baseUrl) {
//     throw new Error('Missing Base URL')
// }
// if (!config.heyamariApiKey) {
//     throw new Error('Missing Hey Amari API Key')
// }
// if (!config.googleApiKey) {
//     throw new Error('Missing Google API Key')
// }
// if (!config.firebaseConfig.apiKey) {
//     throw new Error('Missing Firebase API Key')
// }
// if (!config.firebaseConfig.authDomain) {
//     throw new Error('Missing Firebase Auth Domain')
// }
// if (!config.firebaseConfig.projectId) {
//     throw new Error('Missing Firebase Project ID')
// }
// if (!config.firebaseConfig.storageBucket) {
//     throw new Error('Missing Firebase Storage Bucket')
// }

export default config
