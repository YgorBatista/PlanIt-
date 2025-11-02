import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider  from 'next-auth/providers/github'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })

        
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

export default ( req:any, res:any) => {

if (process.env.VERCEL_URL){
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`

}
return NextAuth(req, res, handler)

}
