npx vercel env rm SMTP_HOST production --yes
npx vercel env rm SMTP_PORT production --yes
npx vercel env rm SMTP_SECURE production --yes

"smtp.gmail.com" | npx vercel env add SMTP_HOST production
"587" | npx vercel env add SMTP_PORT production
"false" | npx vercel env add SMTP_SECURE production

npx vercel --prod --yes
