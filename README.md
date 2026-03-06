# GrowTweet 🐦

Aplicação web inspirada no Twitter, construída com **React + Vite**, consumindo a API pública do **GrowTwitter**.  
Possui autenticação, feed de tweets, perfil de usuários, seguir/deixar de seguir (follow/unfollow), curtir tweets (like/unlike) e responder tweets (comentários).

---

- API utilizada: `https://api-growtwitter-illk.onrender.com`

---

## ✅ Requisitos atendidos (Checklist)

- [x] React + Vite
- [x] React Router DOM com páginas e componentes
- [x] Login com username/senha via API (JWT)
- [x] Rotas protegidas: usuário não logado é redirecionado para `/login`
- [x] Página Inicial com feed de tweets
  - ⚠️ O endpoint `/feed` apresentou instabilidade. Foi utilizado o endpoint `/tweets` como alternativa para exibir o feed.
- [x] Tweetar (criar tweet)
- [x] Curtir e descurtir (toggle like)
- [x] Responder tweet (reply) via comentários
  - Endpoint usado: `POST /tweets/:tweetId/comments`
- [x] Perfil do usuário logado com seus tweets
- [x] Perfil de outro usuário com tweets e botão Follow/Unfollow
- [x] Usuário não pode seguir a si mesmo
- [x] Layout com Menu à esquerda, conteúdo central e Card à direita

---

## 🧱 Tecnologias

- **React**
- **Vite**
- **TypeScript**
- **React Router DOM**
- **Axios**
- **Material UI Icons**

---

## 📦 Instalação

Clone o projeto e instale as dependências:

```bash
npm install