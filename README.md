# Dassaevy Labs — Landing Page

Landing comercial premium da Dassaevy Labs em Next.js + TypeScript + Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run test:run
npm run typecheck
npm run lint
npm run build
```

## Produção

Defina `RESEND_API_KEY`, `RESEND_FROM_EMAIL` e `QUOTE_RECIPIENT_EMAIL` na Vercel e rode `npm run verify:production` antes do deploy final.

## Motion Principles

O projeto segue a direção aprovada baseada em `kylezantos/design-motion-principles`: Jakub como lente principal, Jhey nos momentos expressivos e Emil em componentes utilitários. Reduced motion, skeletons proporcionais, lazy loading e feedback de progresso são requisitos do projeto.
