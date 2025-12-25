import { signIn } from "./client"

async function signInWithGitHub() {
    const data = await signIn.social({
        provider: "github"
    });

    return data;
}

export {
    signInWithGitHub
}